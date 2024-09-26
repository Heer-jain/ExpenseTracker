const ensureAuthenticated = require("../Middlewares/Auth")
const router = require("express").Router()
const mongoose = require("mongoose")
const Incomes = require("../Models/income")

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }


router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const income = req.body;
        if (typeof income !== 'object' || Array.isArray(income)) {
            return res.status(400).send({ success: false, message: 'Invalid data format. Expected an object.' });
        }
        const newIncome = new Incomes(income);
        const savedIncome = await newIncome.save();

        res.send({ success: true, result: savedIncome });
    } catch (error) {
        console.error('Error inserting income:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }

});

router.get('/all/:user_id', ensureAuthenticated, async(req, res)=>{
    const user_id = req.params.user_id
    try{
        const incomes = await Incomes.find({user_id : user_id})
        res.send({success: true, result: incomes})
    }catch(err){
        console.error("Error in fetching income", err)
        res.status(500).send({success: false, message: "Internal server error"})
    }
})

router.delete('/:id', ensureAuthenticated, async(req, res)=>{
    try{
        const deleteIncome = await Incomes.findOneAndDelete({id:req.params.id})
        if(!deleteIncome){
            return res.status(404).send({success:false, message: "Incomes not found"})
        }
        res.send({success: true, result: "Incomes deleted successfully"})
    }catch(err){
        console.error("Error in deleting income", err)
        res.status(500).send({success: false, message: "Internal server error"})
    }
})

router.put('/:id', ensureAuthenticated, async(req, res)=>{
    
    try{
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid ID format" });
          }
        const updateIncome = await Incomes.findByIdAndUpdate(
            id,{
                $set:{
                    amount:req.body.amount,
                    source:req.body.source,
                    date:formatDate(req.body.date),
                    desc:req.body.desc,
                }
            }
        )
        if(!updateIncome){
            return res.status(404).send({success:false, message: "Incomes not found"})
        }
        res.send({success: true, result: "Incomes updated successfully"})
    }catch(err){
        console.error("Error in updating income", err)
        res.status(500).send({success: false, message: "Internal server error"})
    }
})

router.get('/recent/:user_id', ensureAuthenticated, async(req, res)=>{
    const user_id = req.params.user_id
    try{
        const incomes = await Incomes.find({user_id : user_id}).limit(2)
        res.json({success: true, message: "Recent Incomes fetched successfully", result:incomes})
    }catch(err){
        res.status(500).json({success: false, message: err.message})
    }
})

module.exports = router;