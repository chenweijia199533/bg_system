<template>
  <div class="goods">
      <div class="header">
        <el-input v-model="input" placeholder="请输入内容" @change="searchInp"></el-input>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">
          <router-link to="/addgoods" style="color:#fff">页面添加</router-link>
        </el-button>
        <el-button type="primary" style="color:#fff" @click="addGOODS">
          弹框添加
        </el-button>
      </div>
      <!-- 内容展示区 -->
      <div class="wrapper">
        <el-table :data="tableData" border style="width:100%" class="setwidth">
        <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
          <el-table-column prop="title" label="商品名称" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="price" label="商品价格" width="100"></el-table-column>
          <el-table-column prop="num" label="商品数量" width="100"></el-table-column>
          <el-table-column prop="category" label="规格类目" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="image" label="商品图片" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
          <el-table-column prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
          <el-table-column  label="操作" width="180">
             <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>    
        </el-table>
      </div>
      <!-- 分页 -->
      <My :total="total" :pageSize="pagesize" :currentPage="currentPage" @changepage = "changepage" ></My>
      <!-- <Dialoge :dialogVisible="dialogVisible" @close="closes"></Dialoge> -->
      <!-- 使用ref给子组件明明 -->
      <Dialoge ref="dialog" :title="title" :rowData="rowData"></Dialoge>
  </div>
</template>

<script>
import My from '@/components/MyPagination.vue'
import Dialoge from '@/views/Goods/Dialoge.vue'
export default {
  data () {
    return {
      input:'',
      tableData: [],
      total:10,
      pagesize:1,
      type:1,//1表示搜索没有数据
      list:[],
      dialogVisible: false,
      currentPage: 1,
      title:'添加商品',
      rowData:{}
      }
  },
  methods: {
    addGOODS() {
      // this.dialogVisible = true
      // 通过this.$refs.dialog拿到名为dialog的子组件
      // this.$refs.dialog.xxx可以操作子组件中的数据
      this.$refs.dialog.dialogVisible = true
      this.title='添加商品'
    },
    // closes() {
    //   this.dialogVisible = false
    // },
    // 分页页码
    changepage(num) {
      this.currentPage=num
      if(this.type == 1) {
        this.http(num)
      }else {
        console.log('ceshi');
        this.tableData = this.list.slice(( num- 1) * 3,num * 3)
      }
    },
    // 商品搜索
    searchInp(val) {
      if(!val) {
        this.type=1
        this.currentPage=1
        this.http(1)
        return
      }
      console.log('ceshi',val);
      this.$api.getSearch({
        search:val
      }).then(res => {
        console.log(res.data);
        if(res.data.status ===200) {
          this.currentPage=1
          this.list = res.data.result
          this.total = res.data.result.length
          this.pagesize = 3
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
    handleEdit(index, row) {
      this.title = '编辑商品'
      console.log(index, row);
      this.$refs.dialog.dialogVisible = true
      this.rowData = {...row}
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'     
        }).then(() => {
          this.$api.deleteGoods({
            id:row.id
          })
          .then(res =>{
            console.log(res.data);
            if(res.data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
           }
          })
          
          this.http(1)
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    
    // 获取商品列表
    http(page) {
      this.$api.getGoodsList({
        page
      }).then(res =>{
        console.log(res.data);
        if(res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
          this.pagesize = res.data.pageSize
        }
    })
    }
  },
  components: {
    My,
    Dialoge
  },
  created () {
    this.http(1)
  }
}
</script>

<style scoped lang="less">
.goods { 
  margin: 20px;
  .header {   
    display: flex;
    
  }
  .wrapper {
    margin:20px 0;
    // .setwidth {
    //   min-width: 1146px;
    //   max-width: 1302px;
    // }
    .el-button {
      padding:10px;
    }
  }
}
</style>