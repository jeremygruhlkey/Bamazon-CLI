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
    managerOptions();
});

const managerOptions = function(){
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What managery thing would you like to do, now?",
            choices: [
                "View all products",
                "View low inventory",
                "Add to inventory",
                "Add a new product",
                "Quit this dumb job"
            ]   
        }
    ).then(function(answer){
        if (answer.action === "View all products"){
            viewAllProducts();
        }
        if (answer.action === "View low inventory"){
            viewLowInventory();
        }

        if (answer.action === "Add to inventory") {
            addInventory();
        }

        if (answer.action === "Add a new product"){
            addProduct();
        }
        if (answer.action === "Quit this dumb job"){
            quit();
        }
    })
}

const viewAllProducts = function(){
    connection.query(`select item_id, product_name, price from ${TABLE}`, function(error, data){
        if(error) {
            console.log(error);
        }
        console.log(" ");
        console.log("-------------------------------------------------------");
        console.log("Presently available products:");
        console.log("ID:");
        data.forEach(item => console.log(item.item_id + ":  " + item.product_name + " for just " + "$" + item.price));
        console.log("");
        managerOptions();
    })
};

const viewLowInventory = function(){
    connection.query(`select item_id, product_name, stock_quantity from ${TABLE} WHERE stock_quantity <5`, function(error, data){
        if(error) {
            console.log(error);
        }
        data.forEach(item => console.log(item.item_id + ": " + item.product_name + ", " + item.stock_quantity + " in stock." ))
        managerOptions();
    })
}

const addInventory = function(){
    inquirer
    .prompt([
        {
            name: "adding",
            type: "input",
            message: "What is the ID # of the item you'd like to stock up on?"
        },
        {
            name: "quantity",
            type: "input",
            message: "And how many would you like to add?"
        }   
        ]
    ).then(function(answer){
        const item = answer.adding;
        const quantityAdded = answer.quantity;
        const query = connection.query(`UPDATE ${TABLE} SET stock_quantity = stock_quantity + ${quantityAdded} WHERE item_id = "${item}";`);
        managerOptions();
    })
}

const addProduct = function(){
    inquirer.prompt([
        {
            name: "newItem",
            type: "input",
            message: "What is the name of the product you would like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "In which department would you like that?"
        },
        {
            name: "price",
            type: "input",
            message: "How much would you like to charge for this amazing artifact?"
        },
        {
            name: "stock",
            type: "input",
            message: "And how many should we put on our digital shelves?",
        }]
    ).then(function(answer){
        connection.query(`INSERT INTO ${TABLE} (product_name, department_name, price, stock_quantity) 
                        VALUES ("${answer.newItem}", "${answer.department}", "${answer.price}", "${answer.stock}");`);
        managerOptions();
        })
}

const quit = function(){
    console.log("Hello yeah, baby! Let's head to the movies!")
}




