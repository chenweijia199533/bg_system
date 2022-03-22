<template>
  <div id="texteditor">
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
    data () {
        return {
            editor:''//在生命周期中操作里面的变量非常不方便，在data中声明可以简单操作
        }
    },
    mounted () {
        this.editor = new E('#texteditor')
        // 获取用户输入的内容
        this.editor.config.onchange = newHtml => {
            console.log("change 之后最新的 html", newHtml);
            this.$emit('sendEditor',newHtml)
        };
        // 配置触发 onchange 的时间频率，默认为 200ms
        this.editor.config.onchangeTimeout = 1000; // 修改为 500ms
        this.editor.config.menus = [
            'bold',
            'head',
            'link',
            'italic',
            'underline'
        ]
        this.editor.config.focus = false
       
        this.editor.create()
    }
}
</script>

<style>

</style>