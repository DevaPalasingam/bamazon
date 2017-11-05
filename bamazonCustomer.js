var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');
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

  	});	
  	// closes connection.query

}
// start() =====================================================
