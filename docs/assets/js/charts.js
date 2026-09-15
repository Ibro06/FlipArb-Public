/**
 * FlipArb portfolio charts.
 * Built with plain SVG so GitHub Pages stays dependency free.
 */

(function () {
  "use strict";

  function el(tag, attrs, children) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) {
      Object.entries(attrs).forEach(function ([key, value]) {
        node.setAttribute(key, value);
      });
    }
    (children || []).forEach(function (child) {
      if (typeof child === "string") {
        node.appendChild(document.createTextNode(child));
      } else if (child) {
        node.appendChild(child);
      }
    });
    return node;
  }

  function clear(target) {
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
  }

  function formatInt(n) {
    return n.toLocaleString("en-US");
  }

  function renderFunnel(container) {
    const stages = [
      { label: "Raw listings", value: 120546, color: "#1457ff" },
      { label: "Passed initial filtering", value: 105606, color: "#0d7a6f" },
      { label: "Analyzed", value: 26147, color: "#a35b12" }
    ];

    const width = 720;
    const rowH = 54;
    const gap = 18;
    const height = stages.length * (rowH + gap) + 10;
    const labelW = 210;
    const valueW = 90;
    const barMax = width - labelW - valueW - 24;
    const maxVal = stages[0].value;

    const svg = el("svg", {
      viewBox: "0 0 " + width + " " + height,
      role: "img",
      "aria-labelledby": "funnelTitle funnelDesc"
    }, [
      el("title", { id: "funnelTitle" }, ["Recorded Deal Engine session funnel"]),
      el("desc", { id: "funnelDesc" }, [
        "Horizontal bars showing 120546 raw listings, 105606 listings that passed initial filtering, and 26147 listings analyzed."
      ])
    ]);

    stages.forEach(function (stage, index) {
      const y = index * (rowH + gap);
      const barW = Math.max(8, (stage.value / maxVal) * barMax);

      svg.appendChild(el("text", {
        x: 0,
        y: y + 22,
        fill: "#1a2332",
        "font-size": "14",
        "font-family": "Plus Jakarta Sans, sans-serif",
        "font-weight": "600"
      }, [stage.label]));

      svg.appendChild(el("rect", {
        x: labelW,
        y: y + 4,
        width: barMax,
        height: 28,
        rx: "8",
        fill: "#ebe7df"
      }));

      svg.appendChild(el("rect", {
        x: labelW,
        y: y + 4,
        width: String(barW),
        height: 28,
        rx: "8",
        fill: stage.color
      }));

      svg.appendChild(el("text", {
        x: labelW + barMax + 12,
        y: y + 24,
        fill: "#1a2332",
        "font-size": "14",
        "font-family": "Plus Jakarta Sans, sans-serif",
        "font-weight": "700"
      }, [formatInt(stage.value)]));
    });

    clear(container);
    container.appendChild(svg);
  }

  function renderBudget(container) {
    const slices = [
      { label: "New listings", value: 45, color: "#1457ff" },
      { label: "Ending auctions", value: 20, color: "#0d7a6f" },
      { label: "Misspelling search", value: 10, color: "#3d7ea6" },
      { label: "Category feed", value: 10, color: "#5b6fd6" },
      { label: "Seller scan", value: 10, color: "#c45c26" },
      { label: "Refresh queue", value: 5, color: "#a35b12" }
    ];

    const width = 720;
    const height = 280;
    const cx = 150;
    const cy = 140;
    const radius = 96;
    const total = slices.reduce(function (sum, s) { return sum + s.value; }, 0);

    const svg = el("svg", {
      viewBox: "0 0 " + width + " " + height,
      role: "img",
      "aria-labelledby": "budgetTitle budgetDesc"
    }, [
      el("title", { id: "budgetTitle" }, ["Scanner resource allocation"]),
      el("desc", { id: "budgetDesc" }, [
        "Donut chart of scanner source budget shares across six sourcing strategies."
      ])
    ]);

    let angle = -Math.PI / 2;
    slices.forEach(function (slice) {
      const sweep = (slice.value / total) * Math.PI * 2;
      const x1 = cx + Math.cos(angle) * radius;
      const y1 = cy + Math.sin(angle) * radius;
      const end = angle + sweep;
      const x2 = cx + Math.cos(end) * radius;
      const y2 = cy + Math.sin(end) * radius;
      const large = sweep > Math.PI ? 1 : 0;
      const d = [
        "M", cx, cy,
        "L", x1, y1,
        "A", radius, radius, 0, large, 1, x2, y2,
        "Z"
      ].join(" ");

      svg.appendChild(el("path", { d: d, fill: slice.color }));
      angle = end;
    });

    svg.appendChild(el("circle", {
      cx: String(cx),
      cy: String(cy),
      r: "54",
      fill: "#ffffff"
    }));

    svg.appendChild(el("text", {
      x: String(cx),
      y: String(cy - 4),
      "text-anchor": "middle",
      fill: "#1a2332",
      "font-size": "18",
      "font-family": "Plus Jakarta Sans, sans-serif",
      "font-weight": "700"
    }, ["100%"]));

    svg.appendChild(el("text", {
      x: String(cx),
      y: String(cy + 16),
      "text-anchor": "middle",
      fill: "#5a6574",
      "font-size": "12",
      "font-family": "Plus Jakarta Sans, sans-serif"
    }, ["API budget"]));

    slices.forEach(function (slice, index) {
      const col = index < 3 ? 0 : 1;
      const row = index % 3;
      const x = 320 + col * 190;
      const y = 58 + row * 58;

      svg.appendChild(el("rect", {
        x: String(x),
        y: String(y),
        width: "12",
        height: "12",
        rx: "3",
        fill: slice.color
      }));

      svg.appendChild(el("text", {
        x: String(x + 20),
        y: String(y + 11),
        fill: "#1a2332",
        "font-size": "14",
        "font-family": "Plus Jakarta Sans, sans-serif",
        "font-weight": "600"
      }, [slice.label]));

      svg.appendChild(el("text", {
        x: String(x + 20),
        y: String(y + 30),
        fill: "#5a6574",
        "font-size": "13",
        "font-family": "Plus Jakarta Sans, sans-serif"
      }, [slice.value + "% of cycle budget"]));
    });

    clear(container);
    container.appendChild(svg);
  }

  /**
   * Synthetic Thompson Sampling demonstration.
   * Not production measurements.
   */
  function simulateThompsonRounds() {
    const arms = [
      { name: "Standard query", rate: 0.18, alpha: 1, beta: 1, color: "#1457ff" },
      { name: "Misspelling query", rate: 0.34, alpha: 1, beta: 1, color: "#0d7a6f" },
      { name: "Damage variant", rate: 0.26, alpha: 1, beta: 1, color: "#a35b12" }
    ];

    function seededRandom(seed) {
      let s = seed;
      return function () {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
      };
    }

    function sampleBeta(alpha, beta, rand) {
      // Approximate Beta via normalized gamma samples (Marsaglia style light approx for demo)
      function gamma(shape) {
        if (shape < 1) {
          return gamma(shape + 1) * Math.pow(rand(), 1 / shape);
        }
        const d = shape - 1 / 3;
        const c = 1 / Math.sqrt(9 * d);
        while (true) {
          let x;
          let v;
          do {
            x = (function () {
              // Box Muller normal
              const u = 1 - rand();
              const v2 = 1 - rand();
              return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v2);
            })();
            v = 1 + c * x;
          } while (v <= 0);
          v = v * v * v;
          const u = rand();
          if (u < 1 - 0.0331 * (x * x) * (x * x)) return d * v;
          if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
        }
      }
      const x = gamma(alpha);
      const y = gamma(beta);
      return x / (x + y);
    }

    const rand = seededRandom(7);
    const snapshots = [];
    const roundMarks = [0, 25, 75, 150, 250];
    let round = 0;

    function capture() {
      const means = arms.map(function (arm) {
        return {
          name: arm.name,
          color: arm.color,
          mean: arm.alpha / (arm.alpha + arm.beta),
          alpha: arm.alpha,
          beta: arm.beta
        };
      });
      snapshots.push({ round: round, arms: means });
    }

    capture();

    while (round < 250) {
      const samples = arms.map(function (arm) {
        return sampleBeta(arm.alpha, arm.beta, rand);
      });
      let best = 0;
      for (let i = 1; i < samples.length; i += 1) {
        if (samples[i] > samples[best]) best = i;
      }
      const arm = arms[best];
      const reward = rand() < arm.rate ? 1 : 0;
      arm.alpha += reward;
      arm.beta += 1 - reward;
      round += 1;
      if (roundMarks.indexOf(round) !== -1) capture();
    }

    return snapshots;
  }

  function renderThompson(container) {
    const snapshots = simulateThompsonRounds();
    const arms = snapshots[0].arms;
    const width = 720;
    const height = 320;
    const margin = { top: 24, right: 24, bottom: 48, left: 48 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const groupW = plotW / snapshots.length;
    const barW = groupW / (arms.length + 1);

    const svg = el("svg", {
      viewBox: "0 0 " + width + " " + height,
      role: "img",
      "aria-labelledby": "tsTitle tsDesc"
    }, [
      el("title", { id: "tsTitle" }, ["Synthetic Thompson Sampling demonstration"]),
      el("desc", { id: "tsDesc" }, [
        "Grouped bars showing how synthetic posterior means change across rounds as successful strategies receive more selections."
      ])
    ]);

    // axes
    svg.appendChild(el("line", {
      x1: String(margin.left),
      y1: String(margin.top),
      x2: String(margin.left),
      y2: String(margin.top + plotH),
      stroke: "#c3cddb",
      "stroke-width": "1"
    }));
    svg.appendChild(el("line", {
      x1: String(margin.left),
      y1: String(margin.top + plotH),
      x2: String(margin.left + plotW),
      y2: String(margin.top + plotH),
      stroke: "#c3cddb",
      "stroke-width": "1"
    }));

    [0, 0.25, 0.5, 0.75, 1].forEach(function (tick) {
      const y = margin.top + plotH - tick * plotH;
      svg.appendChild(el("line", {
        x1: String(margin.left),
        y1: String(y),
        x2: String(margin.left + plotW),
        y2: String(y),
        stroke: "#ebe7df",
        "stroke-width": "1"
      }));
      svg.appendChild(el("text", {
        x: String(margin.left - 10),
        y: String(y + 4),
        "text-anchor": "end",
        fill: "#5a6574",
        "font-size": "12",
        "font-family": "Plus Jakarta Sans, sans-serif"
      }, [tick.toFixed(2)]));
    });

    snapshots.forEach(function (snap, sIndex) {
      const groupX = margin.left + sIndex * groupW + barW * 0.5;
      snap.arms.forEach(function (arm, aIndex) {
        const h = arm.mean * plotH;
        const x = groupX + aIndex * barW;
        const y = margin.top + plotH - h;
        svg.appendChild(el("rect", {
          x: String(x),
          y: String(y),
          width: String(Math.max(8, barW - 4)),
          height: String(Math.max(1, h)),
          rx: "4",
          fill: arm.color
        }));
      });

      svg.appendChild(el("text", {
        x: String(groupX + (barW * arms.length) / 2),
        y: String(margin.top + plotH + 24),
        "text-anchor": "middle",
        fill: "#5a6574",
        "font-size": "12",
        "font-family": "Plus Jakarta Sans, sans-serif"
      }, ["Round " + snap.round]));
    });

    // legend
    arms.forEach(function (arm, index) {
      const x = margin.left + index * 180;
      const y = height - 12;
      svg.appendChild(el("rect", {
        x: String(x),
        y: String(y - 10),
        width: "10",
        height: "10",
        rx: "2",
        fill: arm.color
      }));
      svg.appendChild(el("text", {
        x: String(x + 16),
        y: String(y),
        fill: "#1a2332",
        "font-size": "12",
        "font-family": "Plus Jakarta Sans, sans-serif"
      }, [arm.name]));
    });

    clear(container);
    container.appendChild(svg);
  }

  function initCharts() {
    const funnel = document.getElementById("chart-funnel");
    const budget = document.getElementById("chart-budget");
    const thompson = document.getElementById("chart-thompson");
    if (funnel) renderFunnel(funnel);
    if (budget) renderBudget(budget);
    if (thompson) renderThompson(thompson);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCharts);
  } else {
    initCharts();
  }
})();
