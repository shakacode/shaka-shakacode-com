---
title: Case studies
description: Audits, failures, and improvements from running AI coding agents in real repositories.
---

# Case studies

The useful question is not whether coding agents ever make mistakes. It is which mistakes
escape, which checks catch them, and whether the delivery process improves after each miss.

## [The AI reviewer found it. We merged anyway.](/case-studies/30-ai-assisted-commits)

An adversarial audit of 30 commits in Shakapacker found real defects, weak tests, incomplete
provenance, and a larger problem hiding in plain sight: generated process noise made the
engineering signal harder to see. It explains the remediation and the two-control model that
shaped Shaka: improve what gets generated, then fail closed when integration evidence is
incomplete.
