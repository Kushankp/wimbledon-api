const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const data = {
  2021: {
    year: 2021,
    champion: "Novak Djokovic",
    runner_up: "Matteo Berrettini",
    score: "6–7(4–7), 6–4, 6–4, 6–3",
    sets: 4,
    tiebreak: true,
  },
};

app.get("/wimbledon", (req, res) => {
  const year = req.query.year;
  const result = data[year];
  if (!result) return res.status(404).json({ error: "Year not found" });
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
