<template>
  <el-pagination
    background
    layout="total,prev, pager, next,jumper"
    style="text-align:center"
    :total="total"
    :page-size="pageSize"
    :current-page.sync="currentPage"
    @current-change = "changepage">
  </el-pagination>
</template>

<script>
export default {
    props: {
        total:{
            type: Number,
            default:100
        },
        pageSize:{
            type: Number,
            default:10
        },
        currentPage:{
            type: Number,
            default:1
        } 
    },
    data () {
        return {
            fcurrentPage:0
        }
    },
    methods: {
        changepage(page) {
            this.$emit('changepage',page)
        }
    },
    watch:{
        
    }
}
</script>

<style>

</style>