<template>
  <div>
      <div class="login-box">
        <h3 class="title">登录页面</h3>
        <span class="err-msg"> {{info}} </span>
        <el-form 
        :model="loginForm" 
        status-icon 
        :rules="rules" 
        ref="ruleForm" 
        label-width="50px" 
        class="demo-ruleForm">
          <el-form-item label="账户" prop="username">
            <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import jwt from 'jwt-decode'
import { mapMutations } from 'vuex'
export default {
 data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else {
          callback();
        }
      };
      return {
        info:'',
        loginForm: {
          username:'',
          password: '',
        },
        rules: {
          username: [
            { validator : validateUser , trigger: 'blur' }
          ],
          password: [
            { validator : validatePass, trigger: 'blur' }
          ],
        }
      };
 },
 methods: {
      ...mapMutations('loginModule',['setUser']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {username,password} = this.loginForm
            this.$api.getLogin({
              username,password
            }).then(res => {
              // res.data被生成为token模式
              //安装jwt-decode,解析res.data的数据
              // console.log(jwt(res.data));
              if(res.data.status === 200) {
                //登录成功后 1、存储登录信息 2、跳转页面 3顶部区域显示用户信息 4、持久化
                let obj = {
                  user:jwt(res.data.data).username,
                  token:res.data.data
                }
                this.setUser(obj)
                //持久化
                localStorage.setItem('user',JSON.stringify(obj))
                this.$router.push('/')
                this.info = ''

              }else {
                this.info = '账号或密码错误'
              }
            })
          } else {
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
  .login-box {
    width: 400px;
    height: 250px;
    margin: 100px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #eee;
    .title {
      text-align: center;
      margin-bottom: 30px;
    }
    .err-msg {
      position: absolute;
      top: 150px;
      bottom: 0;
      height: 20px;
      line-height: 20px;
      margin-left: 20px;
      background-color: pink;
      color: red;
    }
  }
</style>