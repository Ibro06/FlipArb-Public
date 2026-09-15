"""
Public Thompson Sampling demonstration for FlipArb.

This script shows Bayesian online learning for adaptive search allocation.
Each search strategy is treated as an arm in a multi armed bandit.

Important:
    Rewards in this file are synthetic. They are not production measurements.
"""

from __future__ import annotations

import random
from dataclasses import dataclass


@dataclass
class QueryArm:
    """One search strategy with a Beta posterior."""

    name: str
    alpha: float = 1.0
    beta: float = 1.0

    def sample(self) -> float:
        """Draw one sample from the current Beta posterior."""
        return random.betavariate(self.alpha, self.beta)

    def update(self, reward: float) -> None:
        """Update the posterior with a quality weighted reward in [0, 1]."""
        clipped = max(0.0, min(1.0, reward))
        self.alpha += clipped
        self.beta += 1.0 - clipped

    def decay(self, factor: float = 0.85) -> None:
        """Reduce the influence of older evidence."""
        self.alpha = max(1.0, self.alpha * factor)
        self.beta = max(1.0, self.beta * factor)

    @property
    def posterior_mean(self) -> float:
        """Expected success probability under the current posterior."""
        return self.alpha / (self.alpha + self.beta)


def choose_query(arms: list[QueryArm]) -> QueryArm:
    """Select the arm with the largest Thompson sample."""
    return max(arms, key=lambda arm: arm.sample())


def run_synthetic_demo(rounds: int = 250, seed: int = 7) -> list[QueryArm]:
    """
    Run a reproducible synthetic demonstration.

    The latent reward rates are invented for teaching purposes so recruiters
    can see how allocation can shift toward stronger strategies.
    """
    random.seed(seed)
    arms = [
        QueryArm("iphone 15 pro"),
        QueryArm("ipone 15 pro"),
        QueryArm("iphone 15 cracked"),
    ]

    # Synthetic latent success rates. Not measured production values.
    synthetic_reward_rates = {
        "iphone 15 pro": 0.18,
        "ipone 15 pro": 0.34,
        "iphone 15 cracked": 0.26,
    }

    for round_index in range(rounds):
        arm = choose_query(arms)
        reward = 1.0 if random.random() < synthetic_reward_rates[arm.name] else 0.0
        arm.update(reward)

        # Occasional decay mirrors the idea that old winners should not dominate forever.
        if (round_index + 1) % 50 == 0:
            for query_arm in arms:
                query_arm.decay(factor=0.92)

    return arms


def demo() -> None:
    """Print posterior means after the synthetic simulation."""
    arms = run_synthetic_demo()
    print("Synthetic Thompson Sampling demonstration")
    print("These results are not production measurements.")
    for arm in sorted(arms, key=lambda item: item.posterior_mean, reverse=True):
        print(
            f"{arm.name:24s} "
            f"posterior_mean={arm.posterior_mean:.3f} "
            f"alpha={arm.alpha:.2f} beta={arm.beta:.2f}"
        )


if __name__ == "__main__":
    demo()
