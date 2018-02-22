const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");

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
    supervisorOptions();
});

const supervisorOptions = function(){
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "Do something super!",
            choices: [
                "View sales by department",
                "Create a new department"
            ]   
        }
    ).then(function(answer){
        if (answer.action === "View sales by department"){
            viewDepartmentSales();
        }
        if (answer.action === "Create a new department"){
            createDepartment();
        }
    })
}

const viewDepartmentSales = function(){
    connection.query("SELECT departments.department_id, departments.department_name, departments.overhead_costs,SUM(products.product_sales) AS product_sales,(SUM(products.product_sales) - (departments.overhead_costs)) AS total_profit FROM products LEFT OUTER JOIN departments ON departments.department_name = products.department_name GROUP BY department_id;", function(error, data){
        if(error) {
            console.log(error);
        }
        console.log(data);
        // data.forEach(item => console.log(item.item_id + ": " + item.product_name + ", " + item.stock_quantity + " in stock." ))
        // managerOptions();
    })
}

const createDepartment = function(){
    console.log("Creating department");
}