const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema(
    {
        //Exam_id: new mongoose.Types.ObjectId,
        //Patient_id: new mongoose.Types.ObjectId,
       Image: {
            type: String,
            required: true
        },
        Key_findings: {
            type: String,
            required: true
        },
        Brixia_Scores: {
            type: Array,
            required: true
        },
    },
    {timestamps: true},
    
);

module.exports = mongoose.model('Exams',Exam);
