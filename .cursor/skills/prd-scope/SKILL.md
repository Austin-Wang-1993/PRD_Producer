---
name: prd-scope
description: PRD 划界模式 — 定 In/Out 与优先级。用户说 PRD scope 时使用。
---

# PRD Scope

## 目标

为**单个 L1 功能**划定范围，强化 **Out of scope**，防止范围蔓延。

## 输入

- `PRD scope: <功能名>`
- `@products/<slug>/prd/<章节>.md`
- 可选：对应 `spec/<id>.yaml`

## 步骤

1. 确认功能 ID 与文件路径
2. 在 L1 PRD 中写清：**In scope**、**Out of scope**、**本期 vs 下期**（若有）
3. 同步更新 spec 的 `scope.in`、`scope.out`、`non_goals`（数组非空）
4. 若范围砍掉已有描述，删除或标注「已移除」避免矛盾
5. 更新 `meta.yaml` 中该功能的备注（可选）

## 完成标准

- 至少 1 条 in、**至少 2 条** out（逼自己写非目标）
- 用户口头确认「本期边界 OK」或继续追问

## 建议下一步

`PRD define` → `PRD spec` → `PRD review`
