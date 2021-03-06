const database = require("./database");

module.exports = app => {
  // Operate insert product

  app.post("/api/product", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const picture = request.query.picture;

    const existItem = database.availableProduct(name, price, picture); // Export function from 'database.js'

    let message = {
      success: true,
      message: "Product added"
    };

    if (existItem) {
      // Check if item is already in product list
      // Send message if item is already in product list
      const errorMessage = {
        error: "ERROR",
        message: "Item is already in product list"
      };
      response.status(500).send(errorMessage);
    } else if (!database) {
      // 404
      const errorMessage = {
        error: "ERROR",
        message: "Ops, something went worng"
      };
      response.status(404).send(errorMessage);
    } else {
      // Insert product
      const res = database.insertProduct(name, price, picture);
      message.data = res[0];
      response.send(message);
    }
  });

  // Operate get all products

  app.get("/api/product", async (request, response) => {
    if (database) {
      // Get items in shoppingcart
      const data = database.getProducts();
      response.send(data);
    } else {
      // 404
      const errorMessage = {
        error: "ERROR",
        message: "Ops, something went worng"
      };
      response.status(404).send(errorMessage);
    }
  });

  //Get one item

  /*app.get("/api/product:name", async (request, response) => {
    console.log(request.url);
    const name = request.params.name;
    const price = request.query.price;
    const picture = request.query.picture;
    const getItem = database.getItem(name);
    if (getItem) {
      console.log(getItem);
      const data = database.availableProduct(name, price, picture);
      response.send(data);
    } else {
      const errorMessage2 = {
        error: "ERROR",
        message: "Item is not available"
      };
      response.status(500).send(errorMessage2);
    }
  });*/

  // Operate get shoppingcart

  app.get("/api/shoppingcart", async (request, response) => {
    if (database) {
      // Get items in shoppingcart
      const data = database.getCart();
      response.send(data);
    } else {
      // 404
      const errorMessage = {
        error: "ERROR",
        message: "Ops, something went worng"
      };
      response.status(404).send(errorMessage);
    }
  });

  // Operate insert to shoppingcart

  app.post("/api/shoppingcart", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const picture = request.query.picture;

    let message = {
      success: true,
      message: "Shoppingcart updated"
    };

    // Operate
    const checkShopedItem = database.shoppingcartItem(name, price, picture); // Export function from 'database.js'
    const checkProducts = database.availableProduct(name, price, picture); // Export function from 'database.js'

    if (checkShopedItem) {
      //  Check if item exist in shoppingcart
      console.log(checkShopedItem);
      const errorMessage = {
        // Send message if item is already in shoppingcart
        error: "ERROR",
        message: "Item is already selected"
      };
      response.status(500).send(errorMessage);
    } else if (!checkProducts) {
      //  Check if item exist in product list
      const errorMessage = {
        // Send message if item is not in product list
        error: "ERROR",
        message: "Item is not available"
      };
      response.status(500).send(errorMessage);
    } else if (!database) {
      // 404
      const errorMessage = {
        error: "ERROR",
        message: "Ops, something went worng"
      };
      response.status(404).send(errorMessage);
    } else {
      // Insert item
      const res = database.insertCart(name, price, picture);
      message.data = res[0];
      response.send(message);
    }
  });
  // Operate delete
  app.delete("/api/shoppingcart/:name", async (request, response) => {
    console.log(request.url);
    const name = request.params.name;

    let message = {
      success: true,
      message: "Item deleted"
    };

    const checkShopedItem = database.shopedItem(name); // Export function from 'database.js'

    if (checkShopedItem) {
      //  Check if item exist in shoppingcart
      //  Delete item
      const res = database.deleteCart(name);
      message.data = res[0];
      response.send(message);
    } else if (!database) {
      // 404
      const errorMessage = {
        error: "ERROR",
        message: "Ops, something went worng"
      };
      response.status(404).send(errorMessage);
    } else {
      // Send message if item is not in shoppingcart
      const errorMessage = {
        error: "ERROR",
        message: "Item is not in shoppingcart"
      };
      console.log(checkShopedItem);
      response.status(500).send(errorMessage);
    }
  });
};
