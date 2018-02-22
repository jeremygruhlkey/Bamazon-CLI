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
        console.log("CHECK OUT THESE GREAT DEALS!!!");
        console.log("ID:");
        data.forEach(item => console.log(item.item_id + ":  " + item.product_name + " for just " + "$" + item.price));
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
        let quantity = Number(answer.quantity)
        const query = connection.query(`SELECT product_name, department_name, price, stock_quantity FROM ${TABLE} WHERE item_id = ${item}`, function(error, data){
            if(error) {
                console.log(error)
            }
            const product = data[0].product_name;
            const inStock = Number(data[0].stock_quantity);
            const price = Number(data[0].price);

            console.log(product + ", a STEAL at " + "$" + price + "!");
            if(inStock < quantity){
                console.log("\x1b[31m","But sorry, we don't have as many as you would like.");
                console.log("\x1b[31m","We only have " + inStock + ". Too bad. Take what we got or buy something else.");
                inquirer.prompt(
                    {
                        name: "tryAgain",
                        type: "list",
                        message: "what would you like to do?",
                        choices: [
                            "Buy all we have.",
                            "Make another selection."
                        ]
                    }
                    ).then(function(answer){
                        if(answer.tryAgain === "Buy all we have."){
                            quantity = inStock;
                            console.log("\x1b[32m","Great Choice! Your total for " + quantity + " is: " + "$" + (quantity * price) + ".");
                            console.log("\x1b[32m","Thanks for your purchase. Bye now!");
                            console.log("\x1b[0m", "")
                            updateInventory(product, quantity, inStock, price);
                            
                        }
                        else if(answer.tryAgain === "Make another selection."){
                            displayItems();
                        }
                    })
            }else{
                console.log("");
                console.log("\x1b[32m","Great Choice! Your total for " + quantity + " is: " + "$" + (quantity * data[0].price) + ".");
                console.log("\x1b[32m","Thanks for your purchase. Bye now!");
                console.log("\x1b[0m","");
                updateInventory(product, quantity, inStock, price);
            }
        })
        
    })
};

const updateInventory = function(product, quantity, inStock, price){
    const newStock = inStock - quantity;
    const totalPrice = quantity * price;
    const query = connection.query(`UPDATE ${TABLE} SET stock_quantity = ${newStock} WHERE product_name = "${product}";`);
    const query2 = connection.query(`UPDATE ${TABLE} SET product_sales = product_sales + ${totalPrice} WHERE product_name = "${product}";`);
};