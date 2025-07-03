let box = document.getElementById('box')
fetch('https://dummyjson.com/recipes')
    .then(rec => rec.json())
    .then((data) => {
        data.recipes.forEach((r, i) => {
            box.innerHTML += `
                <div>
                    <div>
                        <img src="${r.image}" alt="">
                    </div>
                    <div>
                        <h2>${r.name}</h2>
                    <div id="icons">
                        <div id="leftI">
                            <i class="fa-solid fa-circle-info icon info" data-index="${i}"></i>
                        </div>
                        <div id="rightI">
                            <i class="fa-solid fa-cart-plus icon add" data-index="${i}"></i>
                        </div>
                    </div>
                    </div>
                </div>
                `
        });
        let infoCl = document.querySelectorAll('.info')
        for (let info of infoCl) {
            info.addEventListener('click', () => {
                const index = info.getAttribute('data-index')
                localStorage.setItem('recipe', JSON.stringify(data.recipes[index]))
                window.location.href = 'info.html'
            })
        }

        let addCl = document.querySelectorAll('.add')
        let cartNum = document.getElementById('cartNum')
        let cartIcon = document.getElementById('cartIcon')
        let cartBox = document.getElementById('cartBox')
        let itemContainer
        let countElement
        let cartItems = JSON.parse(localStorage.getItem('data')) || {}

        for (let name in cartItems) {
            let recipe = data.recipes.find(r => r.name === name)
            if (recipe) {
                cartBox.innerHTML += `
                            <div class="itemContainer" data-name="${name}">
                                    <img src="${recipe.image}" alt="">                               
                                    <strong class='recipeNameCart'>${name}</strong> 
                                    <div class="itemControls">
                                        <i class="fa-solid ${cartItems[name] === 1 ? 'fa-trash' : 'fa-minus'} trash" data-name="${name}"></i>
                                        <span class='itemCount' data-name="${name}">${cartItems[name]}</span>
                                        <i class="fa-solid fa-plus plus" data-name="${name}"></i>
                                        </div>
                                        </div>
                                        `
            }
        }

        if (Object.keys(cartItems).length > 0 && !document.querySelector('#checkOutBtn')) {
            const checkOutBtn = document.createElement('button');
            checkOutBtn.id = "checkOutBtn";
            checkOutBtn.textContent = "Check-Out";
            cartBox.appendChild(checkOutBtn);
        }

        cartNum.innerText = Object.values(cartItems).reduce((acc, val) => acc + val, 0);

        if (cartNum.innerText !== "0") {
            cartNum.style.display = 'inline-block';
        }

        for (let add of addCl) {
            add.addEventListener('click', () => {
                const index = add.getAttribute('data-index')
                let recipe = data.recipes[index]
                if (!cartItems[recipe.name]) {
                    cartItems[recipe.name] = 1
                    cartBox.innerHTML += `
                            <div class="itemContainer" data-name="${recipe.name}">
                                    <img src="${recipe.image}" alt="">                               
                                    <strong class='recipeNameCart'>${recipe.name}</strong> 
                                    <div class="itemControls">
                                        <i class="fa-solid fa-trash trash" data-name="${recipe.name}"></i>
                                        <span class='itemCount' data-name="${recipe.name}">${cartItems[recipe.name]}</span>
                                        <i class="fa-solid fa-plus plus" data-name="${recipe.name}"></i>
                                        </div>
                                        </div>
                                        `
                    let checkOutBtn = document.querySelector('#checkOutBtn')
                    if (!checkOutBtn) {
                        checkOutBtn = document.createElement('button')
                        checkOutBtn.id = "checkOutBtn"
                        checkOutBtn.textContent = "Check-Out"
                        cartBox.appendChild(checkOutBtn)
                    }
                    else {
                        cartBox.appendChild(checkOutBtn)
                    }

                }
                else {
                    cartItems[recipe.name] += 1
                    countElement = document.querySelector(`.itemCount[data-name="${recipe.name}"]`)
                    countElement.innerText = cartItems[recipe.name]

                    if (cartItems[recipe.name] === 2) {
                        const icon = document.querySelector(`.trash[data-name="${recipe.name}"]`)
                        icon.classList.remove('fa-trash')
                        icon.classList.add('fa-minus')
                    }
                }

                const counter = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0)
                cartNum.innerText = counter
                cartNum.style.display = 'inline-block'
                localStorage.setItem('data', JSON.stringify(cartItems))
            })
        }

        cartBox.addEventListener('click', (e) => {
            if (e.target.classList.contains('trash')) {
                e.stopPropagation();
                const name = e.target.getAttribute('data-name')
                const container = document.querySelector(`.itemContainer[data-name="${name}"]`)
                if (cartItems[name] === 1) {
                    container.remove()
                    delete cartItems[name]
                    localStorage.setItem('data', JSON.stringify(cartItems))
                }
                else {
                    cartItems[name] -= 1
                    document.querySelector(`.itemCount[data-name="${name}"]`).innerText = cartItems[name]
                    if (cartItems[name] === 1) {
                        const icon = document.querySelector(`.trash[data-name="${name}"]`)
                        icon.classList.remove('fa-minus')
                        icon.classList.add('fa-trash')
                    }
                    localStorage.setItem('data', JSON.stringify(cartItems))
                }
            }

            else if (e.target.classList.contains('plus')) {
                const name = e.target.getAttribute('data-name')
                cartItems[name] += 1
                document.querySelector(`.itemCount[data-name="${name}"]`).innerText = cartItems[name]
                if (cartItems[name] === 2) {
                    const icon = document.querySelector(`.trash[data-name="${name}"]`);
                    icon.classList.remove('fa-trash');
                    icon.classList.add('fa-minus');
                }

                localStorage.setItem('data', JSON.stringify(cartItems))
            }

            else if (e.target.id === 'checkOutBtn') {
                window.location.href = 'Check-Out.html'
            }

            const counter = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0)
            cartNum.innerText = counter
            if (counter === 0) {
                cartNum.style.display = 'none';
                cartBox.classList.remove('show');
                cartDisplay = false;
            }
            else {
                cartBox.classList.add('show');
                cartDisplay = true;
            }
        })

        let cartDisplay = false

        function handleOutsideClick(e) {
            if (!cartIcon.contains(e.target) && !cartBox.contains(e.target)) {
                cartBox.classList.remove('show');
                cartDisplay = false;
                document.removeEventListener('click', handleOutsideClick);
            }
        }

        cartIcon.addEventListener('click', (e) => {
            e.stopPropagation()
            if (Object.keys(cartItems).length === 0) return;
            if (e.target.closest('#cartBox')) return;

            cartDisplay = !cartDisplay
            if (cartDisplay) {
                cartBox.classList.add('show');
                document.addEventListener('click', handleOutsideClick);
            }
            else {
                cartBox.classList.remove('show');
                document.removeEventListener('click', handleOutsideClick);
            }
        })
    })
    .catch((error) => {
        console.error("Error:", error);
    })
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const closeNav = document.getElementById('closeNav');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.add('show');
});

closeNav.addEventListener('click', () => {
    navLinks.classList.remove('show');
});

// Close nav if click outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('show');
    }
});
