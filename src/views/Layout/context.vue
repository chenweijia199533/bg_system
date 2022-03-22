<template>
  <div>
      <div class="header">
        <i v-if="!isCollapse" @click="changemenu" class="iconfont icon-toggle-left"></i>
        <i v-else @click="changemenu" class="iconfont icon-toggle-right"></i>
        <div class="header-right">
          <el-dropdown @command="changeLang">
            <span class="el-dropdown-link" style="color:#fff">
              多语言<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command = 'zh'>中文</el-dropdown-item>
              <el-dropdown-item command = 'en'>英语</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="user">
            欢迎：{{userinfo.user}}
            <i class="el-icon-switch-button"  @click="loginout"></i>
          </div>
        </div>
      </div>
      <div class="content">
        <router-view/>
      </div>
      
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  props: ['isCollapse'],
  computed:{
    ...mapState('loginModule',['userinfo'])
  },
  methods: {
    ...mapMutations('loginModule',['clearUser']),
    changemenu() {
      this.$emit('changecollapse')
    },
    changeLang(command ) {
      this.$i18n.locale=command
    },
    loginout() {
      // 清空vuex数据
      this.clearUser()
      //清空本地存储
      localStorage.removeItem('user')
      //返回登录
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.header {
    height: 60px;
    background-color: skyblue;
    line-height: 60px;
    color:#fff;
    .iconfont {
      font-size: 24px;
    }
    .header-right{
      float:right;
      margin-right: 20px;
      display: flex;
      .user {
        margin-left: 20px;
      }
    }
    .el-icon-switch-button {
      position: relative;
      top: 2px;
      font-size: 20px;
    }
}
</style>