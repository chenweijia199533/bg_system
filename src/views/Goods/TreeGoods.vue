<template>
  <div>
      <el-tree
        :props="props"
        :load="loadNode"
        lazy
        accordion
        @node-click ="treeData"
        >
      </el-tree>
  </div>
</template>

<script>
export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        
      };
    },
    methods: {
    //获取tree数据
    treeData(data,node) {
        this.$emit('treedata',data)
    }, 
    //   resolve成功获取数据返回结果
      loadNode(node, resolve) {
        //进入页面，请求第一层tree的数据
        if (node.level === 0) {
          this.$api.getSelectCategory()
          .then(res =>{
              return resolve(res.data.result);
          })          
        }
        if (node.level >= 1) {
            // 请求当前点击的tree的数据
            this.$api.getSelectCategory({
                id:node.data.cid
            })
          .then(res =>{
              if(res.data.status === 200) {
                return resolve(res.data.result);
              }else {
                return resolve([]);
              }            
          })  
        }

      }
    }
  }
  </script>

<style>

</style>