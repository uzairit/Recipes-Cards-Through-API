
let data = JSON.parse(localStorage.getItem('data')) || {}
let data2 = JSON.parse(localStorage.getItem('data2')) || []
let title = document.getElementById('title')
let form = document.getElementById('form')
let Name = document.getElementById('name')
let num = document.getElementById('num')
let alternateNum = document.getElementById('alternateNum')
let address = document.getElementById('address')
let landmark = document.getElementById('landmark')
let email = document.getElementById('email')
let instructions = document.getElementById('instructions')
let date = new Date().toLocaleString();
const pakNumberRegex = /^03[0-9]{2}[-\s]?[0-9]{7}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateToken(length = 16) {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }
    return token;
}


let placeOrderBtn = document.getElementById('placeOrderBtn')
placeOrderBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (
        Name.value.trim() === '' ||
        num.value.trim() === '' ||
        address.value.trim() === '' ||
        landmark.value.trim() === '' ||
        email.value.trim() === ''
    ) {
        alert('Please fill all required fields!');
        return;
    }
    if (
        !pakNumberRegex.test(num.value.trim())
    ) {
        alert('Please enter a valid mobile number (e.g. 03xx-xxxxxxx)')
        return;
    }

    if (
        alternateNum.value.trim() !== '' && !pakNumberRegex.test(alternateNum.value.trim())) {
        alert('Please enter a valid alternate number or leave it blank.')
        return;
    }

    if (
        !emailRegex.test(email.value.trim())
    ) {
        alert('Please enter a valid email address.')
        return;
    }

    let token = generateToken()
    let obj = {
        title: title.value,
        name: Name.value,
        num: num.value,
        alternateNum: alternateNum.value,
        address: address.value,
        landmark: landmark.value,
        email: email.value,
        instructions: instructions.value,
        date: date,
        cart: data,
        token: token
    }
    data2.push(obj)
    localStorage.setItem('data2', JSON.stringify(data2))
    localStorage.removeItem('data');

    alert(`Order placed successfully!\nToken: ${token}`);
    form.reset()

    if (form = ``) {
        alert('Please fill all sections')
    }
})