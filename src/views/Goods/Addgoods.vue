<template>
  <div class="addgoods">     
      <div class="title">
        <el-breadcrumb separator="/" class="">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form      
      :model="goodsForm" 
      :rules="rules" 
      ref="ruleForm" 
      label-width="100px" 
      class="demo-ruleForm MyForm">
        <el-form-item label="类目选择" prop="category">
            <el-button type="primary">类目选择</el-button>
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
            <el-button type="primary">上传图片</el-button>
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
           <textarea name="" id="" cols="30" rows="10"></textarea>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" >确定</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
  
</template>

<script>
export default {
 data() {
      return {
        goodsForm: {
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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped lang="less">
.addgoods {
    margin: 10px;
}
.title {
    background-color: #fff;
    border: 1px solid #eee;
    margin-bottom: 20px;
    padding: 10px;
}
.MyForm {
    background-color: #fff;
    padding: 10px;
}
</style>