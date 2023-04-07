const {
  addNewProduct,
  getProducts,
  deleteProduct,
  sellProduct,
  totalInvested,
  monthlyRevenue,
} = require("../controllers/Products");
const { login, register } = require("../controllers/User");

const router = require("express").Router();

// USER ROUTES
router.post("/login", login);
router.post("/register", register);
router.route("/sales").post(addNewProduct).get(getProducts);
router.route("/sales/revenue").get(monthlyRevenue);
router.route("/sales/stats").get(totalInvested);
router.route("/sales/:id").delete(deleteProduct).put(sellProduct);

module.exports = router;
