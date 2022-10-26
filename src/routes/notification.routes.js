module.exports = (server) => {
  const notification = require("../controllers/notification.controller.js");

  server.get("/notification", notification.notification);
};
