<template>
  <div class="user">
      查看文档：<el-button @click="look">查看</el-button>
      <VuePdf ref="mypdf"></VuePdf>

      <!-- 图片下载 -->
      <div class="money">
          <div class="image">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                        @click="download"
                    >下载图片</el-button>
                </div>
                <div class="text item">
                   <img ref="img" :src="imgUrl" style="width:300px" alt="">
                </div>
              </el-card>
          </div>
          <div class="image">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                        @click="downs"
                    >跨域下载图片</el-button>
                </div>
                <div class="text item">
                   <img src="@/assets/image/11.jpg" ref="myimg" style="width:300px" alt="">
                </div>
              </el-card>
          </div>
          <div class="image">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                        @click="down"
                    >下载同源</el-button>
                </div>
                <div class="text item">
                   <img :src="imgUrl" style="width:300px" alt="">
                </div>
              </el-card>
          </div>
      </div>

      <!-- 导出表格 --> 
      <el-button @click="excel">导出列表</el-button>
       <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="id"
                label="id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="title"
                label="商品名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="num"
                label="数量">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格">
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
import VuePdf from './Vuepdf.vue'
import image from '@/assets/image/11.jpg'
import { export2Excel } from '@/common/utils'
export default {
    data () {
        return {
            imgUrl: image,  
            tableData:[] ,
            columns:[
                {title:'id', key:'id'},
                {title:'商品名称', key:'title'},
                {title:'数量', key:'num'},
                {title:'价格', key:'price'},
            ]  
        }
    },
    components: {
        VuePdf
    },
    methods: {
        look() {
            this.$refs.mypdf.dialogVisible = true
        },
        download() {
            let url = this.$refs.img
            // 在浏览器的新窗口打开图片
            window.location.href = url.src
        },
        //必须同源才能下载
        down() {
            let alink = document.createElement('a')//创建a标签
            alink.href = this.imgUrl
            alink.download = 'pic'//下载的图片名
            alink.click()
        },
        downs() {
            this.downloadIamge(this.$refs.myimg.src,'pci')
        },
        downloadIamge (imgsrc, name) { // 下载图片地址和图片名
            var image = new Image()
            // 解决跨域 Canvas 污染问题
            image.setAttribute('crossOrigin', 'anonymous')
            image.onload = function () {
                var canvas = document.createElement('canvas')
                canvas.width = image.width
                canvas.height = image.height
                var context = canvas.getContext('2d')
                context.drawImage(image, 0, 0, image.width, image.height)
                var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
                var a = document.createElement('a') // 生成一个a元素
                var event = new MouseEvent('click') // 创建一个单击事件
                a.download = name || 'photo' // 设置图片名称
                a.href = url // 将生成的URL设置为a.href属性
                a.dispatchEvent(event) // 触发a的单击事件
            }
            image.src = imgsrc
        },
        excel() {
            export2Excel(this.columns,this.tableData,'测试导出的数据')
        }
    },
    created () {
        this.$api.getGoodsList().then(res =>{
            console.log(res.data);
            this.tableData = res.data.data
        })
    }
}
</script>

<style scoped lang="less">
.user{
    margin-left: 10px;
    .money {
        display: flex;
        margin: 10px 10px;
        padding: 5px;
        height: 300px;
        background-color: #fff;
        justify-content: space-around;
        .image {
            background-color: #eee;
            width: 350px;
            height: 240px;
        }
    }
}
  
</style>