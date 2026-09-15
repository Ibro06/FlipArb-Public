# FlipArb Architecture

## Design goal

FlipArb was designed as an opportunity intelligence system rather than a simple marketplace search tool. The architecture separates cheap filtering, expensive enrichment, scoring, notification, and learning so each layer can be reasoned about independently.

## Main flow

```text
User alert
    ↓
Query planning
    ↓
Marketplace sources
    ↓
Cheap viability screen
    ↓
Cache and duplicate state
    ↓
Rule based verification
    ↓
AI assisted verification
    ↓
Comparable sales
    ↓
Repair pricing and device status
    ↓
Profit, ROI, confidence, risk, liquidity
    ↓
Opportunity classification
    ↓
Dashboard and notifications
    ↓
Query performance feedback
```

## Scanner sources

The scanner can draw opportunities from several sources.

* New listings
* Ending auctions
* Misspelling searches
* Category browsing
* Seller inventory checks
* Refresh checks for near miss opportunities

Each source has a budget share and is monitored for efficiency.

## Cheap viability screen

The first stage rejects obvious bad candidates before expensive enrichment. Examples include extremely low prices, no images, accessory only titles, and listings already too close to the maximum acceptable buy price.

This design protects API budget and reduces unnecessary AI analysis.

## Verification

Verification combines deterministic rules with optional AI assisted analysis.

The rule layer looks for device signals, accessory signals, parts only language, and other obvious patterns. The AI layer can inspect title, description, images, and item specifics to produce structured information about listing type, model, storage, carrier information, condition, and red flags.

## Comparable sales

Comparable sales are separated into working device and donor device pools. This prevents a broken or locked device from inheriting an unrealistic resale value from working device sales.

The resale estimate uses recent comparable sales and can apply robust statistics such as medians, lower quartile information, and outlier trimming.

## Repair and device status

Repair cost is part of the purchase decision. MobileSentrix API data was used for replacement part pricing and repair cost estimation.

SickW API data was used for device status checks when carrier or network lock information affected resale value.

## Opportunity scoring

The decision layer combines several signals.

* projected profit
* return on investment
* confidence
* risk
* comparable sale count
* market liquidity
* listing freshness
* repair cost availability
* resale estimate availability
* device status

A listing can be classified as alert ready, needs review, or rejected.

## Learning loop

Query performance is recorded after each scan cycle. Thompson Sampling uses that history to favor search queries that have produced higher quality opportunities. Daily decay reduces the influence of stale history and time learning tracks useful hours and weekdays.

See [`LEARNING_SYSTEM.md`](LEARNING_SYSTEM.md) for the full public explanation.

## API efficiency

The system uses several controls to reduce unnecessary marketplace calls.

* cycle budgets
* caching
* duplicate tracking
* staged analysis
* source efficiency measurement
* throttle monitoring
* refresh scheduling
* query performance learning

## Notifications

Structured alerts can be delivered to the application and Discord. Alerts include the information needed to evaluate a deal quickly, such as price, projected profit, return on investment, confidence, seller information, and source.

## Public versus private code

The public repository demonstrates the architecture and analytical methods. Production credentials, private endpoints, webhook addresses, integration secrets, and the full production implementation are intentionally excluded.
