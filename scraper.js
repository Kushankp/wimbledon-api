const axios = require("axios");
const cheerio = require("cheerio");

const WIKI_URL = "https://en.wikipedia.org/wiki/List_of_Wimbledon_gentlemen%27s_singles_champions";

async function getWimbledonData() {
  try {
    const { data: html } = await axios.get(WIKI_URL);
    const $ = cheerio.load(html);

    const results = {};
    const cancelledYears = [];

    $("table.wikitable tbody tr").each((i, row) => {
      const cells = $(row).find("td");

      // Handle "No competition" rows
      if (cells.length === 1 || $(row).text().includes("No competition")) {
        const yearText = $(row).text().trim();
        const yearMatch = yearText.match(/\d{4}/);
        if (yearMatch) {
          const year = parseInt(yearMatch[0]);
          results[year] = {
            year,
            champion: null,
            runner_up: null,
            score: "No competition (tournament not held)",
            sets: 0,
            tiebreak: false
          };
          cancelledYears.push(year);
        }
        return;
      }

      // Skip rows without at least 6 cells (normal data rows)
      if (cells.length >= 6) {
        const year = $(cells[0]).text().trim();
        const champion = $(cells[2]).text().trim().replace(/\[\d+\]/g, '');
        const runnerUp = $(cells[4]).text().trim().replace(/\[\d+\]/g, '');
        const score = $(cells[5]).text().trim();

        const cleanedYear = year.match(/\d{4}/)?.[0];

        if (cleanedYear) {
          results[cleanedYear] = {
            year: parseInt(cleanedYear),
            champion,
            runner_up: runnerUp,
            score,
            sets: score.split(',').length,
            tiebreak: score.includes('(')
          };
        }
      }
    });

    const manuallyCancelled = [1915, 1916, 1917, 1918, 1940, 1941, 1942, 1943, 1944, 1945, 2020];
    manuallyCancelled.forEach(year => {
      if (!results[year]) {
        results[year] = {
          year,
          champion: null,
          runner_up: null,
          score: "No competition (tournament not held)",
          sets: 0,
          tiebreak: false
        };
      }
    });

    return results;
  } catch (err) {
    console.error("Error scraping Wimbledon data:", err.message);
    return null;
  }
}

module.exports = getWimbledonData;
