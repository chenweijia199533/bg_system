<template>
  <div class="layout">
      <Mymenu class="left-nav" :isCollapse="isCollapse" >
          
      </Mymenu>
      <Context class="context" @changecollapse = "changecollapse" :isCollapse="isCollapse" :class="{isActive:isCollapse}">
      </Context>
      
  </div>
</template>

<script>
import Mymenu from './Mymenu.vue'
import Context from './context.vue'
export default {
    data () {
        return {
            isCollapse:false
        }
    },
    components: {
        Mymenu,
        Context
    },
    methods: {
        changecollapse() {
            this.isCollapse = !this.isCollapse
        }
    }
}
</script>

<style scoped lang="less">
.layout {
    .left-nav {
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: #545c64;
    }
    .context {
        margin-left: 200px;
        transition:  all 0.2s;
    }
    .isActive {
        margin-left: 64px;
    }
}
</style>