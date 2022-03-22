import axios from "axios"
import base from "./base"
const qs = require('querystring')
const api = {
    getGoodsList(params) {
        return axios.get(base.goodsList,{
            params
        })
    },
    getSearch(params) {
        return axios.get(base.search,{
            params
        })
    },
    /**
     *类目选择 
     *{id:cid}
     */
    getSelectCategory(params) {
        return axios.get(base.selectCategory,{
            params
        })
    },
    /**
      * 添加商品
      * 参数： title cid  category sellPoint price num desc paramsInfo image
      */
    AddGoods(params) {
        return axios.get(base.addGoods,{params})
    },
    /**
       * 删除商品 id
       */
    deleteGoods(params) {
        return axios.get(base.deleteGoods,{params})
    },
    // 修改商品 id
    updataGoods(params) {
        return axios.get(base.updataGoods,{params})
    },
    //登录接口
    getLogin(params) {
        return axios.post(base.login,qs.stringify(params))
    },
    //规格参数列表
    getParams(params) {
        return axios.get(base.paramss,{params})
    },
    //搜索参数 参数：search
    searchParams(params) {
        return axios.get(base.searchParams,{params})
    },
    //添加规格参数
    insertItemParam(params) {
        return axios.get(base.insertItemParam,{params})
    },
    statistical(params) {
        return axios.get(base.statistical,{params})
    },
    sellTotal(params) {
        return axios.get(base.sellTotal,{params})
    }
}

export default api