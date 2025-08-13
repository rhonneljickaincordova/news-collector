import express from "express";
import { runScraper } from "./bilyonario_news_collector.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/scrape", async (req, res) => {
    const q = req.query.q;
    if (!q) {
        return res.status(400).json({ error: "Missing ?q=searchTerm" });
    }

    try {
        const results = await runScraper(q);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
