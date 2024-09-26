const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");
const { signup, login} = require("../Controllers/AuthControllers");
const UserModel = require("../Models/user");
const nodemailer = require('nodemailer')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.post('/login', loginValidation, login)

router.post('/signup', signupValidation, signup)

router.post('/forgotPassword', async(req, res) => {
    const {email} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.json({message: "User not found"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "5m"})

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user : process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Password",
            text: `http://localhost:5173/resetPassword/${token}`
        }

        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log(error)
                return res.status(404).send({success: false, error: "error sending an email"})
            }
            else{
                return res.status(201).send({success: true, message: "Mail is send"})
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "unexpected error occur"})
    }
})

router.post('/resetPassword/:token', async(req, res)=>{
    const token = req.params.token
    const {password} = req.body
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const id = decoded.id
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await UserModel.findByIdAndUpdate({_id: id}, {password: hashPassword})
        return res.status(201).send({success: true, message: "Password reset successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, error: "Password in not reset"})
    }
})

router.put('/profile/:id', ensureAuthenticated, async(req, res) => {
        const { id } = req.params;
    
        try {
            const { username, email, password } = req.body; 
            const existingUser = await UserModel.findOne({ username });
            if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
            }
            const existingMail = await UserModel.findOne({email });
            if (existingMail) {
            return res.status(400).json({ error: 'Email already taken' });
            }
    
            const updateData = {
                username,
                email,
            };
    
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10); 
                updateData.password = hashedPassword; 
            }
    
            const profile = await UserModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }); // Set { new: true } to return the updated document
    
            if (!profile) {
                return res.status(404).send({ success: false, message: "Can't update profile, user not found" });
            }
    
            return res.status(200).send({ success: true, message: "Profile Updated Successfully", profile }); // Return updated profile
        } catch (error) {
            console.log(error);
            return res.status(500).send({ success: false, error: error.message }); // Send error message
        }
    });

    router.delete('/user/:id', ensureAuthenticated ,async(req, res)=>{
        try{
            const {id} = req.params
            const deleteUser = await UserModel.findByIdAndDelete(id)
            if(!deleteUser){
                return res.status(401).send({success: false, message: "User Not Found"})
            }
            return res.status(201).send({success: true, message: "Deleted Successfully"})
        }catch(error){
            return res.status(500).send({success:false, error: error})
        }
    })
    


module.exports = router;