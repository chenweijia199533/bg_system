<template>
  <el-dialog
    :title="title"
    width="70%"
    :visible.sync="dialogVisible"
    :before-close="resetForm"
    >
    <el-form      
      :model="goodsForm" 
      :rules="rules" 
      ref="ruleForm" 
      label-width="100px" 
      class="demo-ruleForm MyForm">
        <el-form-item label="类目选择" prop="category">
            <el-button type="primary" @click="innerVisible = true">类目选择</el-button>
            <span> {{ goodsForm.category }} </span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
            <el-input v-model="goodsForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
            <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
            <el-input v-model="goodsForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="goodsForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
            <el-button type="primary" @click="innerVisibleImg = true">上传图片</el-button>
            <img :src="goodsForm.image" alt="" style="height:150px;padding-left:20px;">
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
           <WangEditor ref="Myeditor"  @sendEditor = "sendEditor"/>
        </el-form-item>
        
      </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>

    <!-- 类目选择 内弹框 -->
    <el-dialog
      width="40%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body>
      <TreeGoods @treedata="treedata"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="showtreeData">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 上传图片 内弹框 -->
    <el-dialog
      width="40%"
      title="图片选择"
      :visible.sync="innerVisibleImg"
      append-to-body>
      <UploadImg @sendImg="sendImg"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisibleImg = false">取 消</el-button>
        <el-button type="primary" @click="showImg">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import TreeGoods from './TreeGoods.vue'
import UploadImg from './UploadImg.vue'
import WangEditor from './WangEditor.vue'
export default {
    props: {
      title:{
        tyoe:String,
        default:'添加商品'
      },
      rowData:{
        type:Object,
        default:function() {
          return {}
        }
      }
    },
    // props: ['dialogVisible'],
    data() {
      return {
        dialogVisible:false,//添加商品弹框
        innerVisible: false,//类目弹框
        innerVisibleImg:false,//上传图片弹框
        imgUrl:"",
        Treedata:{},
        goodsForm: {
          id:'',
          title: '',
          price: '',
          num: '',
          sellPoint: '',
          image: '',
          descs: '',
          category: '',
        },

        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '请选择活动区域', trigger: 'blur',min: 2, }
          ],
        }
      };
    },
    //监听器
    watch: {
      rowData(val) {
        console.log('监听数据变化',val);
        this.goodsForm = val
        this.$nextTick(()=>{
          this.$refs.Myeditor.editor.txt.html(val.descs)
        })
      }
    },
    methods: {
      //获取tree数据
      treedata(val) {
        this.Treedata = val
      },
      //点击确定，显示数据，关闭弹框
      showtreeData() {
        this.innerVisible = false
        this.goodsForm.category = this.Treedata.name
      },
      //获取图片地址
      sendImg(val) {
        console.log(val);
        this.imgUrl = val
      },
      //点击确定，显示图片，关闭弹框
      showImg() {
        this.innerVisibleImg = false
        this.goodsForm.image = this.imgUrl
      },
      sendEditor(val) {
        this.goodsForm.descs = val
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log('获取输入信息',this.goodsForm)
            let {title,cid, category,sellPoint,price,num,descs,image,id} = this.goodsForm
            if(this.title ==="添加商品") {
                this.$api.AddGoods({title,cid, category,sellPoint,price,num,descs,image})
                            .then(res =>{
                              console.log(res);
                              if(res.data.status === 200){
                                this.$parent.http(1)
                                this.$message({
                                  message: '添加商品成功',
                                  type: 'success'
                                }); 
                                //点击确定，清空数据
                                this.resetForm()
                              }else {
                                this.$message.error({
                                  message: '添加商品失败',
                                }); 
                              }
                            })
                              // this.$refs.Myeditor.editor.txt.clear()    
            }else {
              console.log('编辑');
              this.$api.updataGoods({
                id,title,cid, category,sellPoint,price,num,descs,image
              }).then(res=>{
                console.log(res.data);
                if(res.data.status === 200) {
                  this.$parent.http(1)
                  this.$message({
                    message: '修改商品成功',
                    type: 'success'
                  }); 
                  //点击确定，清空数据
                  this.resetForm()
                }else {
                  this.$message.error({
                    message: '修改商品失败',
                  }); 
                }
              })
            }
                  
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.dialogVisible = false
        // this.$refs.ruleForm.resetFields();  
        this.goodsForm={
          title: '',
          price: '',
          num: '',
          sellPoint: '',
          image: '',
          descs: '',
          category: '',
        },
        this.$refs.Myeditor.editor.txt.clear()
      },
      

    },
    components: {
      TreeGoods,
      UploadImg,
      WangEditor
    }
}
</script>

<style>

</style>