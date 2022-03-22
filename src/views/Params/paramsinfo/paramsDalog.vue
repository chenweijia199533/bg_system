<template>
    <el-dialog
      title="添加规格参数"
      :visible.sync="dialogVisible"
      width="70%"
      >
      <TreeGoods @treedata="treedata"/>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = true" :disabled="disabled"
            
          >确定并添加分组</el-button>
      </span>
       <el-dialog
        width="45%"
        title="商品参数配置"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="title">
            当前选择的商品为：{{getTreeData.name}}
        </div>
        <el-button @click="addDomain" style="margin:10px">新增规格列表</el-button>
        <hr>

        <el-form :model="dynamicValidateForm" 
        ref="dynamicValidateForm" 
        label-width="100px" 
        style="margin:10px"
        class="demo-dynamic">
            <el-form-item
                v-for="(item, index) in dynamicValidateForm.groups"
                :label="item.title"
                :key="index"
                :prop="item.title"
                :rules="{
                required: true, message: '域名不能为空', trigger: 'blur'
                }"
            >
                <div class="item">
                    <el-input v-model="item.title"></el-input>
                    <el-button @click.prevent="addChildDomain(index)">增加子组</el-button>
                    <el-button @click.prevent="removeDomain(index)">删除</el-button>
                </div>   
                <!-- 内层 --> 
                <el-form-item
                    v-for="(childeitem, i) in item.children"
                    :label="childeitem.title + i"
                    :key="i"
                    :prop="childeitem.title"
                    :rules="{
                    required: true, message: '域名不能为空', trigger: 'blur'
                    }"
                    >
                    <div class="item">
                        <el-input v-model="childeitem.title"></el-input>
                        <el-button @click.prevent="removeChildDomain(index,i)">删除</el-button>
                    </div>               
                </el-form-item>           
            </el-form-item> 
        </el-form>


        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">确定</el-button>
             <el-button  @click="resetForm">取消</el-button>
        </span>
      </el-dialog> 
    </el-dialog>
</template>

<script>
import TreeGoods from '@/views/Goods/TreeGoods.vue'
export default {
    props:{
        
    },
    data () {
        return {
            dialogVisible:false,
            innerVisible:false,
            disabled:true,
            getTreeData:{},//tree数据
            dynamicValidateForm: {//element-ui自带的  动态表单
                groups: [],
            }
        }
    },
    components: {
        TreeGoods
    },
    methods: {
        treedata(val) {
            this.getTreeData = val
            this.disabled = false
            console.log(val);
        },
        addChildDomain(index){
            this.dynamicValidateForm.groups[index].children.push({
                value:'',
                title:''
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log('提交',this.dynamicValidateForm.groups);
                this.$api.insertItemParam({
                    itemCatId: this.getTreeData.cid,
                    content: JSON.stringify(this.dynamicValidateForm.groups),
                    specsName: this.getTreeData.name
                }).then(res =>{
                    if(res.data.status ===200) {
                        // 添加成功，关闭弹框，清空数据，按键禁用
                        this.dialogVisible = false
                        this.innerVisible = false
                        this.dynamicValidateForm.groups = []
                        this.disabled = true
                        this.$parent.http(1)
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm() {
            // this.dialogVisible = false
            this.innerVisible = false
            this.dynamicValidateForm.groups = []
            this.disabled = true
        },
        removeDomain(index) {
            this.dynamicValidateForm.groups.splice(index, 1)
        },
        //删除子组
        removeChildDomain(index,i) {
            this.dynamicValidateForm.groups[index].children.splice(i,1)
        },
        addDomain() {
            this.dynamicValidateForm.groups.push({
                value: '',
                title:'',
                children:[]
            });
        }
    }
}
</script>

<style scoped lang="less">
.item {
    display: flex;
    margin-bottom: 10px;
    button {
        margin-left: 10px;
    }
}
</style>