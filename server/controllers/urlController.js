const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const Url = require("../models/Url");

exports.shortenUrl = async (req, res) => {
  let { longUrl, customCode } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
    longUrl = `https://${longUrl}`;
  }

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ message: "Invalid base server URL" });
  }

  if (!validUrl.isUri(longUrl)) {
    return res
      .status(401)
      .json({ message: "Invalid long URL. Please include a valid domain." });
  }

  try {
    let urlCode;
    if (customCode && customCode.trim() !== "") {
      urlCode = customCode.trim().replace(/[^a-zA-Z0-9-_]/g, "");

      const existingCustom = await Url.findOne({ urlCode });
      if (existingCustom) {
        return res
          .status(400)
          .json({ message: "Custom alias already taken. Try another one." });
      }
    } else {
      urlCode = nanoid(8);
    }

    if (!customCode) {
      let url = await Url.findOne({ longUrl });
      if (url) return res.json(url);
    }

    const shortUrl = baseUrl + "/" + urlCode;
    const url = new Url({
      longUrl,
      shortUrl,
      urlCode,
      date: new Date(),
    });

    await url.save();
    res.json(url);
  } catch (err) {
    console.error("Shorten Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
