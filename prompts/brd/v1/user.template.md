# BRD 澄清 — 用户输入模板（编排器可预填）

以下信息用户可在新建项目或开始 BRD 时填写，作为首条上下文：

```text
【项目】{{project_title}}
【一句话】{{one_liner}}
【为谁做】{{target_users}}
【解决什么问题】{{problem}}
【本期最想验证】{{hypothesis}}
【已知不做】{{known_out_of_scope}}
【补充】{{free_text}}
```

若用户未填，由你在澄清阶段通过提问补全。

## 用户中途切换回来（修订 BRD）

```text
【修订 BRD】
原因：{{reason}}
涉及章节：{{sections}}
意见：{{feedback}}
```

收到后：更新笔记 → 判断仅改文档或需再澄清 → 若已定稿则版本 bump 并提示下游文档可能过期。
