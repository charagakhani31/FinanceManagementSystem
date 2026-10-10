import saleModel from "../models/sales.model.js";
import productModel from "../models/product.model.js";
import expenseModel from "../models/expense.model.js";

async function getDashboard(req, res) {
    const result = await saleModel.aggregate([
        {
            $match: {
                business: req.user.business
            }
        },
        {
            $group: {
                _id: null,
                totalSales: { $sum: "$totalAmount" },
                totalPaymentsReceived: {$sum: "$amountPaid"},
                 totalOutstanding: {
                    $sum: {
                        $subtract: ["$totalAmount", "$amountPaid"]
                    }
                }
            },
        }
    ])

    const result1 = await expenseModel.aggregate([
        {
            $match: {
                business: req.user.business
            }
        },
        {
            $group: {
                _id: null,
                totalExpenses: {$sum: "$amount"}
            }
        }
    ])

    const totalProducts = await productModel.countDocuments({
        business: req.user.business
    })

    const lowStockProducts = await productModel.countDocuments({
        business: req.user.business,
        quantity: {$lt: 5}
    })

    
     res.status(200).json({
        summary: {
        totalSales: result[0]?.totalSales ?? 0,
        totalPaymentsReceived: result[0]?.totalPaymentsReceived ?? 0,
        totalOutstanding: result[0]?.totalOutstanding ?? 0,
        totalExpenses: result1[0]?.totalExpenses ?? 0,
        totalProducts,
        lowStockProducts

        }
      });
}

export default {getDashboard}