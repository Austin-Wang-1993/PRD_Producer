---
name: prd-spec
description: PRD 规格化 — 从叙述提炼到 spec yaml。用户说 PRD spec 时使用。
---

# PRD Spec

## 目标

让人读 PRD 与 **机读 spec** 一致；spec 是 codegen 的契约来源。

## 输入

- `PRD spec: <功能>`
- `@products/<slug>/prd/<章节>.md`
- `@products/<slug>/spec/<id>.yaml`

## 步骤

1. 阅读 L1 PRD，更新 `spec/<id>.yaml`（对照 `templates/l1-feature-spec.yaml`）
2. 必填：`flows.main`、`entities`、`rules`、`acceptance`（含 given/when/then）、`scope`、`non_goals`
3. 有 API 时填 `apis`；无则保持 `[]` 并在回复中说明
4. `open_questions` 只列**未决**项；已决的从列表移除或标 `[resolved]`
5. 运行：`npm run prd:validate -- products/<slug>/spec/<id>.yaml`（无 `--freeze`）
6. 修复所有校验错误后再结束

## 一致性

- spec 与 md 冲突时：**列出冲突**并请用户裁决，不要悄悄以一方为准
- `version` 在 draft 阶段可用 `0.x`；freeze 时由 freeze 流程定为 `1.0` 或 bump

## 建议下一步

`PRD review` → `PRD freeze`
