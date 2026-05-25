---
name: prd-define
description: PRD 定义模式 — 写人读 PRD（流程、规则、验收草案）。用户说 PRD define 时使用。
---

# PRD Define

## 目标

把行为与验收写进 **L1 人读 PRD**，仍保持 `status: draft`。

## 输入

- `PRD define: <功能>`
- `@products/<slug>/prd/<章节>.md`

## 步骤

1. **只改一个 L1 章节**；对照 `templates/l1-feature-prd.md` 补全缺口
2. 必须包含：**主流程**、**分支/异常表**、**业务规则**、**验收标准（AC-x）**、**非目标**、**至少 1 个正常 + 1 个异常示例**
3. 对模糊点主动追问（权限、错误提示、并发、数据保留），不要擅自定死
4. **本模式不强制改 spec**；若用户同轮要求 spec，先完成 md 再切换 `PRD spec` 意图
5. 验收项写可测试表述（Given-When-Then 或 checklist）

## 完成标准

- PRD 章节无空壳标题
- 每条 AC 可被测试或演示验证

## 禁止

- 将 status 设为 frozen
- 一次修改多个 L1 功能

## 建议下一步

`PRD spec` 同步 yaml → `PRD review`
