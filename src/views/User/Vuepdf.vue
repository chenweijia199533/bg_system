<template>
  <div>
    <el-dialog
        title="文档内容"
        :visible.sync="dialogVisible"
        width="50%"
        >
        <!-- :
        page :显示页码的。默认值为1
        :rotate ：旋转角度，默认值为0，90的倍数
        -->
        <el-button @click="older">上一页</el-button>
        <el-button @click="next">下一页</el-button>
        {{currentPage}} / {{pageCount}}
        <el-button @click="print">打印</el-button>
        <Pdf src="./sxt.pdf" :page="num"
            @num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"
            ref="pdf"
        ></Pdf>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
//1. 安装pdf : npm i vue-pdf -S
//2. 导入pdf  3. 使用组件
import Pdf from 'vue-pdf'
export default {
    data() {
      return {
        dialogVisible: false,
        num:1,
        pageCount:0,
        currentPage:0
      };
    },
   components: {
       Pdf    
   },
   methods: {
       //上一页
       older() {
           if(this.num >= 2) {
               this.num --
           }else {
               this.$message({
                    message: '已经是第一页了',
                    type: 'warning'
                });
           }
       },
       //下一页
       next() {
           if(this.num <= 62) {
               this.num++
           }else {
               this.$message({
                    message: '已经是最后一页了',
                    type: 'warning'
                });
           }
       },
       //打印
       print() {
           this.$refs.pdf.print()
       }
   }
};
</script>

<style>

</style>