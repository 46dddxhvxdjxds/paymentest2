// SMEPay Configuration
const CONFIG = {
    // Development/Staging URL based on docs. Switch to Production URL for real money if needed.
    // Staging: https://staging.smepay.in/api/wiz
    // Production: https://extranet.smepay.in/api/wiz
    // Since user gave live-looking keys, we try Production first, or Staging if that fails. 
    // Usually 'extranet' is prod.
    // Updated Base URL based on widget source
    baseUrl: "https://wizard.smepay.in/api/wiz",
    clientId: "c23413f23F31AE51",
    clientSecret: "b7be3e66657cc708f396d838f8578a1aa876914f79230afb37834e9368dc3268",
    merchantName: "ZenStore Test"
};

const buyBtn = document.getElementById('buy-btn');

buyBtn.addEventListener('click', initiatePayment);

async function initiatePayment() {
    buyBtn.textContent = "Processing...";
    buyBtn.disabled = true;

    try {
        // 1. Create Order via API
        // NOTE: Calling this from frontend exposes Secret Key. OK for local dev only.
        const orderData = await createOrder();

        if (orderData && orderData.slug) {
            // 2. Open SMEPay Widget
            openWidget(orderData.slug);
        } else {
            console.error("No slug received", orderData);
            alert("Failed to create order. Check console.");
            resetButton();
        }

    } catch (error) {
        console.error("Payment Error:", error);
        alert("Payment Error: " + error.message);
        resetButton();
    }
}

async function createOrder() {
    // CORS Proxy to bypass browser restrictions on GitHub Pages
    const corsProxy = "https://corsproxy.io/?";
    const apiEndpoint = `${CONFIG.baseUrl}/external/create-order`;
    const url = corsProxy + encodeURIComponent(apiEndpoint);

    // Unique order ID
    const orderRef = "ORDER_" + Date.now();

    const payload = {
        amount: 5.00,
        currency: "INR",
        note: "Test Product Payment",
        customer_name: "Test User",
        customer_email: "test@example.com",
        customer_phone: "9999999999", // Required by most gateways
        order_ref: orderRef,
        webhook_url: "https://example.com/webhook", // Dummy for local
        // Additional metadata if required by SMEPay
        client_id: CONFIG.clientId,
        client_secret: CONFIG.clientSecret
    };

    // Note: Some gateways require Basic Auth, some require Body params.
    // Based on standard simple integrations, sending keys in body or headers.
    // We will try adding them to headers as well for good measure if body fails.

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // potentially needed headers
            "x-client-id": CONFIG.clientId,
            "x-client-secret": CONFIG.clientSecret
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return data; // Expecting { slug: "..." } or similar
}

function openWidget(slug) {
    if (!window.smepayCheckout) {
        alert("SMEPay SDK not loaded!");
        resetButton();
        return;
    }

    console.log("Opening Widget with slug:", slug);

    window.smepayCheckout({
        slug: slug,
        onSuccess: (data) => {
            console.log("Payment Success:", data);
            buyBtn.textContent = "Payment Successful! ✅";
            alert("Payment Successful!");
        },
        onFailure: (data) => {
            console.log("Payment Failed:", data);
            alert("Payment Failed or Cancelled");
            resetButton();
        }
    });
}

function resetButton() {
    buyBtn.textContent = "Buy Now";
    buyBtn.disabled = false;
    const shine = document.createElement('span');
    shine.className = 'btn-shine';
    buyBtn.appendChild(shine);
}
