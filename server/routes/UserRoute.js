import express from "express";
import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser"
// import { JWTtoken } from "../auth/jwt/app.js";

const UserRouter = express.Router();
const secretKey =  "secretkey";

UserRouter.use(bodyParser.json());

UserRouter.use(cors());
UserRouter.use(express.json());

UserRouter.route("/auth").post((req,resp)=>{  //generate token
    const {userNameorEmail} = req.body;
    console.log('Received input value:============================', userNameorEmail);
    // const user  =  {
    //     id:1,
    //     username:"abc",
    //     email:"abctest@gmail.com"
    // }
    jwt.sign({userNameorEmail},secretKey,{expiresIn:"30s"},(err,token)=>{      // {user} is used to  create a token wwhich will be stored in the client-side  // security key wil be stored on the server //{expiresIn:"120s"} time pass to the token  to be expired // , then (err,token)=>{}  
      resp.json({
        token
      })  
    })
})


UserRouter.post("/profile",verifyToken,(req,res)=>{     //  IT WILL BE USED IN LOGIN
jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.send({message:"invalid token"})
        }else{
            res.json({
                message:"profile accessed",
                authData
            })
        }
})                           // here we are verifying the token which we get and checking security key is also verified 
})

function verifyToken(req,resp,next) {                       //verify token       // we created this fn for the verificatin of the token 
const bearerHeader =  req.headers["authorization"]                  // accessing the key "authorization" to which we pass token of headers which we have in the postman 
// console.log("bearerHeader",bearerHeader)
if (typeof bearerHeader !== "undefined") {
    const bearer  =  bearerHeader.split(" ");
    // console.log("bearer============",bearer)
    const token =  bearer[1];                       // if token is  existed 
    // console.log("token------------",token)  
    req.token = token;          // ,then it will add that token to the req's token      //HERE WE GOT THE TOKEN BUT IT IS NOT VERIFIED TILL YET      WE will do that where we call that token 
    next();                             // the fn()=>{} after verifyToken will run  that is the working of the next()
}else{
    resp.send({
        result:"Token is not valid"
    })
}
}
















//creating data via POST()
UserRouter.route("/").post(async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ message: "Sent all required fields: email, password", });
        }
        const newUser = {
            email: req.body.email,
            password: req.body.password,
        };
        const user = await User.create(newUser); //Creates an object that has the specified prototype or that has null prototype.
        return res.status(200).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//getting data via GET()
UserRouter.route("/").get(async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ count: users.length, data: users })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})


// searching a single user via particular id 
UserRouter.route("/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const SingleUser = await User.findById(id);       //findById returns the document where the _id field matches the specified id . If the document is not found, the function returns null .
        return res.status(200).json(SingleUser)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})


//update a user via PUT()
UserRouter.route("/:id").put(async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ message: "Sent all required fields: email, password", });
        }
        const { id } = req.params;
        const result = await User.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).send({ message: "User not found", });
        }
        return res.status(400).send({ message: "User updated successfully", });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

UserRouter.route("/:id").delete(async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteUserById  =  await User.findByIdAndDelete(id);
        if (!deleteUserById) {
            return res.status(404).send({ message: "User not deleted", });
        }
        return res.status(400).send({ message: "User deleted successfully", });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})


export default UserRouter;
