const main = document.getElementById('main');
const emailInp = document.getElementById('email');
const passwordInp = document.getElementById('password');
const enterBtn = document.getElementById('enterBtn');
const Check = document.getElementById('Check');
const box = document.getElementById('box');
const data = JSON.parse(localStorage.getItem('data2')) || [];

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASS = "12345";

document.querySelector('.search-container').style.display = 'none';
document.querySelector('h1').style.display = 'none';
box.style.display = 'none';

enterBtn.addEventListener('click', () => {
    if (emailInp.value === ADMIN_EMAIL && passwordInp.value === ADMIN_PASS) {
        alert('Login Successfully');
        main.remove();
        document.querySelector('.search-container').style.display = 'flex';
        box.style.display = 'block';
    } else {
        alert('Try again');
    }
});

Check.addEventListener('click', () => {
    let token = document.getElementById('token').value.trim()
    let found = data.find(o => o.token === token)
    if (found) {
        let cartItemsShow = ''
        if (found.cart) {
            cartItemsShow += `<h3>Cart Items:</h3><ul class="cart-items">`;
            for (const item in found.cart) {
                let qty = found.cart[item]
                cartItemsShow += `
                            <li>
                                <strong>${item}:</strong> ${qty}
                            </li>`;
            }
            cartItemsShow += `</ul > `;
        }
        box.innerHTML = `
                    <div class="order-box">
                        <h2>${found.title} ${found.name}</h2>
                        <p><strong>Mobile:</strong> ${found.num}</p>
                        <p><strong>Alternate:</strong> ${found.alternateNum}</p>
                        <p><strong>Email:</strong> ${found.email}</p>
                        <p><strong>Address:</strong> ${found.address}</p>
                        <p><strong>Landmark:</strong> ${found.landmark}</p>
                        <p><strong>Instructions:</strong> ${found.instructions}</p>
                        <p><strong>Date:</strong> ${found.date}</p>
                        <p><strong>Token:</strong> ${found.token}</p>
                        ${cartItemsShow}
                    </div> `

    }
    else {
        box.innerHTML = `<p class="not-found" > Order not found for this token.</p >`
    }

})