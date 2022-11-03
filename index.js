import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const menuContainer = document.getElementById("menu-container");
const orderContainer = document.getElementById("order-container");
const totalPrice = document.getElementById("total-price");
const listFood = document.getElementById("list-food");
const paymentContainer = document.getElementById("payment-container");
const formPayment = document.getElementById("form-payment");
const innerModal = document.getElementById("inner-modal");

let yourOrderArray = [];

formPayment.addEventListener("submit", function(e) {
    e.preventDefault();
    const personalInfo = new FormData(formPayment);
    const name = personalInfo.get("fullName");

    innerModal.innerHTML =
    `
    <div class="first-message">Thank you so much for your order</div>
    <div class="second-message">${name}</div>!
    <div class="third-message">Your order is being processed!</div>
    `

    setTimeout(function() {
        orderContainer.innerHTML =`<div class="final-message">Your order is on its way <span>${name}</span>! Enjoy your meal!</div>`
    }, 10*1000);
});

document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        handleOrderInput(e.target.dataset.add);
    } else if (e.target.dataset.delete) {
        handleDeleteButton(e.target.dataset.delete);
    } else if (e.target.id === "complete-btn") {
        handlePaymentButton();
    } else if (e.target.id === "close-container-btn") {
        closeContainerBtn();
    }
})

function handlePaymentButton() {
    paymentContainer.classList.remove("hidden");
    
    document.querySelectorAll('button').forEach((elem)  => {
        elem.disabled = true;
    })
}


function closeContainerBtn() {
    paymentContainer.classList.add("hidden");
}

function handleDeleteButton(targetId) {
    const deletedOrder = yourOrderArray.filter((order) => {
        return order.uuid === targetId;
    })[0];

    for (let i = 0; i < yourOrderArray.length; i++) {
        if (yourOrderArray[i] === deletedOrder) {
            yourOrderArray.splice(i, 1);
        }
    }

    if (yourOrderArray.length === 0) {
        orderContainer.classList.add("hidden");
    }

    let orderList = "";

    yourOrderArray.forEach((order) => {

        orderList +=
        `
        <li class="" id="list-${order.uuid}">
            <div class="order-list" id="order-list">
                <h6>${order.name}</h6>
                <div class="price">
                    <button class="remove-btn" data-delete="${order.uuid}">remove</button>
                    <h6>€${order.price}</h6>
                </div>
            </div>
        </li>
        `
    })
    listFood.innerHTML = orderList;

    // This section renders the total price //

    let SumPrice = 0;

    yourOrderArray.forEach((order) => {
        SumPrice += order.price
    })
    totalPrice.textContent = "€" + SumPrice;

    render();
}

function handleOrderInput(foodId) {

    // Filter out the object to the const so that it will know which food you want to choose //

    const OrderedFoodObject = menuArray.filter((food) => {
        return food.uuid === foodId;
    })[0];

    // Push the selected items in the array //

    yourOrderArray.push({
        name: OrderedFoodObject.name,
        price: OrderedFoodObject.price,
        uuid: uuidv4()
    })

    // This section renders the order list //

    let orderList = "";

    yourOrderArray.forEach((order) => {

        orderList +=
        `
        <li class="" id="list-${order.uuid}">
            <div class="order-list" id="order-list">
                <h6>${order.name}</h6>
                <div class="price">
                    <button class="remove-btn" data-delete="${order.uuid}">remove</button>
                    <h6>€${order.price}</h6>
                </div>
            </div>
        </li>
        `
    })

    listFood.innerHTML = orderList;

    // This section renders the total price //

    let SumPrice = 0;

    yourOrderArray.forEach((order) => {
        SumPrice += order.price
    })
    totalPrice.textContent = "€" + SumPrice;

    // This section unhidden the order list when clicked //

    orderContainer.classList.remove("hidden");
    render();
}

// This function renders out menu list //

function getFoodList() {
    let foodList = ``;

    menuArray.forEach((food) => {
        foodList +=
        `
        <div class="menu-list" id="menu-list">
            <div class="food-container" id="food-container">
                <div class="firstPart"> 
                    <img src="${food.image}" alt="${food.alt}">
                    <div class="food-info">
                        <div class="food-details">
                            <h5 class="food-name">${food.name}</h5>
                            <p>${food.ingredients}</p>
                            <h6>€${food.price}</h6>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="add-btn" data-add="${food.uuid}">+</button>
                </div>
            </div>
        </div>
        `
    })
    return foodList;
}

function render() {
    menuContainer.innerHTML = getFoodList();
}

render();