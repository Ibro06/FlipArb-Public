/**
 * FlipArb portfolio site interactions.
 * Scoring demo mirrors src/scoring_demo.py for recruiter exploration.
 */

(function () {
  "use strict";

  function riskMultiplier(level) {
    if (level === "Medium") return 0.9;
    if (level === "High") return 0.75;
    return 1;
  }

  function freshnessBonus(age) {
    if (age < 2) return 15;
    if (age < 5) return 10;
    if (age < 15) return 5;
    return 0;
  }

  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (anchor) {
      anchor.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initScorer() {
    const profit = document.getElementById("profit");
    const confidence = document.getElementById("confidence");
    const age = document.getElementById("age");
    const liquidity = document.getElementById("liquidity");
    const risk = document.getElementById("risk");
    if (!profit || !confidence || !age || !liquidity || !risk) return;

    function update() {
      const profitVal = Number(profit.value);
      const confidenceVal = Number(confidence.value);
      const ageVal = Number(age.value);
      const liquidityVal = Number(liquidity.value);
      const riskVal = risk.value;

      document.getElementById("profitValue").textContent = "$" + profitVal;
      document.getElementById("confidenceValue").textContent = String(confidenceVal);
      document.getElementById("ageValue").textContent = ageVal + " min";
      document.getElementById("liquidityValue").textContent = String(liquidityVal);

      const adjusted = profitVal * riskMultiplier(riskVal);
      const fresh = freshnessBonus(ageVal);
      const score =
        adjusted +
        confidenceVal * 0.6 +
        fresh +
        (liquidityVal - 50) * 0.15;

      document.getElementById("score").textContent = score.toFixed(1);
      document.getElementById("adjustedProfit").textContent = "$" + adjusted.toFixed(0);
      document.getElementById("freshness").textContent = String(fresh);
    }

    [profit, confidence, age, liquidity, risk].forEach(function (field) {
      field.addEventListener("input", update);
    });
    update();
  }

  function init() {
    initNav();
    initScorer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
