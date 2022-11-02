import { menuArray } from "./data.js";


const menuContainer = document.getElementById("menu-container");
let yourOrderArray = [];


document.addEventListener("click", function(e) {
    if(e.target.dataset.add) {
        handleOrderInput(e.target.dataset.add);
    }
})

function handleOrderInput(foodId) {
    const OrderedFoodObject = menuArray.filter(function(food) {
        return food.uuid === foodId;
    })[0];

    yourOrderArray.push({
       name: OrderedFoodObject.name,
       price: OrderedFoodObject.price,
    });

    let yourOrderHtml = ``;
    yourOrderArray.forEach(order => {
        return yourOrderHtml +=
        `
        <div class="order-list" id="order-list">
            <h6>${order.name}</h6>
            <div class="price">
                <button class="remove-btn">remove</button>
                <h6>€${order.price}</h6>
            </div>
        </div>
        `
    })
    document.getElementById("order-container").classList.remove("hidden");
    document.getElementById("order-list").innerHTML = yourOrderArray;
    render();
}

function getFoodList() {
    let foodList = ``;

    menuArray.forEach(food => {
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
}

render();