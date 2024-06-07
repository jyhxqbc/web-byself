import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from "@/views/layout";
import search from "@/views/search";
import pay from "@/views/pay";
import myorder from "@/views/myorder";
import info from "@/views/info";
import login from "@/views/login";
import home from "@/views/layout/home.vue";
import fenlei from "@/views/layout/fenlei.vue";
import shopcar from "@/views/layout/shopcar.vue";
import my from "@/views/layout/my.vue";
import store from '@/store';
import searchlist from "@/views/search/searchlist.vue";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: layout,
        redirect: '/home',
        children: [
            { path: '/home', component: home },
            { path: '/fenlei', component: fenlei },
            { path: '/shopcar', component: shopcar },
            { path: '/my', component: login },
            { path: '/login', component: login },
        ]

    },
    {
        path: '/search',
        component: search
    },
    {
        path: '/pay',
        component: pay
    },
    {
        path: '/myorder',
        component: myorder
    },
    {
        path: '/info/:id',
        component: info
    },
    {
        path: '/searchlist',
        component: searchlist
    }

]

// 1. to   往哪里去， 到哪去的路由信息对象  
// 2. from 从哪里来， 从哪来的路由信息对象
// 3. next() 是否放行
//    如果next()调用，就是放行,放行到to要去的路劲
//    next(路径) 拦截到某个路径页面



const router = new VueRouter({
    routes
})

const root = ['/pay', '/myorder', '/shopcar']
router.beforeEach((to, from, next) => {
    if (!root.includes(to.path)) {
        next()
        return
    }
    const a = store.getters.token
    console.log(a);
    if (a) {
        next()
    } else {
        next('/login')
    }
})

export default router