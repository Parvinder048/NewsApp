const News = require("../models/newsModel");
const Users = require("../models/userModel"); // ✅ FIX
const jwt = require("jsonwebtoken");

// Get all news
const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// ✅ FIX: res added as parameter
const verifyToken = async (req, res) => {
  try {
    let header = req.headers.authorization;
    let token = header && header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        errmsg: "Access Denied. No token provided.",
      });
    }

    let { id } = jwt.verify(token, "thisisyoursecuritykey");
    let user = await Users.findById(id);

    if (!user) {
      return res.status(401).send("invalid token");
    }

    req.userId = id; // pass user id forward
    return user;
  } catch (error) {
    res.status(400).send("invalid token");
  }
};

const getNewsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const news = await News.find({ userId: userId });
    res.status(200).send(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news by user ID", error });
  }
};

// Create news
const createNews = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const news = new News({ ...req.body, userId });
    await news.save();

    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: "Error creating news", error });
  }
};

// Update news
const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ message: "Error updating news", error });
  }
};

// Delete news
const deleteNews = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ message: "News ID is required" });
    }

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};

module.exports = {   // ✅ FIX: match require syntax
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsByUserId,
};
