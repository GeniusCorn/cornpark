import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Corn Park',
  description: '玉之米的自留地',

  cleanUrls: true,
  // lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },

    nav: nav(),

    sidebar: {
      '/精读': sidebarJingdu(),
      '/慧思': sidebarHuisi(),
      '/菩提': sidebarPuti(),
      '/修行': sidebarXiuxing(),
      '/悟道': sidebarWudao(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/GeniusCorn/cornpark' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present Corn Huang',
    },
  },
})

function nav() {
  return [
    { text: '精读', link: '/精读/index' },

    { text: '慧思', link: '/慧思/index' },

    {
      text: '菩提',
      // link: '/菩提/index',
      items: [
        {
          text: 'CSS',
          link: '/菩提/CSS/index',
        },
        {
          text: 'JavaScript',
          link: '/菩提/JavaScript/index',
        },
        {
          text: 'Vue',
          link: '/菩提/Vue/index',
        },
        {
          text: '综合',
          link: '/菩提/综合/index',
        },
      ],
    },

    {
      text: '修行',
      // link: '/修行/index',
      items: [
        {
          text: '前端部署',
          link: '/修行/前端部署/1. 手写最简静态资源服务器',
        },
        {
          text: 'Nest 通关',
          link: '/修行/Nest 通关/2. 5 种 HTTP 数据传输方式',
        },
        {
          text: 'Nuxt 3 全栈开发',
          link: '/修行/Nuxt 3 全栈开发/2. 渲染模式的解析和选择',
        },
      ],
    },

    {
      text: '悟道',
      // link: '/悟道/index',
      items: [
        {
          text: '匠艺整洁之道',
          link: '/悟道/匠艺整洁之道/1. 匠艺',
        },
        {
          text: 'Vue.js 设计与实现',
          link: '/悟道/Vue.js 设计与实现/1. 框架设计概览',
        },
      ],
    },
  ]
}

function sidebarJingdu() {
  return [
    {
      text: '在 Vue 中使用 Composition API 解构 Props',
      link: '/精读/在 Vue 中使用 Composition API 解构 Props',
    },
  ]
}

function sidebarHuisi() {
  return [
    {
      text: '安装 fish shell 和 tmux',
      link: '/慧思/安装 fish shell 和 tmux',
    },
    {
      text: '解决自动导入 vue 组件代码提示失效',
      link: '/慧思/解决自动导入 vue 组件代码提示失效',
    },
  ]
}

function sidebarPuti() {
  return [
    {
      text: 'CSS',
      collapsed: true,
      items: [
        {
          text: '伪类和伪元素',
          link: '/菩提/CSS/伪类和伪元素',
        },
        {
          text: '实现布局',
          link: '/菩提/CSS/实现布局',
        },
        {
          text: '水平垂直居中常见方法',
          link: '/菩提/CSS/水平垂直居中常见方法',
        },
        {
          text: '用 CSS 实现三角符号',
          link: '/菩提/CSS/用 CSS 实现三角符号',
        },
        {
          text: '组合选择符',
          link: '/菩提/CSS/组合选择符',
        },
        {
          text: '选择器的优先级',
          link: '/菩提/CSS/选择器的优先级',
        },
      ],
    },

    {
      text: 'JavaScript',
      collapsed: true,
      items: [
        {
          text: '数组去重',
          link: '/菩提/JavaScript/数组去重',
        },
        {
          text: '模块化',
          link: '/菩提/JavaScript/模块化',
        },
        {
          text: '浅拷贝和深拷贝',
          link: '/菩提/JavaScript/浅拷贝和深拷贝',
        },
        {
          text: '箭头函数',
          link: '/菩提/JavaScript/箭头函数',
        },
        {
          text: '类和类继承',
          link: '/菩提/JavaScript/类和类继承',
        },
        {
          text: '闭包',
          link: '/菩提/JavaScript/闭包',
        },
        {
          text: '防抖与节流',
          link: '/菩提/JavaScript/防抖与节流',
        },
      ],
    },

    {
      text: 'Vue',
      collapsed: true,

      items: [
        {
          text: 'KeepAlive',
          link: '/菩提/Vue/KeepAlive',
        },
        {
          text: '条件渲染',
          link: '/菩提/Vue/条件渲染',
        },
        {
          text: '生命周期钩子',
          link: '/菩提/Vue/生命周期钩子',
        },
        {
          text: '计算属性与方法、watch 的异同',
          link: '/菩提/Vue/计算属性与方法、watch 的异同',
        },
      ],
    },
  ]
}

