import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    const file = req.file;
    let profilePhotoUrl = "";
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ message: "User already exists", success: false });

    // ✅ Remove extra hashing, model will hash password automatically
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password, // plain password
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    return res
      .status(201)
      .json({ message: "Account created successfully.", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });

    if (role.toLowerCase() !== user.role.toLowerCase())
      return res.status(400).json({
        message: "Account doesn't exist with this role",
        success: false,
      });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Remove sensitive fields from response
    const {
      password: pwd,
      resetPasswordToken,
      resetPasswordExpire,
      ...userData
    } = user._doc;

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = Array.isArray(skills) ? skills : skills.split(",");
    }

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.profilePhoto = cloudResponse.secure_url;
    }

    await user.save();
    return res.json({ success: true, message: "Profile updated", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// REQUEST PASSWORD RESET
export const requestPasswordChange = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/change-password/${resetToken}`;
    const message = `<p>Click <a href="${resetUrl}">here</a> to reset your password (10 min).</p>`;

    await sendEmail(user.email, "Password Reset", message);

    return res.json({ success: true, message: "Reset link sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = newPassword; // model will hash automatically
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
