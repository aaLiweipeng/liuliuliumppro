// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
    showLike:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      const bid = this.properties.book.id
      wx.navigateTo({
        url:`/pages/book-detail/book-detail?bid=${bid}`
      })
      // 降低了组件的通用性, 【固定了url，使用方便，通用降低】
      // 提高业务的专用性, 服务于当前的项目的项目组件，使用方便
    }
  }
})
