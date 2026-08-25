# Codex 交接指南

这个仓库被设计成可以脱离原始对话单独打开。新的 Codex 任务不需要知道之前的聊天内容，也不需要依赖用户目录里的个人 Skill。

## 自动加载的上下文

从仓库内任意目录启动 Codex 时，根目录 `AGENTS.md` 会作为项目级持久指令被读取。它包含公开信息边界、URL 契约、隐私规则、设计要求、验证命令和发布约束。

仓库级 Skill 位于：

`.agents/skills/app-support-hub/`

它可以通过 `$app-support-hub` 显式调用，也可以在“新增 App、修改支持/隐私页面、准备发布、处理 Issue、检查部署”等任务中被 Codex 自动匹配。

## 新任务的最短恢复路径

1. 读取 `AGENTS.md`。
2. 读取 `README.md` 的结构和链接索引。
3. 根据任务打开一到两份相关文档，不要一次加载全部文件。
4. 如果是某个 App，读取 `docs/apps/<slug>.md`、对应 manifest，以及该 App 的所有语言页面。
5. 先检查工作区状态，保留用户已有修改。
6. 通过 `rocket site format`、`rocket site check` 和 `rocket site test` 完成格式化、静态校验、浏览器测试和视觉检查。
7. 只有用户明确要求时才 commit 或 push。

## 任务路由

| 任务            | 首先读取                                            |
| --------------- | --------------------------------------------------- |
| 新增 App        | `docs/ADD_AN_APP.md`、`docs/CONTENT_MODEL.md`       |
| 新增语言        | `docs/LOCALIZATION.md`                              |
| 修改隐私政策    | `docs/PRIVACY_CHANGE_CHECKLIST.md`、对应 App 上下文 |
| 修改 UI         | `docs/DESIGN_SYSTEM.md`、浏览器测试                 |
| 准备 App Store  | `docs/APP_STORE_CONNECT.md`、对应 App 上下文        |
| 发布或回滚      | `docs/DEPLOYMENT.md`、`docs/REPOSITORY_SETTINGS.md` |
| 处理用户 Issue  | `docs/SUPPORT_OPERATIONS.md`                        |
| 改结构或 schema | `ARCHITECTURE.md`、`docs/CONTENT_MODEL.md`          |

## 不能从仓库推断的事实

这个仓库不能单独证明 App 的真实数据行为、第三方 SDK、权限、网络请求或资源授权。遇到这些问题时，Codex 必须检查对应 App 的当前 release 代码和依赖；如果源码不在当前工作区，则明确标记为未验证并请求路径或证据。

同样，GitHub 仓库设置、Pages 状态、App Store Connect 状态和 Apple 当前规则都可能变化。涉及发布时应做实时确认，不要只依赖旧文档。

## 外部操作边界

创建公开仓库、发布 Pages、修改 GitHub 设置、提交 App Store、发 Issue、commit 和 push 都会改变外部状态。Codex 应在执行前确认用户当前确实要求了该动作，并在完成后报告实际 URL、工作流状态和任何剩余风险。

## 当前关键决策

- 一个共享 GitHub Pages 仓库服务多个 App。
- 公开 URL 使用账号根域名和每 App 子路径。
- 当前公开联系渠道仅为 GitHub Issues，不公开私人 App Review 邮箱。
- Issue-only 方案存在 Apple 审核风险，详见 `docs/APP_STORE_CONNECT.md` 和 `docs/DECISIONS.md`。
- 网站默认无分析、广告、追踪、第三方字体与客户端框架。
