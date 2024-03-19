import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBurl } from "./Config.js";
import UserRouter from "./routes/UserRoute.js";
import App from "./auth/google/App.js";


App.use("/users", UserRouter);


App.route("/").get((req, res) => {
    return res.json({
      message: "A simple API"
    });
  });
  
  mongoose
    .connect(mongoDBurl)
    .then(() => {
      console.log("App connected to database");
      App.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
    

