import { mealArray, drinkArray } from "./data.js";

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let chosenFoodArray = [];

const navList = document.getElementById("nav-list");
const textSection = document.getElementById("text-section");
const menuSection = document.getElementById("menu-section");
const mealSection = document.getElementById("meal-section");
const mealUl = document.getElementById("meal-ul");
const drinkUl = document.getElementById("drink-ul");
const basketSection = document.getElementById("basket-section");
const paymentForm = document.getElementById("form-payment");

document.addEventListener("click", (e)=> {
    if (e.target.id === "nav-bar") {
        toggleMenu();
    } else if (e.target.id === "meal-list") {
        revealFoodMenu();
    } else if (e.target.id === "drink-list") {
        revealDrinkMenu();
    } else if (e.target.dataset.food) {
        addFoodToBasket(e.target.dataset.food);
        if (chosenFoodArray.length > 0) {
            revealBasketMenu();
        }
    } else if (e.target.dataset.drink) {
        addDrinkToBasket(e.target.dataset.drink);
        if (chosenFoodArray.length > 0) {
            revealBasketMenu();
        }
    } else if (e.target.dataset.remove) {
        removeBtn(e.target.dataset.remove);
    } else if (e.target.id === "complete-order-btn") {
        completeOrderBtn();
    }
})

function dynamicTotalPrice() {
    let dynamicPrice = 0;
    for (let i = 0; i < chosenFoodArray.length; i++) {
        dynamicPrice += chosenFoodArray[i].price;
    }
    return dynamicPrice;
}

function toggleMenu() {
    navList.classList.toggle("reveal");
    textSection.innerText = "";
}

function revealFoodMenu() {
    let mealString = ``;
    menuSection.classList.add("display-menu-section");
    mealSection.classList.add("display-meal-section");
    mealArray.forEach( meal => {
        mealString +=
        `
        <li class="meal-li">
            <div class="meal">
                <div class="meal-img-and-info">
                    <img class="menu-images" src="${meal.image}">
                    <div class="info">
                        <p class="food-name">${meal.name}</p>
                        <p class="food-price">${meal.price}$</p>
                    </div>
                </div>
                <div class="basket-add-btns">
                    <button data-food="${meal.uuid}" class="plus-minus">
                    +
                    </button>
                </div>
            </div>
        </li>
        `
        mealUl.innerHTML = mealString;
    })
}

function revealDrinkMenu() {
    let drinkString = ``;
    menuSection.classList.add("display-menu-section");
    mealSection.classList.add("display-meal-section");
    drinkArray.forEach( drink => {
        drinkString +=
        `
        <li class="drink-li">
            <div class="meal">
                <div class="meal-img-and-info">
                    <img class="menu-images" src="${drink.image}">
                    <div class="info">
                        <p class="food-name">${drink.name}</p>
                        <p class="food-price">${drink.price}$</p>
                    </div>
                </div>
                <div class="basket-add-btns">
                    <button data-drink="${drink.uuid}" class="plus-minus">
                    +
                    </button>
                </div>
            </div>
        </li>
        `
    })
    drinkUl.innerHTML = drinkString;
}

function revealBasketMenu() {

    basketSection.innerHTML =
    `
    <div class="order-section">
        <h3>Your order</h3>
        <ul id="basket-ul" class="basket-ul">
        </ul>
        <div class="line"></div>
        <div class="total-price-section">
            <h3 class="total-price">Total price:</h3>
            <p id="basket-sum" class="basket-sum">${dynamicTotalPrice()}$</p>
        </div>
        <button id="complete-order-btn" class="complete-order-btn">Complete order</button>
    </div>
    `

    let orderListString = ``;

    chosenFoodArray.forEach( food => {
        orderListString +=
        `
        <li class="basket-li">
            <div class="basket-list">
                <div class="left-section">
                    <p>${food.name}</p>
                    <div data-remove="${food.uuid}" class="plus-minus-btns">remove</div>
                </div>
                <p id="basket-price" class="basket-price">${food.price}$</p>
            </div>
        </li>
        `
    })
    document.getElementById("basket-ul").innerHTML = orderListString;
}

function addFoodToBasket(targetID) {
    const selectedFood = mealArray.filter( food => {
        return food.uuid == targetID;
    })[0];

    let newObjectMeal = {
        name: selectedFood.name,
        price: selectedFood.price,
        uuid: uuidv4()
    }

    chosenFoodArray.push(newObjectMeal);
}

function addDrinkToBasket(targetID) {
    const selectedDrink = drinkArray.filter( drink => {
        return drink.uuid == targetID;
    })[0];

    let newObjectDrink = {
        name: selectedDrink.name,
        price: selectedDrink.price,
        uuid: uuidv4()
    }
    chosenFoodArray.push(newObjectDrink);
}

function removeBtn(targetID) {
    const removedObject = chosenFoodArray.filter( food => {
        return food.uuid == targetID;
    })[0];

    for (let i = 0; i < chosenFoodArray.length; i++) {
        if (chosenFoodArray[i] == removedObject) {
            chosenFoodArray.splice(i, 1);
        }
    }

    if (chosenFoodArray.length > 0) {
        revealBasketMenu();
    } else {
        basketSection.innerHTML = ``;
    }
}

function completeOrderBtn() {
    document.getElementById("card-section").style.display = "block";
    document.getElementById("header").classList.add("blur");
    document.getElementById("main").classList.add("blur");
    document.getElementById("footer").classList.add("blur");

    const addBtns = document.querySelectorAll(".plus-minus");
    const proceedBtn = document.getElementById("complete-order-btn");
    const addBtnsArray = Array.from(addBtns);

    for (let i = 0; i < addBtnsArray.length; i++) {
        addBtnsArray[i].disabled = true;
    }
    proceedBtn.disabled = true;
}

paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const paymentData = new FormData(paymentForm);

    const name = paymentData.get("card-name");
    

    document.getElementById("card-section").style.display = "none";
    document.getElementById("header").classList.remove("blur");
    document.getElementById("main").classList.remove("blur");
    document.getElementById("footer").classList.remove("blur");

    chosenFoodArray = [];
    basketSection.innerHTML =
    `
    <h2 class="order-message">Thanks ${name}! Your order is on its way!</h2>
    `;

    const addBtns = document.querySelectorAll(".plus-minus");
    const addBtnsArray = Array.from(addBtns);

    for (let i = 0; i < addBtnsArray.length; i++) {
        addBtnsArray[i].disabled = false;
    }
})