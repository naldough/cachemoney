const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema(
    {
        patient_id: new Schema.Types.ObjectId,
        
        Age: {
            type: Number,
            required: true
        },
        Sex: {
            type: String,
            required: true
        },
        BMI: {
            type: Number,
            required: true
        },
        Race: {
            type: String,
            required: True
        },
        Zip_Code: {
            type: Number,
            required: true
        
        },
    },
    {timestamps:true},
);

module.exports = mongoose.model('Patient',Patient);
