export { mealArray }
export { drinkArray }

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const mealArray = [
    {
        name: "Pizza",
        price: 12,
        image: "images/pepperoni-pizza.png",
        uuid: uuidv4()
    },
    {
        name: "Cheeseburger",
        price: 8,
        image: "images/cheeseburger.webp",
        uuid: uuidv4()
    },
    {
        name: "French Fries",
        price: 4,
        image: "images/french-fries.png",
        uuid: uuidv4()
    }
]

const drinkArray = [
    {
        name: "Beer",
        price: 4,
        image: "images/beer.png",
        uuid: uuidv4()
    },
    {
        name: "Coca Cola",
        price: 1.75,
        image: "images/cocacola.png",
        uuid: uuidv4()
    },
    {
        name: "Fanta",
        price: 1.75,
        image: "images/fanta.png",
        uuid: uuidv4()
    }
]