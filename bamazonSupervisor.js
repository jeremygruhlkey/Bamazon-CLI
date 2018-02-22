const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");

const DATABASE = "bamazonDB";
const TABLE = "departments";

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
        const table = new Table({
           head: ["id", "department_name", "overhead_costs", "product_sales", "total_profit"],
           colWidths: [5, 20, 20, 15, 15] 
        })

        data.forEach(function(item){
            table.push([item.department_id, item.department_name, item.overhead_costs, item.product_sales, item.total_profit])
        });
        console.log(table.toString());
        supervisorOptions();
    })
}

const createDepartment = function(){
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What is the name of the new department?"
        },
        {
            name: "overheadCosts",
            type: "input",
            message: "What will the overhead costs be?"
        }]
    ).then(function(answer){
        connection.query(`INSERT INTO ${TABLE} ( department_name, overhead_costs) 
                        VALUES ("${answer.departmentName}", "${answer.overheadCosts}");`);
        supervisorOptions();
        })
}