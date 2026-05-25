# 智能体提示词 v1

编排器按阶段加载：`system.md` + `_shared/writer-common.md`（编写类）+ 场景附加（`repair.md` / `qa-escalation.md`）。

## 目录

| 智能体 | 提示词 | 固定文档 |
|--------|--------|----------|
| **项目初始化** | `project-init/v1/full-standalone.md` | 创建 `docs/BRD.md` 等骨架 |
| BRD | `brd/v1/full-standalone.md` | `docs/BRD.md` |
| 功能清单 | `pages/v1/full-standalone.md` | `docs/页面功能清单.md` |
| 用户故事 | `stories/v1/full-standalone.md` | `docs/用户故事清单.md` |
| 综合检查 | `qa/v1/full-standalone.md` | 对照三份 docs |

## 质检清单

- `qa/v1/checklists/brd.md`
- `qa/v1/checklists/pages.md`
- `qa/v1/checklists/stories.md`

## 单文档工序

```text
clarifying → writing → qa (↔ repair / escalation) → user_review → confirmed
```

## 组装示例（伪代码）

```text
# BRD 澄清
load("brd/v1/system.md") + load("_shared/writer-common.md")

# BRD 质检修订
load("brd/v1/system.md") + load("brd/v1/repair.md")

# 质检
load("qa/v1/system.md") + load("qa/v1/checklists/{artifact}.md")

# 建库
load("github-init/v1/system.md")
```

## 版本

- v1：对齐 `products/prd-producer/docs/` 三份自举文档。
- 迭代时复制 `v1` → `v1.1`，勿直接改坏生产版本。
