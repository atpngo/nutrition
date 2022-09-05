import { Schema, model, models, Types } from "mongoose";

const modelSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    height_ft: {
        type: String,
        default: ""
    },
    height_in: {
        type: String,
        default: ""
    },
    age: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: "null"
    },
    weight: {
        type: String,
        default: ""
    },
    diet: {
        type: String,
        default: "null"
    },
    activity: {
        type: String,
        default: "null"
    },
    goals: {
        type: String,
        default: "null"
    },
    allergies: [{type: String}],
    nutrition: {
        type: Map,
        of: String,
        default: {
            "calories": "",
            "fats": "",
            "carbohydrates": "",
            "protein": ""
        }
    },
    RMR: {
        type: String,
        default: "0"
    }

})

const User = models.User || model('User', modelSchema);

export default User;