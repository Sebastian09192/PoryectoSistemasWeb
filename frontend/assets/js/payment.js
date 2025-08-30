import { CartManager } from './CartManager.js';
import { formatCurrency } from './utils.js';

const form = document.getElementById('cardForm');
const payBtn = document.getElementById('payBtn');

async function refreshSummary() {
    const cart = await CartManager.fetchCart();

    if (!cart || !cart.items || cart.items.length === 0) {
        document.querySelector('main').innerHTML = `<div class="alert alert-warning">Tu carrito está vacío. <a href="products.php">Vuelve al catálogo</a> para añadir productos.</div>`;
        return;
    }

    const totalItems = cart.items.reduce((sum, item) => sum + parseInt(item.cantidad), 0);

    document.getElementById('summaryItems').textContent = totalItems;
    document.getElementById('summarySubtotal').textContent = formatCurrency(cart.subtotal);
    document.getElementById('summaryTax').textContent = formatCurrency(cart.impuesto);
    document.getElementById('summaryShipping').textContent = formatCurrency(cart.envio);
    document.getElementById('summaryTotal').textContent = formatCurrency(cart.total);
}

// --- NUEVO CÓDIGO DE VALIDACIÓN ---
// Función para validar el número de tarjeta (solo 16 dígitos)
function validateCardNumber(cardNumber) {
    const regex = /^[0-9]{16}$/;
    return regex.test(cardNumber.replace(/\s/g, ''));
}

// Función para validar la fecha de vencimiento (MM/AAAA, en el futuro)
function validateCardExp(cardExp) {
    const regex = /^(0[1-9]|1[0-2])\/(20\d{2})$/;
    if (!regex.test(cardExp)) {
        return false;
    }
    
    const [month, year] = cardExp.split('/');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
}

// Función para validar el CVV (3 o 4 dígitos)
function validateCardCVV(cardCVV) {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cardCVV);
}

form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // --- LÓGICA DE VALIDACIÓN ANTES DE ENVIAR ---
    let isValid = true;
    form.classList.add('was-validated');

    // Validación de la dirección de envío
    const direccionEnvio = document.getElementById('direccion_envio');
    if (!direccionEnvio.checkValidity()) {
        isValid = false;
    }

    // Validación del nombre en la tarjeta
    const cardName = document.getElementById('cardName');
    if (!cardName.checkValidity()) {
        isValid = false;
    }

    // Validación del número de tarjeta
    const cardNumber = document.getElementById('cardNumber');
    if (!validateCardNumber(cardNumber.value)) {
        cardNumber.setCustomValidity('Número de tarjeta inválido.');
        isValid = false;
    } else {
        cardNumber.setCustomValidity('');
    }

    // Validación de la fecha de vencimiento
    const cardExp = document.getElementById('cardExp');
    if (!validateCardExp(cardExp.value)) {
        cardExp.setCustomValidity('Fecha de vencimiento inválida.');
        isValid = false;
    } else {
        cardExp.setCustomValidity('');
    }

    // Validación del CVV
    const cardCVV = document.getElementById('cardCVV');
    if (!validateCardCVV(cardCVV.value)) {
        cardCVV.setCustomValidity('CVV inválido.');
        isValid = false;
    } else {
        cardCVV.setCustomValidity('');
    }

    // Validación de términos y condiciones
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        terms.setCustomValidity('Debes aceptar los términos y condiciones.');
        isValid = false;
    } else {
        terms.setCustomValidity('');
    }

    // Si la validación falla, detenemos el proceso
    if (!isValid) {
        return;
    }

    // Si la validación es exitosa, procedemos con el envío
    payBtn.disabled = true;
    payBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Procesando...';

    const paymentData = {
        direccion_envio: document.getElementById('direccion_envio')?.value || "No especificada",
        metodo_pago: document.querySelector('input[name="payMethod"]:checked').value,
        terms: document.getElementById('terms').checked,
        // Agrega los demás campos del formulario que el backend necesite
        cardName: document.getElementById('cardName').value,
        cardNumber: document.getElementById('cardNumber').value,
        cardExp: document.getElementById('cardExp').value,
        cardCVV: document.getElementById('cardCVV').value
    };

    try {
        const response = await fetch('../backend/api/pago/procesar_pago.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(paymentData)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.mensaje);

        window.location.href = `confirmacion.php?id=${result.pedido_id}`;

    } catch (err) {
        alert('Error: ' + err.message);
        payBtn.disabled = false;
        payBtn.innerHTML = '<i class="fa fa-credit-card me-1"></i> Pagar ahora';
    }
});

document.addEventListener('DOMContentLoaded', refreshSummary);