# 智能体提示词 — 已完成 v1

提示词已写入 `prompts/`，可直接被编排器加载。

## 状态

| 组件 | 状态 |
|------|------|
| 质检 checklist ×3 | ✅ |
| 质检 system | ✅ |
| BRD 四件套 + escalation | ✅ |
| 功能清单 四件套 | ✅ |
| 用户故事 四件套 | ✅ |
| 观察 system | ✅ |
| GitHub 建库 system | ✅ |
| 编写类共通 `_shared/writer-common.md` | ✅ |

## 下一步（实现）

1. 编排器：按 `prompts/README.md` 组装 LLM 请求
2. 事件写入 `logs/events.jsonl`
3. 前端对接阶段状态机
