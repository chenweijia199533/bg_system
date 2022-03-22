import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)

const messages = {
    en: {
      message: {
        home:'homge',
        goods: 'goods',
        params:'params',
        Avater:'Avater',
        order:'order'
      },
      ...enLocale,
    },
    zh: {
      message: {
        home:'首页',
        goods: '商品管理',
        params:'规格参数',
        Avater:'广告分类',
        order:'订单管理'
      },
      ...zhLocale
    }
  }

  const i18n = new VueI18n({
    locale: 'zh', // set locale
    messages, // set locale messages
  })
  // Vue.use(Element, {
  //   i18n: (key, value) => i18n.t(key, value)
  // })
  export default i18n