const { string, required, date } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserModel = require("./user")

const name = UserModel.name

const BudgetSchema = new Schema({
    id: {
     type : String,
     required : true,
     unique : true,   
    },
    amount : {
        type: Number,
        required : true,
    },
    source : {
        type: String,
        required : true,
    },
    time : {
        type: String,
        required: true, 
        default: "1 month"
    },
    desc:{
        type : String
    },
    user_id:{
        type:  String,
        required: true
    }
})

const BudgetModel = mongoose.model("Budget", BudgetSchema);
module.exports = BudgetModel;