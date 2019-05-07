import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}

import { ROUTER_MODE } from "../config/app";

import Home from "../views/home/index.vue";

// 权限管理
import authRule from "../views/auth/Rule.vue";
import authAdmin from "../views/auth/Admin.vue";
import authRole from "../views/auth/Role.vue";

// Vue.use(VueRouter);

const err401 = r =>
    require.ensure([], () => r(require("../views/error/err401.vue")), "home");
const err404 = r =>
    require.ensure([], () => r(require("../views/error/err404.vue")), "home");
const login = r =>
    require.ensure([], () => r(require("../views/login/index.vue")), "home");
const main = r =>
    require.ensure([], () => r(require("../views/home/main.vue")), "home");

// 注意 权限字段 authRule （严格区分大小写）
export const constantRouterMap = [
    {
        path: "*",
        component: err404,
        hidden: true
    },
    {
        path: "/401",
        component: err401,
        name: "401",
        hidden: true
    },
    {
        path: "/404",
        component: err404,
        name: "404",
        hidden: true
    },
    {
        path: "/500",
        component: err404,
        name: "500",
        hidden: true
    },
    {
        path: "/login",
        component: login,
        name: "登录",
        hidden: true
    },
    {
        path: "/",
        component: Home,
        redirect: "/readme",
        name: "首页",
        hidden: true
    },
    {
        path: "/readme",
        component: Home,
        redirect: "/readme/main",
        icon: "shouye",
        name: "控制台",
        noDropdown: true,
        children: [
            {
                path: "main",
                component: main
            }
        ]
    }
];

// 实例化vue的时候只挂载constantRouterMap
export default new VueRouter({
    // mode: 'history', //后端支持可开
    mode: ROUTER_MODE,
    routes: constantRouterMap,
    strict: process.env.NODE_ENV !== "production"
});

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
    {
        path: "/auth",
        // redirect: "/auth/rule/index",
        component: Home,
        icon: "guanliyuan1",
        name: "权限管理",
        meta: {
            authRule: ["auth"]
        },
        children: [
            {
                path: "rule",
                component: authRule,
                icon: "0",
                name: "菜单规则",
                meta: {
                    authRule: ["auth/rule/index"]
                }
            },
            {
                path: "group",
                component: authRole,
                icon: "0",
                name: "角色管理",
                meta: {
                    authRule: ["auth/role/index"]
                }
            },
            {
                path: "admin",
                component: authAdmin,
                icon: "0",
                name: "管理员管理",
                meta: {
                    authRule: ["auth/rule/index"]
                }
            }
        ]
    }
];
