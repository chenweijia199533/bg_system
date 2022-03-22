const base = {
    host:'http://localhost:8989',
    goodsList:'/api/api/projectList',//商品列表
    search:'/api/api/search',//搜索列表
    selectCategory:'/api/api/backend/itemCategory/selectItemCategoryByParentId',//类目
    uploadUrl:'/api/api/upload',//上传图片
    addGoods:'/api/api/backend/item/insertTbItem',//添加商品
    deleteGoods:'/api/api/backend/item/deleteItemById',//删除商品
    updataGoods:'api/api/backend/item/updateTbItem',//修改商品
    login:'/api/api/login',
    paramss:'/api/api/backend/itemParam/selectItemParamAll',//规格参数
    searchParams:'/api/api/params/search',//规格参数查询
    insertItemParam:'/api/api/backend/itemParam/insertItemParam',//规格参数添加
    statistical:'/api/api/statistical',//销售信息
    sellTotal:'/api/api/sellTotal',//近半年的销售信息
}

export default base