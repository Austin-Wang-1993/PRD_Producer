# PRD Producer — 产品定义摘要

> 三份完整交付物见：`products/prd-producer/docs/`

## 定稿规则

| 规则 | 说明 |
|------|------|
| **统一宽表** | 列顺序：场景ID → 页面ID → 功能ID → 用户故事ID → …（见需求矩阵说明） |
| 分阶段填列 | BRD / 功能 / 故事 三会话，**同一文件** |
| GitHub 建库 | **仅当 BRD 首次用户确认通过后**，出现「授权创建 GitHub」 |
| 智能体 | 由用户切换会话；**不写「本期不做」** |

## 文档索引

| 文档 | 路径 |
|------|------|
| 矩阵结构说明 | [需求矩阵说明.md](./需求矩阵说明.md) |
| 空表模板 | [需求矩阵-空表.md](../templates/需求矩阵-空表.md) |
| 示例（旧三文档，参考用） | `products/prd-producer/docs/` |
| 提示词 | `prompts/{brd,pages,stories,qa}/v1/full-standalone.md` |

## 下一步

- [ ] 定义各智能体提示词四件套：`prompts/{brd,pages,stories,qa,observer}/v1/`
- [ ] 实现 MVP 前端与编排 API
