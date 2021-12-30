// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function (event) {
      // if判断 用于禁用不适合的事件的触发
      // 如这里，如果是最新页面，则事件不触发
      if (!this.properties.latest) {
        this.triggerEvent('naviLeft', {}, {})
      }
    },

    onRight: function (event) {
      if (!this.properties.first) {
        this.triggerEvent('naviRight', {}, {})
      }
    }
  }
})
