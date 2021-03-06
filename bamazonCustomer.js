var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
  
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt();
});

//=================================Inquirer introduction===============================

function startPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "All Is Welcome, All Is Wecome",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
            inventory();
        } else {
            console.log("Thank you! Come Again!");
        }
    });
}

//=================================Inventory===============================

function inventory() {
    var table = new Table({

        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    listInventory();
    function listInventory() {

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [itemId, productName, departmentName, price, stockQuantity]
            );
          }
            console.log("");
            console.log("====================================================== Current Bamazon Inventory ======================================================");
            console.log("");
            console.log(table.toString());
            console.log("");
            continuePrompt();
        });
    }
}

//=================================Inquirer user purchase===============================

function continuePrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "continue",
        message: "Please Select An Item From Our Enventory?",
        default: true

    }]).then(function(user) {
        if (user.continue === true) {
            selectionPrompt();
        } else {
            console.log("Thank you! Come Again");
        }
    });
}

//=================================Item selection and Quantity desired===============================


function selectionPrompt() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Please enter the ID number of the item you would like to purchase.",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "Please select the number of items you want to perchase today?",

        }
    ]).then(function(userPurchase) {

        //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

        connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {

                    console.log("===================================================");
                    console.log("Sorry! We Seem To Of Run Out Of That Item. We Expect To Be Getting A New Shipment In After The Holidays!");
                    console.log("===================================================");
                    startPrompt();

                } else {
                    //list item information for user for confirm prompt
                    console.log("===================================");
                    console.log("Your item is in stock");
                    console.log("===================================");
                    console.log("You've selected:");
                    console.log("----------------");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("----------------");
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                    console.log("===================================");

                    var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    //console.log(newStock);
                    confirmPrompt(newStock, purchaseId);
                }
            }
        });
    });
}

//=================================Confirm Purchase===============================

function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Please confirm this is what you want to buy, your credit card will be charged immediatly",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

            console.log("=================================");
            console.log("Transaction completed. Thank you.");
            console.log("=================================");
            startPrompt();
        } else {
            console.log("=================================");
            console.log("Please select a new item!");
            console.log("=================================");
            startPrompt();
        }
    });
}