import { menuArray } from "./data.js";


const menuContainer = document.getElementById("menu-container");
const orderContainer = document.getElementById("order-container");

document.addEventListener("click", function(e) {
    if(e.target.dataset.add) {
        getMatchingFoodObject(e.target.dataset.add);
    }
})

function getMatchingFoodObject(foodId) {
    const foodObject = menuArray.filter(function(food) {
        return food.uuid === foodId;
    })[0];
    return foodObject;
}

function getOrderList() {
    let orderList = ``;

    menuArray.forEach(function(food) {
        orderList +=
        `
        <div class="hidden order-container" id="order-container">
            <h2>Your order</h2>
            <div class="order-list" id="order-list">
                <h6>${food.name}</h6>
                <div class="price">
                    <button class="remove-btn">remove</button>
                    <h6>€${food.price}</h6>
                </div>
            </div>
            <div class="strip-border"></div>
                <div class="total-price">
                    <h6>Total price:</h6>
                    <h6>24</h6>
                </div>
                <div class="button-container">
                    <button class="complete-btn">Complete order</button>
                </div>
            </div>
        </div>
        `
    })
    return orderList;
}

function getFoodList() {
    
    let foodList = ``;

    menuArray.forEach(function(food) {
        foodList +=
        `
        <div class="menu-list" id="menu-list">
            <div class="food-container" id="food-container">
                <img src="${food.image}" alt="${food.alt}">
                <div class="food-info">
                    <div class="food-details">
                        <h5 class="food-name">${food.name}</h5>
                        <p>${food.ingredients}</p>
                        <h6>€${food.price}</h6>
                    </div>
                    <div>
                        <button class="add-btn" data-add="${food.uuid}">+</button>
                    </div>
                </div>
            </div>
        </div>
        `
    })
    return foodList;
}

function render() {
    menuContainer.innerHTML = getFoodList();
    orderContainer.innerHTML = getOrderList();
}

render();