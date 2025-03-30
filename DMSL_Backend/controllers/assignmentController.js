const doc = require("../models/docschema");

const assignmentController = {
    getPractical: async (req, resp) => {
        const assign_id = req.params.id;
        try {
            const data = await doc.find({ id: assign_id });
            if (data && data.length > 0) {
                resp.status(200).json(data);
            } else {
                resp.status(404).send("Document not found");
            }
        } catch (error) {
            resp.status(500).send("Server Error");
        }
    },

    getAssignmentList: async (req, resp) => {
        try {
            const list = await doc
                .find()
                .select({ id: 1, aim: 1, title: 1, _id: 0 })
                .sort({ id: 1 });
            resp.status(200).json({
                error: "false",
                data: list,
            });
        } catch (err) {
            resp.status(500).json({
                error: "true",
                message: "Internal error",
            });
        }
    }
};

module.exports = assignmentController;