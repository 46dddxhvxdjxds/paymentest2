:root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --background: #0f172a;
    --card-bg: rgba(30, 41, 59, 0.7);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --accent: #22d3ee;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Outfit', sans-serif;
}

body {
    background-color: var(--background);
    background-image: 
        radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
        radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
        radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    width: 100%;
    max-width: 1200px;
}

header {
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    padding: 0 40px;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-weight: 700;
    font-size: 1.5rem;
    background: linear-gradient(to right, #818cf8, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.cart-icon {
    font-size: 1.2rem;
    cursor: pointer;
}

.product-card {
    background: var(--card-bg);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-image {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
}

.placeholder-img {
    font-size: 3rem;
    color: white;
}

h1 {
    font-size: 1.8rem;
    margin-bottom: 12px;
}

.description {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 24px;
}

.price-tag {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 30px;
    color: var(--accent);
}

.currency {
    font-size: 1.5rem;
    vertical-align: super;
    margin-right: 4px;
}

.cta-button {
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    color: white;
    border: none;
    padding: 16px 48px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    transition: all 0.3s ease;
}

.cta-button:hover {
    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.4);
    transform: scale(1.02);
}

.btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    animation: shine 3s infinite;
}

@keyframes shine {
    0% { left: -100%; }
    20% { left: 100%; }
    100% { left: 100%; }
}

.secure-text {
    margin-top: 16px;
    font-size: 0.8rem;
    color: var(--text-muted);
    opacity: 0.7;
}

/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
    opacity: 1;
    transition: opacity 0.3s ease;
}

.modal.hidden {
    opacity: 0;
    pointer-events: none;
}

.modal-content {
    background: #1e293b;
    padding: 40px;
    border-radius: 24px;
    text-align: center;
    width: 90%;
    max-width: 400px;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-modal {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted);
}

.qr-container {
    background: white;
    padding: 20px;
    border-radius: 12px;
    margin: 24px auto;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.payment-info {
    margin-bottom: 20px;
}

.secondary-btn {
    background: transparent;
    border: 1px dashed var(--text-muted);
    color: var(--text-muted);
    padding: 8px 16px;
    border-radius: 8px;
    margin-top: 10px;
    cursor: pointer;
    font-size: 0.8rem;
}

.loader {
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top: 3px solid var(--accent);
    width: 24px;
    height: 24px;
    margin: 0 auto 10px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
