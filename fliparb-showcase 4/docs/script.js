const fields = {
  profit: document.querySelector('#profit'),
  confidence: document.querySelector('#confidence'),
  age: document.querySelector('#age'),
  liquidity: document.querySelector('#liquidity'),
  risk: document.querySelector('#risk')
};

function riskMultiplier(level) {
  if (level === 'Medium') return 0.90;
  if (level === 'High') return 0.75;
  return 1.00;
}

function freshness(age) {
  if (age < 2) return 15;
  if (age < 5) return 10;
  if (age < 15) return 5;
  return 0;
}

function updateScore() {
  const profit = Number(fields.profit.value);
  const confidence = Number(fields.confidence.value);
  const age = Number(fields.age.value);
  const liquidity = Number(fields.liquidity.value);
  const risk = fields.risk.value;

  document.querySelector('#profitValue').textContent = '$' + profit;
  document.querySelector('#confidenceValue').textContent = confidence;
  document.querySelector('#ageValue').textContent = age + ' min';
  document.querySelector('#liquidityValue').textContent = liquidity;

  const score = profit * riskMultiplier(risk)
    + confidence * 0.60
    + freshness(age)
    + (liquidity - 50) * 0.15;

  document.querySelector('#score').textContent = score.toFixed(1);
  document.querySelector('#adjustedProfit').textContent = '$' + (profit * riskMultiplier(risk)).toFixed(0);
  document.querySelector('#freshness').textContent = freshness(age).toFixed(0);
}

Object.values(fields).forEach(el => el.addEventListener('input', updateScore));
updateScore();
