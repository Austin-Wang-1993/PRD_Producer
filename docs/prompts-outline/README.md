# 智能体提示词规划（下一步）

每智能体目录建议：

```text
prompts/
  brd/v1/
    system.md
    user.template.md
    output.contract.md      # 对齐 BRD.md 章节，§5 硬性指标
    repair.md               # 质检打回后修订
    qa-escalation.md        # 无法答质检时如何向用户提问
  pages/v1/
    ...
  stories/v1/
    ...
  qa/v1/
    system.md
    checklists/
      brd.md
      pages.md
      stories.md
  observer/v1/
    system.md
  github-init/v1/            # 建库字段生成
    system.md
```

## 质检检查要点（摘要）

- **BRD**：§5 主路径≥5步、每步有页面/触点、≥2分支或说明无分支、5.4索引非空。
- **功能清单**：页面ID与BRD 5.4一致；每功能映射步骤；无孤儿。
- **用户故事**：每条有页面+功能ID+步骤；无未定义页面。

## 编写智能体共通

- 读取 `products/{id}/docs/` 最新文件，不依赖其它智能体内存。
- 质检中无法推断时：输出 `qa_escalation_to_user`，暂停对质检作答。
