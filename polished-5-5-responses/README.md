# Polished 5/5 Responses

收集"AI 在不太违背我表达习惯的前提下，把我的原始回答打磨到接近满分"的定稿，用于**考前复习**和**考后整理为教学材料**。

**注意**：这里的内容不是凭空写的范文，而是"我的原始回答 → 诊断问题 → 打磨定稿"的产物，保留个人用词和思路，只消除拉低分数的硬伤（搭配错误、语法断裂、介词/连词误用等）。`listen-and-repeat/` 例外，见下文。

## 目录结构

```
polished-5-5-responses/
├── README.md                  ← 本文件：流程说明 + 总索引
├── incoming/                  ← 临时暂存区，只放"待处理"的题目+原始回答
│   └── _template.md
├── write-an-email/            ← 正式内容：Write an Email 定稿
├── academic-discussion/       ← 正式内容：Academic Discussion 定稿
├── listen-and-repeat/         ← 正式内容：Listen and Repeat 句子整理
└── interview/                 ← 正式内容：Interview 定稿
```

## 工作流程

1. **暂存**：在 `incoming/` 里新建一个文件（复制 `incoming/_template.md`），粘贴题目原文和自己的原始回答，格式不用讲究。
2. **打磨**：让 AI 对照 `references/reference-ets-task-specs.md`（评分标准）和对应的 `references/reference-magoosh-*.md`（该任务类型的写作思路）诊断问题、给出打磨版本，同时说明改了什么、为什么改。
3. **归档**：打磨定稿后，按下方模板整理成正式文件，存进对应分类文件夹，文件名格式为 `NNN-主题slug.md`（三位数字编号，按完成时间递增，不按难度重排）。
4. **清空暂存**：正式归档后，删除或清空 `incoming/` 里对应的临时文件，让它始终保持"零常驻内容"。
5. **登记索引**：在下方总索引表中追加一行。

## 正式内容文件模板（write-an-email / academic-discussion / interview）

```markdown
# <题目简述>

## Prompt（原题）
...

## My Draft（我的原始回答）
...

## Polished Response（打磨定稿 —— 考前复习/教学用）
...

## What Changed & Why（诊断要点）
- 用词/搭配问题：...
- 语法结构问题：...
- 对照 references/reference-ets-task-specs.md 的评分维度说明为什么这样改

## Reusable Patterns（可迁移句式，教学时可直接引用）
- ...
```

每个分类文件夹内也放了一份 `_template.md`，可直接复制使用。

## Listen and Repeat 的特殊格式

这个任务是跟读句子练习，不走"原始回答 → 打磨"流程，按批次整理：

```markdown
# <句子批次简述>

## Sentences（句子原文）
1. ...
2. ...

## Difficulty Notes（跟读难点标注）
- 连读 / 重音 / 语调问题...

## Self-Assessment（自我评估）
- 哪几句已能流畅复现，哪几句仍需练习
```

## 总索引

| # | 任务类型 | 主题 / 文件 | 完成日期 | 备注 |
|---|---|---|---|---|
| — | — | — | — | 尚未收录任何范例，归档后请更新本表 |

## 与 references/ 的关系

`references/` 是只读的外部权威规则库（ETS 评分标准 + Magoosh 写作模板），打磨时始终以它为依据。`polished-5-5-responses/` 是你自己的产出成果库，两者不要混放：改规则文件时不要顺手往里塞个人范例，归档个人范例时也不要修改 references 里的内容。
