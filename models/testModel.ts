import { Schema, model, models } from "mongoose";

// refer to documentation about mongoose Schemas

const testSchema = new Schema({
    name: String,
    // same thing as:
    /*
    name: {
        type: String
    }
    */
    email: {
        type: String,
        required: true,
        unique: true,
    }
});


// need to use or here because we don't want to create a new model everytime we hit an api route
const Test = models.Test || model('Test', testSchema);

export default Test;