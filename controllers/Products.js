const Products = require("../models/Products");
const Stats = require("../models/Stats");

const addNewProduct = async (req, res) => {
  const Product = await Products.create(req.body);
  res.status(200).json(Product);
};

const sellProduct = async (req, res) => {
  try {
    const findProduct = await Products.findById(req.params.id);
    if (findProduct) {
      await Stats.create({
        totalRevenue: findProduct.amount,
      });
      const updateProduct = await Products.findByIdAndUpdate(req.params.id, {
        isSold: true,
      });
      res.status(204).json(updateProduct);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const findProduct = await Products.findById(req.params.id);
    if (findProduct) {
      await Products.deleteById(req.params.id);
      res.status(204).json(null);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const totalInvested = async (req, res) => {
  try {
    const products = await Products.aggregate([
      {
        $group: {
          _id: "$isSold",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    const result = {
      totalSold: 0,
      totalNotSold: 0,
    };
    for (const product of products) {
      if (product._id === true) {
        result.totalSold = product.totalAmount;
      } else {
        result.totalNotSold = product.totalAmount;
      }
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const getProducts = async (req, res) => {
  try {
    if (req.query.isSold) {
      req.query.isSold = true;
    } else {
      req.query.isSold = false;
    }
    const products = await Products.find({ isSold: req.query.isSold });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};
const monthlyRevenue = async (req, res) => {
  try {
    const monthlyRevenue = await Stats.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalRevenue" },
        },
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const data = monthNames.map((month, index) => {
      const monthRevenue = monthlyRevenue.find(
        (item) => item._id.month === index + 1
      );
      return {
        month,
        sales: monthRevenue ? monthRevenue.totalRevenue : 0,
      };
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addNewProduct,
  sellProduct,
  deleteProduct,
  totalInvested,
  getProducts,
  monthlyRevenue,
};
