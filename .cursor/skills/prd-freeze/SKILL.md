---
name: prd-freeze
description: PRD 冻结 — validate、升版、写 brief。用户说 PRD freeze 时使用。
---

# PRD Freeze

## 目标

生成可开发的**版本快照**与 **Implementation Brief**。

## 前置

- 已完成 `PRD review` 且无阻塞项
- spec 与 L1 PRD 已对齐

## 步骤

1. 确认功能 ID、当前 `version`（首个冻结建议 `1.0`；后续 change bump 如 `1.1`）
2. 关闭或标记所有 `open_questions` 为 `[resolved] ...`
3. 更新 `spec/<id>.yaml`：`status: frozen`，更新 `changelog` 本条
4. 同步 L1 PRD 头部：`状态：frozen`、`版本：x.y`
5. 运行严格校验：
   ```bash
   npm run prd:validate -- products/<slug>/spec/<id>.yaml --freeze
   ```
   失败则修复后重跑，**不得**在失败时生成 brief
6. 从 `templates/brief.md` 生成 `briefs/<id>-v<version>.md`（精炼，建议 < 200 行）
7. 更新 `meta.yaml` 中该功能的 `status`、`version`
8. 更新 `00-overview.md` 功能索引表

## Brief 内容要求

- 必含：In/Non-goals、实体摘要、核心流程、规则、**完整验收清单**、约束
- 不含：长篇背景故事、与本期无关的其他功能

## 输出回复

- 版本号、brief 路径
- Codegen 指令示例：`按 @products/<slug>/briefs/<id>-vX.Y.md 实现…`

## 禁止

- validate 未通过仍标记 frozen
- brief 比 spec 多出未记录的需求
