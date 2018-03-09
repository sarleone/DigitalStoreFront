//REQUIRE mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");
//connect to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jard1n3r@",
    database: "bamazon"
});
connection.connect(function(err){
    if (err) throw err;
    //enter function
    showItems();
});
//kick off fuction to show all buyable items
function showItems() {
    var query = "select * from items";
    connection.query(query, function(err, res) {
        for (var i =0; i < res.length; i++) {
            var id = res[i].item_id;
            var name = res[i].product_name;
            var price = res[i].price;
            //var stock = res[i].stock_quantity;
            console.log("ID: " + id + " | Item: " + name + " | Price: " + price);
        }
        //console.log(res);
        //once they are displayed start engaging the customer
        customerPOS();
});
}

function customerPOS() {
    //ask customer which product they would like and how many
    inquirer
    .prompt([{
        name: "id",
        type: "input",
        message: "Enter the ID of the product you would like"
    }, {
        name: "quantity",
        type: "input",
        message: "How many of these products would you like to buy?"
    }])
    .then(function(answer){
        //grab the info from the table relating to the id they chose
        var query = "SELECT * FROM items WHERE item_ID =" + answer.id;
        var total;
        connection.query(query, function(err, res) {
            if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    //if the what they would like and the quantity they need is in stock...
                    if (res[i].stock_quantity >= answer.quantity) {
                        //provide customers with a total price
                        total = answer.quantity * res[0].price;
                        console.log("Your total cost is: $" + total);
                        //reset the database
                        connection.query("UPDATE items SET ? WHERE ?", [
                            {
                                stock_quantity: (res[i].stock_quantity - answer.quantity) 
                            },
                            {
                                item_id: (answer.id)
                            }
                        ],
                        //let the customer know their order went thru
                        function(err, res) {
                            if (err) throw err;
                            console.log("Your order has been placed successfully.");
                            //ask the customer if they would like to continue shopping
                            inquirer
                            .prompt([
                                {
                                    name: "cont",
                                    type: "list",
                                    message: "Would you like to order something else?",
                                    choices: ["yes", "no"]
                                }
                            ])
                            .then(function(response) {
                                if (response.cont == "yes") {
                                    showItems();
                                } else {
                                    console.log("Thank you for shopping with us!");
                                }
                                
                            });
                        });
                    //if there is not enough in stock, let the customer know and how much is in stock
                    } else {
                        if (res[i].stock_quantity < answer.quantity) {
                            console.log("Sorry we don't have the quantity you need. We have " + res[i].stock_quantity + " left of those.")
                            customerPOS();
                    }
                }
            }    
        });
    });
}
