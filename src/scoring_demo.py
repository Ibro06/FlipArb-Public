"""
Public FlipArb scoring demonstration.

This module shows how several opportunity signals can be combined into a
single demonstration score. It uses synthetic inputs only and is not the
production scoring implementation.
"""

from __future__ import annotations

from dataclasses import dataclass


RISK_MULTIPLIER = {
    "Low": 1.00,
    "Medium": 0.90,
    "High": 0.75,
}


@dataclass(frozen=True)
class Opportunity:
    """Synthetic opportunity inputs for the public scoring demo."""

    projected_profit: float
    confidence: float
    risk_level: str
    listing_age_minutes: float
    liquidity_score: float


def freshness_bonus(age_minutes: float) -> float:
    """Return a small bonus when a listing is still fresh."""
    if age_minutes < 2:
        return 15.0
    if age_minutes < 5:
        return 10.0
    if age_minutes < 15:
        return 5.0
    return 0.0


def opportunity_score(opportunity: Opportunity) -> float:
    """
    Combine profit, risk, confidence, freshness, and liquidity.

    The formula is intentionally simple for portfolio review. Production
    FlipArb used additional private gates and evidence checks.
    """
    if opportunity.risk_level not in RISK_MULTIPLIER:
        raise ValueError(f"Unsupported risk level: {opportunity.risk_level}")

    adjusted_profit = (
        opportunity.projected_profit * RISK_MULTIPLIER[opportunity.risk_level]
    )
    confidence_component = opportunity.confidence * 0.60
    liquidity_component = (opportunity.liquidity_score - 50.0) * 0.15

    return round(
        adjusted_profit
        + confidence_component
        + freshness_bonus(opportunity.listing_age_minutes)
        + liquidity_component,
        2,
    )


def classify_bucket(score: float) -> str:
    """Map a demonstration score to a coarse review bucket."""
    if score >= 120:
        return "alert_ready"
    if score >= 70:
        return "needs_review"
    return "rejected"


if __name__ == "__main__":
    example = Opportunity(
        projected_profit=82,
        confidence=84,
        risk_level="Low",
        listing_age_minutes=3.2,
        liquidity_score=78,
    )
    score = opportunity_score(example)
    print(f"score={score}")
    print(f"bucket={classify_bucket(score)}")
