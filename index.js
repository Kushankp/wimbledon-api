const express = require("express");
const getWimbledonData = require("./scraper"); // Correctly imported
const app = express();
const PORT = process.env.PORT || 3000;

let cachedData = null;

// Fetch data when server starts
(async () => {
  try {
    cachedData = await getWimbledonData();
    console.log("✅ Wimbledon data cached successfully.");
  } catch (err) {
    console.error("❌ Failed to cache data on startup:", err.message);
  }
})();

app.get("/wimbledon", (req, res) => {
  const year = req.query.year;

  if (!year) {
    return res.status(400).json({ error: "Please provide a year, e.g., /wimbledon?year=2023" });
  }

  if (!cachedData) {
    return res.status(503).json({ error: "Data not yet loaded. Try again shortly." });
  }

  const result = cachedData[year];
  if (!result) {
    return res.status(404).json({ error: `No data found for year ${year}` });
  }

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
