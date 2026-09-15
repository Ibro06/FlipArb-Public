"""Small Thompson Sampling demonstration for public portfolio use."""

from dataclasses import dataclass
import random


@dataclass
class QueryArm:
    name: str
    alpha: float = 1.0
    beta: float = 1.0

    def sample(self) -> float:
        return random.betavariate(self.alpha, self.beta)

    def update(self, reward: float) -> None:
        reward = max(0.0, min(1.0, reward))
        self.alpha += reward
        self.beta += 1.0 - reward

    def decay(self, factor: float = 0.85) -> None:
        self.alpha = max(1.0, self.alpha * factor)
        self.beta = max(1.0, self.beta * factor)


def choose_query(arms: list[QueryArm]) -> QueryArm:
    return max(arms, key=lambda arm: arm.sample())


def demo() -> None:
    random.seed(7)
    arms = [
        QueryArm("iphone 15 pro"),
        QueryArm("ipone 15 pro"),
        QueryArm("iphone 15 cracked"),
    ]

    synthetic_reward_rates = {
        "iphone 15 pro": 0.18,
        "ipone 15 pro": 0.34,
        "iphone 15 cracked": 0.26,
    }

    for _ in range(250):
        arm = choose_query(arms)
        reward = 1.0 if random.random() < synthetic_reward_rates[arm.name] else 0.0
        arm.update(reward)

    for arm in arms:
        mean = arm.alpha / (arm.alpha + arm.beta)
        print(f"{arm.name:24s} posterior mean={mean:.3f}")


if __name__ == "__main__":
    demo()
