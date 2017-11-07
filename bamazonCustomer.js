var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
var colors = require("colors");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  printStock();

});







// start() - displays what's in stock and prompts user to pick an id and amount
function printStock() {
	
	connection.query("SELECT * FROM products", function(err, res){
		// creates table
		var table = new Table({
    		head: ["ID", "Product", "Department", "Price", "Amount in Stock"]
		});

		// pushes items in database to table to be printed
		for (var i = 0; i < res.length; i++) {
      	
			table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);

    	}
    	// closes for-loop

		// prints table
		console.log(table.toString());

    promptUser();

  	});	
  	// closes connection.query

}
// start() =====================================================


// promptUser() - asked the user what product and amount 
function promptUser() {
  var inventoryList = [];

  connection.query("SELECT * FROM products", function(err, res) {
    
    // this will take the name of each product and push them to inventoryList
    for (var i = 0; i < res.length; i++) {
      inventoryList.push(res[i].product_name);
    }
    // closes the for-loop


    inquirer.prompt([
      {
      type: "list",
      name: "userPick",
      message: "What item would you like to purchase?",
      choices: inventoryList
      },
      {
        name: "pickAmount",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function(user){
      checkStock(user.userPick, user.pickAmount);
    });

  });
  // closes connection.query
}
// promptUser() ===============================================


// checkStock() - checks if there's enough inventory for the user's purchase
function checkStock(item, amount) {
  // inStock = amount in stock
  // indexCount stores the location of the desired data
  var inStock;
  var indexCount;
  connection.query("SELECT * FROM products", function(err, res) {

    // goes through database to find chosen product
    for(var i = 0; i < res.length; i++) {
      if (item === res[i].product_name) {
        indexCount = i;
        inStock = res[i].stock_quantity;
      }
    }
    // closes for-loop

    if(amount > inStock) {
      console.log("Insufficient quantity");
      printStock();
    }
    else {
      var newAmount = inStock - amount;
      var cost = amount * res[indexCount].price;
      updateStock(item, amount, newAmount, cost);
    }

  });
}
// checkStock() ===============================================

// updateStock() - updates the stock_quanity of the item 
function updateStock(item, amount, newAmount, cost) {
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newAmount
      },
      {
        product_name: item
      }
    ],
    function(err, res) {
      console.log("Cost: $" + cost.toFixed(2));
      printStock();
    }
  );
}
// updateStock() ==============================================