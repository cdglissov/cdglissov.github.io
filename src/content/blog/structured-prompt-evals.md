---
title: Just a placeholder for now 3...
description: How to build lightweight evaluation datasets that survive rapid product iteration.
pubDate: 2025-12-22
tags:
  - evaluation
  - llm
  - production
featured: false
---

A useful evaluation set is small, stable, and representative. It does not need to be huge to be valuable.

## Dataset shape

1. Add canonical user tasks.
2. Include common failure modes.
3. Store expected outputs or scoring rubrics.
4. Version the dataset with your prompts.

## Scoring strategy

Use a weighted score so critical tasks dominate decisions:

$$
S = \sum_{i=1}^{n} w_i s_i, \quad \sum_i w_i = 1
$$

## Quick check loop

```ts
const threshold = 0.82;

export function canShip(overallScore: number, criticalScore: number) {
  if (criticalScore < 0.9) return false;
  return overallScore >= threshold;
}
```

This guards the cases that matter most for users, instead of averaging them away.
