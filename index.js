const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const data = {
  2018: {
    year: 2018,
    champion: "Novak Djokovic",
    runner_up: "Kevin Anderson",
    score: "6–2, 6–2, 7–6(7–3)",
    sets: 3,
    tiebreak: true
  },
  2019: {
    year: 2019,
    champion: "Novak Djokovic",
    runner_up: "Roger Federer",
    score: "7–6(7–5), 1–6, 7–6(7–4), 4–6, 13–12(7–3)",
    sets: 5,
    tiebreak: true
  },
  2020: {
    year: 2020,
    champion: null,
    runner_up: null,
    score: "Cancelled due to COVID-19 pandemic",
    sets: 0,
    tiebreak: false
  },
  2021: {
    year: 2021,
    champion: "Novak Djokovic",
    runner_up: "Matteo Berrettini",
    score: "6–7(4–7), 6–4, 6–4, 6–3",
    sets: 4,
    tiebreak: true
  },
  2022: {
    year: 2022,
    champion: "Novak Djokovic",
    runner_up: "Nick Kyrgios",
    score: "4–6, 6–3, 6–4, 7–6(7–3)",
    sets: 4,
    tiebreak: true
  },
  2023: {
    year: 2023,
    champion: "Carlos Alcaraz",
    runner_up: "Novak Djokovic",
    score: "1–6, 7–6(8–6), 6–1, 3–6, 6–4",
    sets: 5,
    tiebreak: true
  },
  2024: {
    year: 2024,
    champion: "Carlos Alcaraz",
    runner_up: "Novak Djokovic",
    score: "6–4, 7–6(7–5), 6–3",
    sets: 3,
    tiebreak: true
  }
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
