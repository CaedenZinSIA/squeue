module.exports = (app) => {
  const orders = require("../controllers/order.controller.js");

  // Create a new Customer
  app.post("/orders", orders.create);

  // Retrieve all Customers
  app.get("/orders", orders.findAll);

  // Retrieve a single Customer with orderId
  app.get("/orders/:orderId", orders.findByID);

  // Update a Customer with orderId
  app.put("/orders/:orderId", orders.update);

  // Delete a Customer with orderId
  app.delete("/orders/:orderId", orders.delete);

  // Create a new Customer
  app.delete("/orders", orders.deleteAll);
};
