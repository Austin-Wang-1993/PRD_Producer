# PRD_Producer

前端产品研究流水线：三份交付物（BRD → 页面&功能清单 → 用户故事清单），多智能体解耦、质检 + 用户确认、BRD 确认后创建 GitHub 仓库。

**本产品自身的需求文档（自举）：**

- [BRD](products/prd-producer/docs/BRD.md)
- [页面&功能清单](products/prd-producer/docs/页面功能清单.md)
- [用户故事清单](products/prd-producer/docs/用户故事清单.md)
- [产品摘要](docs/PRODUCT.md)

**下一步：** [智能体提示词规划](docs/prompts-outline/README.md)

---

## 历史说明（Cursor 脚手架）

早期版本通过 **Cursor 对话 + 仓库结构化文件** 维护产品 PRD，见 `.cursor/rules` 与 `products/_example`。当前产品方向以 `products/prd-producer/docs/` 为准。

**单一真相不在聊天里**，而在 `products/<产品>/` 下的 md / yaml / briefs。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 创建你的产品

```bash
cp -r products/_example products/my-app
# 编辑 products/my-app/meta.yaml、prd/00-overview.md
```

### 3. 在 Cursor 里用意图前缀驱动流程

| 命令前缀 | 作用 |
|----------|------|
| `PRD explore: …` | 探索问题与假设（L0） |
| `PRD scope: 登录` | 划 In/Out |
| `PRD define: 登录` + `@prd/10-auth.md` | 写人读 PRD |
| `PRD spec: 登录` | 同步 `spec/auth.yaml` |
| `PRD review: 登录` | 审查（freeze 前必做） |
| `PRD freeze: 登录` | 冻结并生成 brief |
| `PRD change: 登录 — …` | 冻结后变更并 bump 版本 |
| 实现时 | `@briefs/auth-v1.0.md` + codegen skill |

示例消息：

```text
PRD define: 登录

补充：手机号验证码注册，本期不做微信。
@products/my-app/prd/10-auth.md
```

### 4. 校验 spec

```bash
# 草稿校验
npm run prd:validate -- products/my-app/spec/auth.yaml

# 冻结前严格校验
npm run prd:validate -- products/my-app/spec/auth.yaml --freeze
```

## 目录结构

```text
products/<slug>/
  meta.yaml           # 产品元数据与功能索引
  prd/
    00-overview.md    # L0 产品级
    10-auth.md        # L1 功能（一章一功能）
  spec/
    auth.yaml         # 机读规格（validate / codegen）
  briefs/
    auth-v1.0.md      # 冻结后生成的短简报

.cursor/
  rules/prd.mdc       # 协作护栏
  skills/prd-*/       # 分模式 SOP

templates/            # 复制用模板
scripts/prd-validate.mjs
```

## 标准流程（单个 L1 功能）

```text
scope → define (可多轮) → spec → review → freeze → codegen
                ↑_______________|          |
                                    change (冻结后)
```

- **Review** 在 freeze 前至少一次（可先只出清单再改）。
- **Define** 与 **Spec** 可分两次消息，避免叙述与字段混在一起。
- **Codegen** 只读 `briefs/`，需求变了走 `PRD change`。

## 版本与冻结

| 状态 | 含义 |
|------|------|
| `draft` | 可随时改，用于探索与编写 |
| `frozen` | 已共识快照；修改必须 `PRD change` 并 bump `version` |

Codegen 请显式指定版本，例如：`@briefs/auth-v1.1.md`。

## 示例产品

`products/_example` 含登录功能骨架，可直接校验：

```bash
npm run prd:validate -- products/_example/spec/auth.yaml
```

## 设计说明

- 一个产品一份 PRD 目录，**L0 概览 + 多个 L1 章节文件**。
- 人读叙述在 `prd/*.md`，契约在 `spec/*.yaml`，避免 AI _codegen 时噪声过大。
- 不靠超长系统提示词；靠 **rules + skills + 模板 + validate**。
