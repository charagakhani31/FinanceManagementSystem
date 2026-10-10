
import saleModel from "../models/sales.model.js";
import customerModel from "../models/customer.model.js";

async function getSaleHistory(req, res) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const search = req.query.search;

        const skip = (page - 1) * limit;

        const filter = {
            business: req.user.business
        };

        if (startDate || endDate) {
            filter.createdAt = {};

            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }

            if (endDate) {
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1);

                filter.createdAt.$lt = end;
            }
        }

        if (search) {
            const customers = await customerModel.find({
                business: req.user.business,
                customerName: {
                    $regex: search,
                    $options: "i"
                }
            });

            const customerIds = customers.map(customer => customer._id);

            filter.customer = { $in: customerIds };
        }

        const sales = await saleModel.find(filter)
            .populate("customer")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalRecords = await saleModel.countDocuments(filter);

        const totalPages = Math.ceil(totalRecords / limit);

        res.status(200).json({
            message: "Sales history fetched successfully",
            sales,
            pagination: {
                currentPage: page,
                limit,
                totalRecords,
                totalPages
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch sales history",
            error: error.message
        });
    }
}

export default { getSaleHistory };