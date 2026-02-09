const Url = require("../models/Url");
const crypto = require("crypto");

exports.shortenUrl = async (req, res) => {
  try {
    let { longUrl, customCode } = req.body;
    const baseUrl = process.env.BASE_URL;

    console.log("Request received for URL:", longUrl);

    if (!longUrl) return res.status(400).json({ message: "URL is required" });

    if (!longUrl.startsWith("http")) {
      longUrl = `https://${longUrl}`;
    }

    let urlCode;
    if (customCode && customCode.trim() !== "") {
      urlCode = customCode
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "");
      const existingCustom = await Url.findOne({ urlCode });
      if (existingCustom)
        return res.status(400).json({ message: "Alias taken" });
    } else {
      urlCode = crypto.randomBytes(3).toString("hex");
    }

    const shortUrl = `${baseUrl}/${urlCode}`;
    const newUrl = new Url({ longUrl, shortUrl, urlCode, date: new Date() });

    await newUrl.save();
    console.log("URL Saved Successfully:", urlCode);
    return res.status(201).json(newUrl);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
