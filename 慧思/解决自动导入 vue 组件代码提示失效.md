# 解决自动导入 vue 组件代码提示失效

## 背景

在开发中，我很喜欢用一个 vite 插件 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)。顾名思义，该插件可以自动导入 `components` 文件夹下的 `vue` 组件，让我在开发中不用在顶部手动 `import` 组件。

按照文档中配置完成后，我发现在 VSCode 中通过此法导入的组件无法跳转至组件定义处，也查看不了组件的类型，即无法获取代码提示。通过几番的资料查找，我找到了解决方法。

## 根源

首先，该问题是由 `pnpm` 导致的。插件会在根目录下生成 `components.d.ts` 配置文件。该文件用于声明导入的组件，其顶部的模块声明 `declare module` 为 `@vue/runtime-core`。因为 `pnpm` 只能访问到项目的顶层依赖包，而 `@vue/runtime-core` 并非顶层依赖，是 `vue` 的嵌套依赖，所以组件声明失效了。

## 解决

有几个方法可以解决。

1. 在根目录下创建 `.npmrc` 文件，添加  `public-hoist-pattern[]=@vue/runtime-core`。[public-hoist-pattern](https://pnpm.io/npmrc) 用于将指定依赖包提升至顶层；
2. 在根目录下创建 `.npmrc` 文件，添加 `shamefully-hoist=true`。[shamefully-hoist](https://pnpm.io/npmrc) 会把所有嵌套依赖提升至顶层；
3. 将 `@vue/runtime-core` 添加至开发依赖，可以手动将其提升至顶层。此法需要保证 `@vue/runtime-core` 的版本与项目中的 `vue` 版本匹配；
4. 使用 `0.18.5` 版本的插件。该版本的配置文件的类型声明为 `vue` 而非 `@vue/runtime-core`；
5. 手动将配置文件中的模块声明由 `@vue/runtime-core` 改为 `vue`。但是每次配置文件重新生成后都需要重新修改。

使用方法 1 或方法 2 都需要重新安装一遍模块依赖并重启 VSCode。方法 1 是最优的解决方式，如果方法 1 不能奏效再尝试其他方法。

经过上述操作，组件的类型定义已经可以成功显示了。但是跳转定义时 IDE 会重定向至 `components.d.ts`。解决的方法很简单，只需要安装一个 VSCode 插件 [vscode-goto-alias](https://github.com/antfu/vscode-goto-alias) 即可。该插件会直接让 IDE 跳转至对应的组件。如果组件跳转还是失效，检查一下 Volar 的 [Takeover mode](https://vuejs.org/guide/typescript/overview.html#takeover-mode) 是否打开。