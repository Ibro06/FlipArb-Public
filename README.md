# FlipArb

**Adaptive marketplace intelligence for online resellers**

FlipArb is a marketplace analytics system I built from experience buying, repairing, and reselling phones and electronics. It was developed through the University of Delaware VentureOn entrepreneurship program and combines large scale listing analysis, Bayesian learning, API integrations, AI assisted analysis, and real world resale validation.

**Portfolio website:** [https://ibro06.github.io/FlipArb-Public/](https://ibro06.github.io/FlipArb-Public/)

> **Project status:** The hosted deployment is currently paused to avoid recurring hosting and API costs. The original production repository remains private. This public repository is a portfolio showcase of the data pipeline, learning system, architecture, analysis workflow, and product evidence.

## Key metrics

| Metric | Scope |
| --- | --- |
| More than 200,000 marketplace listings scanned | Across development and testing |
| 120,546 raw listings | One recorded Deal Engine session |
| 105,606 listings passed initial filtering | Same recorded session |
| 26,147 listings analyzed | Same recorded session |
| 4 major external API integrations | eBay, MobileSentrix, SickW, OpenAI |

The session figures are not project lifetime totals. They come from one recorded scanner session.

## Business problem

Online resale sourcing is a speed and information problem. A listing can look cheap while still being a bad purchase because of repair costs, carrier lock status, weak comparable sales, poor seller quality, or low market liquidity.

FlipArb turns that manual decision process into a staged analytical pipeline that preserves API budget and surfaces better candidates for human review.

## Architecture summary

```text
Marketplace data
      |
Initial screening
      |
Deduplication
      |
Device verification
      |
AI assisted analysis
      |
Comparable sales
      |
Repair pricing
      |
Device status
      |
Profit and ROI calculation
      |
Risk and confidence scoring
      |
Opportunity classification
      |
Notification
      |
Learning feedback
```

Cheap checks happen first. Expensive enrichment is reserved for listings that still look viable.

Full writeup: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

## Machine learning

FlipArb used Thompson Sampling as a Bayesian multi armed bandit optimizer for adaptive search.

* Each search strategy maintained a Beta distribution
* High quality opportunities generated stronger rewards
* Strategies with better results received more scanning budget
* Daily decay reduced the influence of stale history
* Time of day and day of week performance were tracked
* Auction results could feed performance information back into learning

This is Bayesian online learning and adaptive resource allocation. It is separate from OpenAI powered listing analysis. The public project does not claim neural network training or supervised model accuracy metrics.

* Demo: [`src/thompson_sampling_demo.py`](src/thompson_sampling_demo.py)
* Docs: [`docs/LEARNING_SYSTEM.md`](docs/LEARNING_SYSTEM.md)

## API integrations

These were API or service integrations used during development. FlipArb does not claim partnerships with these companies.

* **eBay APIs** for marketplace search, item details, auctions, and comparable sale workflows
* **MobileSentrix API** for replacement part pricing used in repair cost analysis
* **SickW API** for device status information used to identify carrier or network lock risk
* **OpenAI API** for listing verification, text analysis, image analysis, model extraction, and red flag detection
* **Discord webhooks** for structured opportunity notifications
* **Render** and **Vercel** for deployment during active development

## Real world validation

FlipArb was not only a simulated analytics exercise.

* The system surfaced actual listings
* Selected devices were purchased
* Devices were shipped to me
* They moved through the repair and resale workflow
* They were later sold

That created a feedback loop between analytical recommendations and practical outcomes. This repository does not invent profit numbers.

## Screenshots

### Sourcing dashboard

![FlipArb sourcing dashboard](screenshots/sourcing_dashboard.png)

Marketplace listings with price, projected profit, shipping, seller information, and listing age.

### Deal Engine dashboard

![FlipArb Deal Engine dashboard](screenshots/deal_engine_dashboard.png)

Scanner throughput, filtering volume, analysis volume, and API usage from a recorded operating session.

## Repository structure

```text
README.md
SECURITY.md
data/
  sample_listings.csv
notebooks/
  fliparb_analysis.ipynb
src/
  scoring_demo.py
  thompson_sampling_demo.py
screenshots/
  sourcing_dashboard.png
  deal_engine_dashboard.png
docs/
  index.html
  ARCHITECTURE.md
  LEARNING_SYSTEM.md
  DEMO_SCRIPT.md
  assets/
```

## Explore the analysis

1. Open the portfolio site: [https://ibro06.github.io/FlipArb-Public/](https://ibro06.github.io/FlipArb-Public/)
2. Review the notebook: [`notebooks/fliparb_analysis.ipynb`](notebooks/fliparb_analysis.ipynb)
3. Run the scoring demo:

```bash
python src/scoring_demo.py
```

4. Run the Thompson Sampling demo:

```bash
python src/thompson_sampling_demo.py
```

The CSV in [`data/sample_listings.csv`](data/sample_listings.csv) is synthetic and labeled for public demonstration only.

## Security and portfolio scope

This public repository intentionally excludes API keys, tokens, webhook URLs, environment files, private endpoints, credentials, and production customer data. See [`SECURITY.md`](SECURITY.md).

The original production repository remains private because it contains operational logic and integration configuration that are not required for portfolio review.

## Deeper documentation

* [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
* [`docs/LEARNING_SYSTEM.md`](docs/LEARNING_SYSTEM.md)
* [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md)

## Tech stack

**Languages:** Python, JavaScript, SQL

**Methods:** marketplace analytics, data pipelines, Bayesian learning, risk scoring, confidence scoring, liquidity analysis, resource optimization

**Infrastructure during active development:** asynchronous HTTP workflows, database backed opportunity records, API budget controls, Discord notifications, Render, Vercel
