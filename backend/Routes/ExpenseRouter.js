const ensureAuthenticated = require("../Middlewares/Auth")
const router = require("express").Router()
const mongoose = require("mongoose")
const Expences = require("../Models/expense")

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }


router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const expense = req.body;
        if (typeof expense !== 'object' || Array.isArray(expense)) {
            return res.status(400).send({ success: false, message: 'Invalid data format. Expected an object.' });
        }
        const newExpense = new Expences(expense);
        const savedExpense = await newExpense.save();

        res.send({ success: true, result: savedExpense });
    } catch (error) {
        console.error('Error inserting expense:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }

});

router.get('/all/:user_id', ensureAuthenticated, async(req, res)=>{
    const user_id = req.params.user_id
    try{
        const expenses = await Expences.find({user_id: user_id})
        res.send({success: true, result: expenses})
    }catch(err){
        console.error("Error in fetching expense", err)
        res.status(500).send({success: false, message: "Internal server error"})
    }
})

router.delete('/:id', ensureAuthenticated, async(req, res)=>{
    try{
        const deleteExpense = await Expences.findOneAndDelete({id:req.params.id})
        if(!deleteExpense){
            return res.status(404).send({success:false, message: "Expences not found"})
        }
        res.send({success: true, result: "Expences deleted successfully"})
    }catch(err){
        console.error("Error in deleting expense", err)
        res.status(500).send({success: false, message: "Internal server error"})
    }
})

router.put('/:id', ensureAuthenticated, async(req, res)=>{
    try{
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid ID format" });
          }
        const updateExpense = await Expences.findByIdAndUpdate(
            id,{
                $set:{
                    amount:req.body.amount,
                    source:req.body.source,
                    date:formatDate(req.body.date),
                    desc:req.body.desc,
                }
            }
        )
        if(!updateExpense){
            return res.status(404).send({success:false, message: "Expenses not found"})
        }
        res.send({success: true, result: "Expences updated successfully"})
    }catch(err){
        console.error("Error in updating expense", err)
        res.status(500).send({success: false, message: "Internal server error"})
    }
})

router.get('/recent/:user_id', ensureAuthenticated, async(req, res)=>{
    const user_id = req.params.user_id
    try{
        const expenses = await Expences.find({user_id: user_id}).limit(2)
        res.send({success: true, message: "Recent expenses fetched successfully", result:expenses})
    }catch(err){
        console.error("Error in fetching recent expense", err)
        res.status(500).send({success: false, message: "Internalserver error"})
    }
})


module.exports = router;