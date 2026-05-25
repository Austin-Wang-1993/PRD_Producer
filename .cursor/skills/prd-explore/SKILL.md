---
name: prd-explore
description: PRD 探索模式 — 澄清问题与假设，不写验收与 spec。用户说 PRD explore 或讨论新产品/新方向时使用。
---

# PRD Explore

## 目标

澄清「值不值得做、问题是什么」，产出假设与 L0 草稿，**不**进入实现级细节。

## 输入

- 用户想法、痛点描述
- 可选：`@products/<slug>/prd/00-overview.md`

## 步骤

1. 用 3～5 个问题追问：用户是谁、现有替代方案、成功指标、最大风险假设
2. 只更新 **L0**：`prd/00-overview.md` 中的愿景、用户场景、术语表、**待验证假设**
3. 若涉及新功能，在「功能索引」加一行，状态 `draft`，**不**创建完整 L1 除非用户明确要求
4. 不写 `acceptance`、不填 `spec/*.yaml` 必填字段

## 输出

- 更新后的 `00-overview.md`
- 回复：**假设列表** + 建议下一步（通常 `PRD scope` 或 `PRD define`）

## 禁止

- 标记 frozen、生成 brief
- 编造接口字段或数据库表
