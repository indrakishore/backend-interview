const express = require("express");
const router = express.Router();

const { addService } = require("../controllers/service_management");
const { addOrders } = require("../controllers/order_management");

router.post('/serviceManagement', addService)
router.post('/orderManagement', addOrders)

module.exports = router;