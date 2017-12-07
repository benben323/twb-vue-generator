import Vue from 'vue'
import Router from 'vue-router'
const {baseUrl} = require('../../env_config.js')
Vue.use(Router)

const SearchView = () => import('../views/SearchView.vue')

let router = new Router({
	mode: 'history',
	base:baseUrl,
	scrollBehavior: () => ({y: 0}),
	routes: [
		{path: '/index', component: SearchView, name: 'index'}
	]
})

router.beforeEach((to, from, next) => {
	next()
})

router.afterEach((to, from) => {
    
})

export function createRouter() {
	return router
}
