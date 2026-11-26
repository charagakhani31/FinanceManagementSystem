import saleModel from "../models/sales.model.js"
import expenseModel from "../models/expense.model.js";

async function getChartData(req, res) {

    try {
        
    const totalSales = await saleModel.aggregate([
         {
            $match: {
                business: req.user.business
            }
        },
        {
            $group: {
                _id: {
                     year: { $year: "$createdAt" },
                     month: { $month: "$createdAt" }
                },
                 totalAmount: { $sum: "$totalAmount" }
            }
        },
        {
             $sort: { "_id.year": 1, "_id.month": 1 }
        }
    ])

      const totalExpenses = await expenseModel.aggregate([
      {
        $match: {
          business: req.user.business
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          totalAmount: { $sum: "$amount" } 
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ])

     res.status(200).json({
      success: true,
      totalSales,
      totalExpenses
    });

     } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export default {getChartData}