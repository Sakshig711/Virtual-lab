const mongoose=require('mongoose');

const quizschema=new mongoose.Schema({
    assignmentId:Number,
    questions:[{
        id:Number,
        question:String,
        options:[String],
        correctOption:String
    }]
})

module.exports=mongoose.model("quiz",quizschema);