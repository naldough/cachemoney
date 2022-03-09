const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new mongoose.Schema(
    {
        // _id: new Schema.Types.ObjectId,

        patientId: {
            type: String,
        },
        age: {
            type: String,
            // required: true
        },
        sex: {
            type: String,
            // required: true
        },
        bmi: {
            type: Number,
            // required: true
        },
        zipCode: {
            type: String,
            // required: true
        },

        // exam table 
        
        examId: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        keyFindings: {
            type: String,
            // required: true
        },
        brixiaScore: {
            type: String,
            // required: true
        }
    },

    
);

module.exports = mongoose.model('Patients', Patient);
