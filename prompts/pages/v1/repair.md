# 功能清单 — 质检修订 Prompt

输入：当前 `docs/页面功能清单.md`、质检 blocking 清单、最新 `docs/BRD.md`。

逐条修复 blocking，更新 §6 变更记录，输出对质检的逐 id 回复表。

若 blocking 为 PG-F08/09/10/11 类 **BRD 不一致**：

- 能在清单侧修则修；
- 若必须改 BRD §5，**不得**擅自改 BRD 文件；回复质检并建议用户找 BRD 智能体，或走 qa-escalation 请用户决定。
