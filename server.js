import express from "express";
import scrapeCSE from "./bilyonario_news_collector.js"; // your function

const app = express();

app.get("/scrape", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing q parameter" });
  }

  try {
    const results = await scrapeCSE(query);
    res.json({ success: true, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
