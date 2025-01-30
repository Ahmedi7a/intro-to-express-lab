const express = require('express');
const app = express();
const port = 4000;


//1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    const userName = req.params.username;
    res.send(`Hello there, ${userName}`);
})
//==============================================
//2. Rolling the Dice// only accepts num
app.get('/roll/:number', (req, res) => {
    const number=req.params.number;
    const numberR = Math.floor(Math.random() * (number));
    if (isNaN(number)) {
        return res.send(`only number is valid`);
    } else
        res.send(`You rolled a ${numberR}.`);
})
//=============================================
// 3. I Want THAT One! index
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
app.get('/collectibles/:indexnum', (req, res) => {

    const i = req.params.indexnum;

    if (isNaN(i) || i < 0 || i >= collectibles.length) {
        res.send(`item using index ${i} is not available`)
    }
    const name = collectibles[i].name;
    const price = collectibles[i].price;
    res.send(`So, you want the ${name}? For ${price}, it can be yours!`)

})
//==========================================================================================
// 4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let response = "";
    let filteredShoes = shoes;

    if (req.query['min-price']) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= req.query['min-price']);
    }
    if (req.query['max-price']) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= req.query['max-price']);
    }
    if (req.query.type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === req.query.type);
    }

    if (filteredShoes.length === 0) {
        response = "No shoes match the criteria.";
    } else {
        for (let i = 0; i < filteredShoes.length; i++) {
            response += `name: ${filteredShoes[i].name} price: ${filteredShoes[i].price} type: ${filteredShoes[i].type}<br>`;
        }
    }

    res.send(response);
});















//============================
app.listen(port, () => {
    console.log(`its working on port ${port}`);
})