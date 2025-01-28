const express = require("express");
const app = express();
const cors = require("cors");
require("./connect.js");
const doc = require("./docschema.js");

const corsOptions = {
    origin: ["https://virtual-lab-nine.vercel.app","https://dmsl-virtual-lab.vercel.app/","https://virtual-lab-ksdhake28s-projects.vercel.app/"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, resp) => {
    resp.send("hi");
});

app.get("/practical/:id", async (req, resp) => {
    const assign_id = req.params.id;
    try {
        const data = await doc.find({ id: assign_id });
        
        if (data) {
            resp.status(200).json(data);
        } else {
            resp.status(404).send("Document not found");
        }
    } catch (error) {
        resp.status(500).send("Server Error");
    }
});

app.get("/assignmentlist", async(req,resp) =>{
    try{
        const list = await doc.find().select({id:1,aim:1,_id:0}).sort({id:1});
        resp.status(200).json({
            error:"false",
            data:list
        })
    }catch(err){
        resp.send(500).json({
            error:"true",
            message:"Internal error"
        })
    }
});

app.listen(3000, () => {
    console.log("Listening on 3000");
});
