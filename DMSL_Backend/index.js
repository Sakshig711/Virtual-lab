const express = require("express");
const app = express();
const cors = require("cors");
require("./connect.js");
const doc = require("./docschema.js");

const corsOptions = {
    origin: "https://virtual-lab-nine.vercel.app",
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
        console.log(data);
        if (data) {
            resp.status(200).json(data);
        } else {
            resp.status(404).send("Document not found");
        }
    } catch (error) {
        resp.status(500).send("Server Error");
    }
});
app.listen(3000, () => {
    console.log("Listening on 3000");
});
