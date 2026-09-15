# Learning System

## Why learning was useful

The scanner can generate many possible search queries. Some queries consistently find useful opportunities and some consume API budget without producing strong results.

FlipArb uses a Bayesian multi armed bandit method so query selection can adapt from observed outcomes.

## Thompson Sampling

Each query maintains a Beta distribution with two parameters.

```text
Beta(alpha, beta)
```

Alpha represents accumulated success evidence. Beta represents accumulated failure evidence.

At selection time, the system samples from each eligible query distribution. Queries with stronger observed performance tend to produce larger samples and receive more scanning budget.

## Quality weighted rewards

The learning signal is based on opportunity quality rather than raw listing volume.

A query that produces an alert ready opportunity receives more credit than a query that produces a weak review candidate. Rejected listings receive very little credit.

This matters because the goal is not to maximize listings found. The goal is to maximize useful opportunities per unit of API budget.

## Update concept

```text
alpha = alpha + reward
beta = beta + 1 minus reward
```

Rewards are bounded between zero and one.

## Daily decay

Historical performance is decayed over time. This prevents a query that worked well in the past from dominating forever when marketplace behavior changes.

## Time learning

FlipArb also records which hours and weekdays produce opportunities for each query. Once enough cycles have been observed, the system can identify useful time windows.

## Auction feedback

When tracked auctions end, the outcome can feed back into query performance. This gives the learning system another observed result rather than relying only on intermediate scanner classifications.

## What this is

This is an online learning and adaptive resource allocation system. Thompson Sampling is a Bayesian decision method commonly used for multi armed bandit problems. It can also be described as Bayesian online learning or adaptive search optimization.

## What this is not

The public project does not claim that FlipArb trained a neural network or a large supervised prediction model. OpenAI models were used separately for listing understanding and image or text analysis.

## Public demonstration

See [`../src/thompson_sampling_demo.py`](../src/thompson_sampling_demo.py) for a small reproducible example using synthetic query outcomes. The portfolio website also includes a clearly labeled synthetic chart of the same idea.
