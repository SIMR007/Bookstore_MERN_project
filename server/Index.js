import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBurl } from "./Config.js";
import UserRouter from "./routes/UserRoute.js";
import Google from "./auth/google/App.js";

Google.use("/users", UserRouter);


Google.route("/").get((req, res) => {
    return res.json({
      message: "A simple API"
    });
  });
  
  mongoose
    .connect(mongoDBurl)
    .then(() => {
      console.log("App connected to database");
      Google.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
    
