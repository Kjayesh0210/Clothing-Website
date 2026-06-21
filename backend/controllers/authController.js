const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    try {
      await sendEmail(
        user.email,
        "Welcome To Clothing Store",
        `
        <h1>
          Welcome ${user.name}
        </h1>

        <p>
          Thanks for joining us.
        </p>
        `,
      );
    } catch (error) {
      console.log("Email Error:", error.message);
    }

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;

    user.phone = req.body.phone || user.phone;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.addresses.push({
      label: req.body.label,
      address: req.body.address,
    });

    await user.save();

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  addAddress,
  getAddresses,
};