function sidebarXiuxing() {
  return [
    {
      text: '前端部署',
      collapsed: true,
      items: [
        {
          text: '1. 手写最简静态资源服务器',
          link: '/修行/前端部署/1. 手写最简静态资源服务器',
        },
        {
          text: '2. 基于 Docker 部署极简服务',
          link: '/修行/前端部署/2. 基于 Docker 部署极简服务',
        },
        {
          text: '3. 使用 nginx 镜像构建容器',
          link: '/修行/前端部署/3. 使用 nginx 镜像构建容器',
        },
        {
          text: '4. Docker 缓存优化技术及多阶段构建',
          link: '/修行/前端部署/4. Docker 缓存优化技术及多阶段构建',
        },
        {
          text: '5. 单页应用的路由与持久缓存优化',
          link: '/修行/前端部署/5. 单页应用的路由与持久缓存优化',
        },
        {
          text: '6. 服务网关 Traefik 搭建',
          link: '/修行/前端部署/6. 服务网关 Traefik 搭建',
        },
        {
          text: '7. CICD',
          link: '/修行/前端部署/7. CICD',
        },
      ],
    },

    {
      text: 'Nest 通关',
      collapsed: true,
      items: [
        {
          text: '2. 5 种 HTTP 数据传输的方式',
          link: '/修行/Nest 通关/2. 5 种 HTTP 数据传输方式',
        },
        {
          text: '3. IOC 机制',
          link: '/修行/Nest 通关/3. IOC 机制',
        },
        {
          text: '5. 全局模块和生命周期',
          link: '/修行/Nest 通关/5. 全局模块和生命周期',
        },
        {
          text: '6. AOP 架构',
          link: '/修行/Nest 通关/6. AOP 架构',
        },
        {
          text: '7. 装饰器',
          link: '/修行/Nest 通关/7. 装饰器',
        },
      ],
    },

    {
      text: 'Nuxt 3 全栈开发',
      collapsed: true,

      items: [
        {
          text: '2. 渲染模式的解析和选择',
          link: '/修行/Nuxt 3 全栈开发/2. 渲染模式的解析和选择',
        },
        {
          text: '3. 创建首个 Nuxt3 应用',
          link: '/修行/Nuxt 3 全栈开发/3. 创建首个 Nuxt3 应用',
        },
        {
          text: '4. Nuxt3 的路由和布局',
          link: '/修行/Nuxt 3 全栈开发/4. Nuxt3 的路由和布局',
        },
      ],
    },
  ]
}

function sidebarWudao() {
  return [
    {
      text: '匠艺整洁之道',
      collapsed: true,

      items: [
        {
          text: '1. 匠艺',
          link: '/悟道/匠艺整洁之道/1. 匠艺',
        },
        {
          text: '2. 测试驱动开发',
          link: '/悟道/匠艺整洁之道/2. 测试驱动开发',
        },
        {
          text: '3. 高级测试驱动开发',
          link: '/悟道/匠艺整洁之道/3. 高级测试驱动开发',
        },
        {
          text: '4. 设计',
          link: '/悟道/匠艺整洁之道/4. 设计',
        },
        {
          text: '5. 重构',
          link: '/悟道/匠艺整洁之道/5. 重构',
        },
        {
          text: '6. 简单设计',
          link: '/悟道/匠艺整洁之道/6. 简单设计',
        },
        {
          text: '7. 协同编程',
          link: '/悟道/匠艺整洁之道/7. 协同编程',
        },
        {
          text: '8. 验收测试',
          link: '/悟道/匠艺整洁之道/8. 验收测试',
        },
        {
          text: '9. 生产力',
          link: '/悟道/匠艺整洁之道/9. 生产力',
        },
        {
          text: '10. 质量',
          link: '/悟道/匠艺整洁之道/10. 质量',
        },
        {
          text: '11. 勇气',
          link: '/悟道/匠艺整洁之道/11. 勇气',
        },
        {
          text: '12. 伤害',
          link: '/悟道/匠艺整洁之道/12. 伤害',
        },
        {
          text: '13. 集成',
          link: '/悟道/匠艺整洁之道/13. 集成',
        },
        {
          text: '14. 团队合作',
          link: '/悟道/匠艺整洁之道/14. 团队合作',
        },
      ],
    },

    {
      text: 'Vue.js 设计与实现',
      collapsed: true,
      items: [
        {
          text: '1. 框架设计概览',
          link: '/悟道/Vue.js 设计与实现/1. 框架设计概览',
        },
      ],
    },
  ]
}
