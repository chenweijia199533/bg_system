<template>
  <div class="params">
    <div class="nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to='{ path: "/params" }'> 规格参数</el-breadcrumb-item>
            <el-breadcrumb-item>规格与包装</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 搜索框 -->
    <div class="header">
        <el-input v-model="input" placeholder="请输入内容" @change="searchBtn"></el-input>
        <el-button type="primary">查看</el-button>
        <el-button type="primary" @click="addDialog">添加</el-button>
    </div>
      
    <!-- 参数列表 -->
    <el-table
      :data="tableData"
      class="my-table"
     >
      <el-table-column
        prop="id"
        label="规格参数ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="itemCatId"
        label="类目ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="specsName"
        width="100"
        label="规格名称">
      </el-table-column>
      <el-table-column
        prop="paramData"
        show-overflow-tooltip
        label="规格参数">
      </el-table-column>
      <el-table-column  label="操作" width="180">
             <template >
              <el-button 
              size="mini">查看</el-button>
              <el-button
                size="mini"
                >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                >删除</el-button>
            </template>
          </el-table-column>  
    </el-table>

    <!-- 分页 -->
    <MyPagination 
    :total="total" 
    :pageSize="pageSize" 
    :currentPage ="currentPage"
    @changepage = "changepage"></MyPagination>


    <!-- 弹框 -->
    <ParamsDalog ref="paramsdialog"></ParamsDalog>


  </div>
</template>

<script>
import MyPagination from '@/components/MyPagination.vue'
import ParamsDalog from '@/views/Params/paramsinfo/paramsDalog.vue'
export default {
 data() {
    return {
      input: '',
      tableData:[],
      total:10,
      pageSize:1,
      type: 1,
      list:[],
      currentPage: 1,
      dialogVisible:false//显示弹框的控制
    }
  },
  components: {
      MyPagination,
      ParamsDalog
  },
  methods: {
    // 获取规格参数列表
    http(page) {
      this.$api.getParams({ page }).then((res) => {
          console.log(res.data);
          if(res.data.status === 200) {
              this.tableData = res.data.data
              //获取分页
              this.total = res.data.total
              this.pageSize = res.data.pageSize         
          }
      })
    },
    /** 
     * 点击分页--切换
    */   
    changepage(num) {
      this.currentPage=num
      if(this.type == 1) {
        this.http(num)
      }else {
        this.tableData = this.list.slice(( num- 1) * 8,num * 8)
      }
    },
    /**
     * 搜索
    */
    searchBtn(val) {
      if(!val) {
        this.type = 1;
        this.currentPage = 1
        this.http(1)
        return
      }
      this.$api.searchParams({
        search:val
      })
      .then(res =>{
        console.log(res.data.result);
        if(res.data.status === 200) {
          this.currentPage = 1
          this.list = res.data.result
          this.total = res.data.result.length
          this.pageSize = 3
          this.tableData = res.data.result.slice(0,3)
          this.type = 2
        }else {
          this.tableData = []
          this.total = 1          
          this.pagesize = 1
          this.type = 1
        }
      })
    },
    addDialog() {
      this.$refs.paramsdialog.dialogVisible =  true
    }
  },
  created () {
      this.http(1)
  }
}
</script>

<style scoped lang="less">
.params {
    margin: 10px;
    .header {
        margin-top: 10px;
        display: flex;
        button {
            margin-left: 10px;
        }
    }
    .my-table {
        margin: 10px auto
    }
    table {
        button {
            padding:10px;
        }
    }
}
</style>