"""Public FlipArb scoring demonstration using synthetic inputs only."""

from dataclasses import dataclass


RISK_MULTIPLIER = {
    "Low": 1.00,
    "Medium": 0.90,
    "High": 0.75,
}


@dataclass
class Opportunity:
    projected_profit: float
    confidence: float
    risk_level: str
    listing_age_minutes: float
    liquidity_score: float


def freshness_bonus(age_minutes: float) -> float:
    if age_minutes < 2:
        return 15.0
    if age_minutes < 5:
        return 10.0
    if age_minutes < 15:
        return 5.0
    return 0.0


def opportunity_score(opp: Opportunity) -> float:
    adjusted_profit = opp.projected_profit * RISK_MULTIPLIER[opp.risk_level]
    confidence_component = opp.confidence * 0.60
    liquidity_component = (opp.liquidity_score - 50.0) * 0.15
    return round(
        adjusted_profit
        + confidence_component
        + freshness_bonus(opp.listing_age_minutes)
        + liquidity_component,
        2,
    )


if __name__ == "__main__":
    example = Opportunity(
        projected_profit=82,
        confidence=84,
        risk_level="Low",
        listing_age_minutes=3.2,
        liquidity_score=78,
    )
    print(opportunity_score(example))
