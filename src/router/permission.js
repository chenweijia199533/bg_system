//路由拦截器
// 获取vuex数据
import stroe from '@/store/index'
import router from '@/router/index'
router.beforeEach((to,from,next)=>{
  if(to.matched.some(ele=>ele.meta.isLogin)) {
    let token = stroe.state.loginModule.userinfo.token
    if(token) {
      next()
    }else {
      next('/login')
    }
  }else {
    next()
  }
})