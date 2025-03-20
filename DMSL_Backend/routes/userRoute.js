const router=require('express').Router();
const User=require("../models/login");
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const Quiz=require("../quizschema");
// router.post('/login',async(req,res)=>{
//     try{
//         const user=await User.findOne({email:req.body.email})
//         if(!user){
//             return res.status(200).json({
//                 message:'user not found',
//                 success:false
//             })
//         }
//         const validPassword=bcrypt.compare(req,body.password,user.password);
//         if(!validPassword){
//             return res.status(200).json({
//                 message:"invalid password",
//                 success:false
//             })
//         }
//         const token=jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "1d",
//           });

//           return res.status(200).json({
//             message:"User logged in successfully",
//             success:true,
//             data:token
//           })

//     }
//     catch(err){
//         return req.status(401).json({
//             message:err,message,
//             success:false,
//             data:err
//         })
//     }
// });
router.post("/login", async (req, res) => {
    try {
        console.log("Login request received:", req.body);


        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

     
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password",
                success: false,
            });
        }

        
        const token = jwt.sign({ userId: user._id }, "dmsl", {
            expiresIn: "1d",
        });

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            data: token,
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            success: false,
            data: err,
        });
    }
});
// router.post('/register',async(req,res)=>{
//     try{
//         console.log("req received",req.body.email);
//         const user=await User.findOne({email:req.body.email});
//         if(user){
//             return res.status(200).json({message:"user exists"
//                 ,
//                 success:false
//             })
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword=bcrypt.hash(req.body.password,salt);
//         req.body.password=hashedPassword;
//         const newUser = new User(req.body);
//         await newUser.save();
//         return res.status(200).json({
//             message:"user registered successfully",
//             success:true
//         })
//     }catch(err){
//         return res.status(500).json({
//             message:err.message,
//             data:err,
//             success:false
//         })
//     }
// })


router.post("/register", async (req, res) => {
    try {
        console.log("Request received:", req.body.email);

        // ✅ Check if user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        // ✅ Hash the password correctly
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // ✅ Create a new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            data: err,
            success: false,
        });
    }
});


router.get("/get-all-quiz", async (req, res) => {
    const quizzes = await Quiz.find(); // Fetch all assignments from MongoDB
    res.json(quizzes);
  });
  
  router.put("/get-all-quiz/:assignmentId/questions/:questionId", async (req, res) => {
    try {
        const { assignmentId, questionId } = req.params;
        const { question, options, correctOption } = req.body;

        // Log incoming request data
        console.log("Received PUT request:");
        console.log("Assignment ID:", assignmentId);
        console.log("Question ID:", questionId);
        console.log("Request Body:", req.body);

        const result = await Quiz.findOneAndUpdate(
            { assignmentId: parseInt(assignmentId), "questions.id": parseInt(questionId) },
            {
                $set: {
                    "questions.$.question": question,
                    "questions.$.options": options,
                    "questions.$.correctOption": correctOption,
                },
            },
            { new: true }
        );

        if (!result) {
            console.log("Question not found in database");
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        console.log("Question updated successfully:", result);
        res.json({ success: true, message: "Question updated", data: result });
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;