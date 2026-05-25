---
name: prd-change
description: PRD 变更 — 冻结后修改并 bump 版本。用户说 PRD change 时使用。
---

# PRD Change

## 目标

在 **frozen** 之后合法演进需求，保持可追溯。

## 输入

- `PRD change: <功能> — <变更摘要>`
- 已 frozen 的 prd + spec + 当前 brief

## 步骤

1. 确认变更类型：**澄清** / **补漏** / **范围变** / **规则变**
2. **bump 版本**（patch：1.0→1.1；范围大变：1.0→2.0）
3. 同时更新：L1 PRD、`spec/*.yaml` 的 `changelog`（禁止只改一处）
4. 将 spec `status` 临时改为 `draft` 直至改完，再改回 `frozen` 并重新 validate --freeze
5. **重新生成** `briefs/<id>-v<新版本>.md`；旧 brief 保留不删（历史追溯）
6. 若已实现代码，提醒用户：需 diff 新 brief 与旧版，评估返工

## 禁止

- 不升版本直接改 frozen 文件
- 静默删除验收项（须说明原因写入 changelog）

## 建议下一步

新 brief → codegen 或人工改代码
