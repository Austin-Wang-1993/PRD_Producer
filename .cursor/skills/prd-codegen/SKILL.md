---
name: prd-codegen
description: 按 frozen brief 实现代码，不回写改 PRD。用户要求实现某功能且已有 brief 时使用。
---

# PRD Codegen

## 目标

用稳定 brief 提高一次通过率；需求歧义应回到 PRD 流程，而非在代码里猜。

## 输入

- `@products/<slug>/briefs/<id>-vX.Y.md`
- 可选：同版本 `spec/<id>.yaml` 作细节对照

## 步骤

1. **只读** brief + spec；**不修改** prd/spec（除非用户明确 `PRD change`）
2. 实现前用列表复述：In scope、Non-goals、AC 清单
3. 实现后按 AC 逐条说明如何满足（或哪条需要测试补充）
4. 若发现 brief 矛盾或缺口：停止扩需求，建议 `PRD change` 或 `PRD review`

## 禁止

- 添加 brief/spec 未写的 API 或业务规则
- 用「合理推测」填 open_questions

## 与仓库代码

- 业务代码放在本产品对应的代码仓（若 monorepo 则按项目约定目录）
- 本仓库 `PRD_Producer`  primarily 存需求产物
