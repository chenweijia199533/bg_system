<template>
  <div>
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="url"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="success"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
  </div>
</template>

<script>
import base from '@/api/base'
export default {
 data() {
      return {
        url:base.uploadUrl,
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      success(response, file, fileList) {
          console.log('上传成功',response, file, fileList);
           this.$message({
                message: '图片上传成功',
                type: 'success'
           });
           let imgUrl = base.host + '/' + response.url.slice(7)
           this.$emit('sendImg',imgUrl)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
}
</script>

<style>

</style>