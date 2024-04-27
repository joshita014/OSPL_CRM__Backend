import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./user.model.js";
import Project from "../projects/project.model.js";

export default class UserController {
  async signup(req, res) {
    try {
      // Find and check if user exist
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          status: "fail",
          message: "User already exists",
        });
      }

      // If user does not exist

      const hashPassword = await bcrypt.hash(req.body.password, 12);

      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
      });
      const newProject = await Project.create({});

      return res.status(201).json({
        status: "success",
        message: "User registered successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "Internal Server error",
      });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;

      // check if user exist
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      // check if password is correct

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({
          status: "fail",
          message: "Incorrect credentials entered",
        });
      }

      // assign token

      const token = jwt.sign(
        { id: user._id, name: user.firstName },
        process.env.SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        status: "success",
        message: "Successfully signedin",
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "Internal Server error",
      });
    }
  }
  async signout(req, res) {
    try {
      // Clear the token stored on the client side
      // For example, if you're using JWT stored in local storage
      res.clearCookie("token"); // Clear the token cookie

      // If using JWT stored in local storage, you can send a response to clear it on the client side
      // res.clearCookie('token').json({ status: 'success', message: 'Successfully signed out' });

      // If you're using JWT stored in local storage, you may also want to clear it from the client side
      // res.clearCookie('token').send('<script>window.localStorage.removeItem("token"); window.location="/";</script>');

      return res.status(200).json({
        status: "success",
        message: "Successfully signed out",
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "Internal Server error",
      });
    }
  }
}
