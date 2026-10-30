# Marketplace Research Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Add sourced marketplace research and comparative profit to the existing SafeQora app.
**Architecture:** Static existing UI plus owner-private server bridge and server-only provider secrets.
**Tech Stack:** Browser JavaScript, Worker ESM, Node tests/jsdom.
**Spec:** ../specs/2026-10-30-marketplace-research.md

## Global Constraints
Preserve scanner, existing storage/origin and records. No fake live data; no keys in client code. No paid service activation. Unverified eligibility/fees/match prevents BUY.

## Review Focus
Stale popup results, missing/shipping prices, duplicate or unidentified sellers, quota failures, and zero/missing purchase data must not produce false confidence.

### Task 1: Private provider bridge
- [ ] Write/run failing tests for normalization, missing secrets, identity and invalid input.
- [ ] Implement product/offers adapters and private browser return bridge; source/time and unknown values explicit.
- [ ] Test invalid GTIN, provider timeout/quota, missing currency/shipping, duplicate sellers, mismatched identifiers, and exact-origin message flow.
- [ ] Publish private backend with no credentials; verify auth boundary and unavailable state.

### Task 2: Frontend research and profit comparison
- [ ] Write/run failing tests for popup validation, late results and comparative calculations.
- [ ] Add research.js and existing-page controls; integrate with scanner and existing calculator events.
- [ ] Populate only selected user-reviewed prices, leave verification flags unverified, never overwrite purchase data from server.
- [ ] Add distinct FBA/FBM/WFS/seller costs and calculate all four using core.js.
- [ ] Run complete tests, code review, branch/PR, publish and browser QA.

### Task 3: Activation handoff
- [ ] Document provider secret names and trial signup, exact activation requirements, fees and demand limitations.
- [ ] Report automated vs real tests and missing live credentials accurately.
