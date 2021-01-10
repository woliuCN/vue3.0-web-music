import { createApp } from 'vue'
import App from './App.vue'
import Tabs from '@/components/tabs/Index.vue'
import TabPane from '@/components/tabs/TabPane.vue'
import Pagin from '@/components/pagin/Index.vue'
import Comments from '@/components/comments/Index.vue'
import vloading from '@/components/loading/index'
import clickOutside from '@/directives/click-outside'
import router from './router'
import store from './store'
import '@/assets/css/index.scss'
import '@/theme/index.scss'
import '@/utils/flexible.js'
const app = createApp(App)
app.directive('loading', vloading)
app.directive('outside', clickOutside)
app.component('tabs', Tabs)
app.component('tab-pane', TabPane)
app.component('comments', Comments)
app.component('pagin', Pagin)
app.use(store).use(router).mount('#app')
