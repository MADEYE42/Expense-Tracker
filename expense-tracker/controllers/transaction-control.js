const Transaction = require('../models/Transactions')
exports.getTransactions = async (req,res,next)=>{
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success:true,
            count: transactions.length,
            data:transactions
        })
    } catch (err) {
        return res.stat(500).json({
            success:false,
            error:'Server Crashed'
        })
    }
}
exports.addTransactions = async (req,res,next)=>{
    try {
        const {text,amount} = req.body;
        const transaction = await Transaction.create(req.body);
        return res.status(201).json({
            success:true,
            data:transaction
        });        
    } catch (error) {
        if(error.name === 'ValidationError'){
            const messages =Object.values(error.errors).map(val=>val.message);
            return res.status(500).json({
                success:false,
                error:messages
            })
        }
        else{
            return res.stat(500).json({
                success:false,
                error:'Server Crashed'
            });
        };
    }
    
}
exports.deleteTransactions = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found.'
            });
        }

        await Transaction.deleteOne({ _id: req.params.id });

        
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error('Error deleting transaction:', error); // Log the error for debugging purposes
        return res.status(500).json({
            success: false,
            error: 'Server Crashed'
        });
    }
};
