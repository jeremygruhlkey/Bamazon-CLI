const inquirer = require("inquirer");
const mysql = require("mysql");

const DATABASE = "bamazonDB";
const TABLE = "products";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "Lothario1",
    database: DATABASE,
});

connection.connect(function(err) {
    if (err) throw err;
    displayItems();
  });
  
const displayItems = function(){
    connection.query(`select item_id, product_name, price from ${TABLE}`, function(error, data){
        if(error) {
            console.log(error);
        }
        console.log(" ");
        console.log("-------------------------------------------------------");
        console.log("CHECK OUT THESE GRET DEALS!!!");
        console.log("ID:");
        data.map(item => console.log(item.item_id + ":  " + item.product_name + " for just " + "$" + item.price));
        console.log("");
        selectItems();
    })    
}

const selectItems = function(){
    inquirer
    .prompt([
    {
        name: "buying",
        type: "input",
        message: "Please tell me the ID# of the item that will bring you joy, today?"
    },
    {
        name: "quantity",
        type: "input",
        message: "And how many?"
    }])
    .then(function(answer) {
        const item = answer.buying;
        const quantity = answer.quantity
        const query = connection.query(`SELECT product_name, department_name, price, stock_quantity FROM ${TABLE} WHERE item_id = ${item}`, function(error, data){
            if(error) {
                console.log(error)
            }
            const product = data[0].product_name;
            const inStock = data[0].stock_quantity;
            const price = data[0].price;

            console.log(product + ", a STEAL at " + "$" + price + "!");
            if(inStock < quantity){
                console.log("But sorry, we don't have as many as you would like.");
                console.log("We only have " + data[0].stock_quantity + ". Too bad. So sad. Buy something else.");
            }
            console.log("Great Choice! Your total for " + quantity + " is: " + "$" + (quantity * data[0].price) + ".");
            updateInventory(product, quantity);
        })
        
    })
};

const updateInventory = function(product, quantity){
    
}