<template>
  <div>
    <el-menu
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      >
      <el-menu-item>
        <span slot="title">个人管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{$t("message.home")}}</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-document"></i>
        <span slot="title">{{$t("message.goods")}}</span>
      </el-menu-item>
      <el-submenu index="/params">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t("message.params")}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/params/specifications">规格列表</el-menu-item>
          </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/avater">
        <i class="el-icon-setting"></i>
        <span slot="title">{{$t("message.Avater")}}</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{$t("message.order")}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/orderlist">订单列表</el-menu-item>
          <el-menu-item index="/order/orderback">退货管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props:['isCollapse']
}
</script>

<style scoped lang= 'less'>
.el-menu {
  border-right: 0;
  /* .el-menu-item,.el-submenu {
    background: #054476 !important;
    color: #fff;
  } */
  
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  
</style>