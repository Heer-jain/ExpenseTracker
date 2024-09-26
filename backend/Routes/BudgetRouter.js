const ensureAuthenticated = require("../Middlewares/Auth")
const router = require("express").Router()
const mongoose = require("mongoose")
const Budget = require("../Models/budget")



router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const budget = req.body;
        if (typeof budget !== 'object' || Array.isArray(budget)) {
            return res.status(400).send({ success: false, message: 'Invalid data format. Expected an object.' });
        }
        const newBudget = new Budget(budget);
        const savedBudget = await newBudget.save();

        res.send({ success: true, result: savedBudget });
    } catch (error) {
        console.error('Error inserting budget:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }

});

router.get('/all/:user_id', ensureAuthenticated, async(req, res)=>{
    try{
        const user_id = req.params.user_id
        const budgets = await Budget.find({user_id: user_id})
        res.send({success: true, result: budgets})
    }catch(err){
        console.error("Error in fetching budget", err)
        res.status(500).send({success: false, message: "Internal server error"})
    }
})

router.delete('/:id', ensureAuthenticated, async(req, res)=>{
    try{
        const deleteBudget = await Budget.findOneAndDelete({id:req.params.id})
        if(!deleteBudget){
            return res.status(404).send({success:false, message: "Budget not found"})
        }
        res.send({success: true, result: "Budget deleted successfully"})
    }catch(err){
        console.error("Error in deleting budget", err)
        res.status(500).send({success: false, message: "Internal server error"})
    }
})

router.put('/:id', ensureAuthenticated, async(req, res)=>{
    
    try{
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid ID format" });
          }
        const updateBudget = await Budget.findByIdAndUpdate(
            id,{
                $set:{
                    amount:req.body.amount,
                    source:req.body.source,
                    time:req.body.time,
                    desc:req.body.desc,
                }
            }
        )
        if(!updateBudget){
            return res.status(404).send({success:false, message: "Budget not found"})
        }
        res.send({success: true, result: "Budget updated successfully"})
    }catch(err){
        console.error("Error in updating budget", err)
        res.status(500).send({success: false, message: "Internal server error"})
    }
})

module.exports = router;