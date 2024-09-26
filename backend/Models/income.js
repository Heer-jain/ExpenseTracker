const { string, required, date } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserModel = require("./user")

const name = UserModel.name

const incomeSchema = new Schema({
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
    date : {
        type: String,
        required: true,
        default: Date.now,
    },
    desc:{
        type : String
    },
    user_id:{
        type:  String,
        required: true
    }
})

incomeSchema.pre('save', function(next) {
    if (this.date) {
      const date = new Date(this.date);
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2);
      const day = (`0${date.getDate()}`).slice(-2);
      this.date = `${year}-${month}-${day}`;
    }
    next();
  });

const IncomeModel = mongoose.model("Incomes", incomeSchema);
module.exports = IncomeModel;