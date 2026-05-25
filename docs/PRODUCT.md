# PRD Producer — 产品定义摘要

> 三份完整交付物见：`products/prd-producer/docs/`

## 定稿规则

| 规则 | 说明 |
|------|------|
| GitHub 建库 | **仅当 BRD 首次用户确认通过后**，出现「授权创建 GitHub」 |
| 智能体 | BRD / 功能清单 / 用户故事 **解耦**，由用户切换触发 |
| 单文档工序 | 澄清 → 编写 → **质检** →（可协助质检）→ **用户确认** → 定稿 |
| BRD §5 | 必须含 **详细用户主流程**，支撑页面与功能枚举 |

## 文档索引

| 文档 | 路径 |
|------|------|
| BRD | [BRD.md](../products/prd-producer/docs/BRD.md) |
| 页面&功能清单 | [页面功能清单.md](../products/prd-producer/docs/页面功能清单.md) |
| 用户故事清单 | [用户故事清单.md](../products/prd-producer/docs/用户故事清单.md) |

## 下一步

- [ ] 定义各智能体提示词四件套：`prompts/{brd,pages,stories,qa,observer}/v1/`
- [ ] 实现 MVP 前端与编排 API
