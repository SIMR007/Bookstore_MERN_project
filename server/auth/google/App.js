import express from "express";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import cors from "cors";
import dotenv from 'dotenv';
import { User } from "../../models/UserModel.js";
// import UserRouter from "../../routes/UserRoute.js";
dotenv.config(); // Load variables from .env file

const Google = express();


// Now you can access the variables like this:
const googleclientid = process.env.GOOGLE_CLIENT_ID;
const googleclientsecret = process.env.GOOGLE_CLIENT_SECRET;

Google.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
Google.use(express.json());


// Add this middleware to fix the Cross-Origin-Opener-Policy error
Google.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// setup session
Google.use(session({
  secret:googleclientsecret,
  resave: false,
  saveUninitialized: true,
}));

// setuppassport
Google.use(passport.initialize());
Google.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: googleclientid,
  clientSecret: googleclientsecret,
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("Profile ID:", profile.id);
    let user = await User.findOne({ googleid: profile.id });

    console.log("Existing user:", user);
    if (!user) {
      user = new User({
        googleid: profile.id,
        displayname: profile.displayname,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      });
      await user.save();
    }
    return done(null, user);
  } catch (error) {
    console.error("Error finding user:", error);
    return done(error, null);
  }
}));





passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google oauth login
Google.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

Google.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("http://localhost:3000/login"); // Redirect to login page on authentication failure
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("http://localhost:3000/dashboard"); // Redirect to dashboard on successful authentication
    });
  })(req, res, next);
});

Google.get("/login/success", async (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});


Google.get("/logout",(req,res,next)=>{
    req.logout(function(err){
      if(err){return next(err)}
      res.redirect("http://localhost:3000");
    })
  })

export default Google;
  





