//     // creating a book schema
// import mongoose from "mongoose";
// const userSchema = mongoose.Schema(         //mongoose.Schema is a constructor function provided by the Mongoose library for defining the structure of documents in a MongoDB collection.
//     {
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// },
// {
//     timestamps: true
// }
// );
// export const User = mongoose.model("users", userSchema);  //Once you've defined a schema, you compile it into a Model using the mongoose.model method. Models are constructors created from schemas and provide an interface for interacting with a specific MongoDB collection.

// creating a book schema
import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  //mongoose.Schema is a constructor function provided by the Mongoose library for defining the structure of documents in a MongoDB collection.
  {
    email: { type: String, required:true},
    password: { type: String},
    googleid: { type: String },
    displayname: { type: String },
    image: { type: String },
    status: { type: Boolean },
    source: { type: String },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("users", userSchema); //Once you've defined a schema, you compile it into a Model using the mongoose.model method. Models are constructors created from schemas and provide an interface for interacting with a specific MongoDB collection.
