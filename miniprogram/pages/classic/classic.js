// pages/classic/classic.js
// import { HTTP } from '../../util/http.js'
// let http = new HTTP()

import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/likeModel.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: 666 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    classicModel.getLatest((res)=>{
      console.log('classic Page \n', 
        'onLoad classicModel.getLatest --- \n',
        res);
        
      this.setData({
        classicData:res
      })
    })

    // http.request({
    //   url:'classic/latest',
    //   success:(res)=>{
    //     console.log('classic Page: \n', res)
    //   }
    // })

    // wx.request({
    //   url: 'https://www.fastmock.site/mock/0f8833e657e4d150460baaf5da523f7b/jiudao/classic/latest',
    //   header: {
    //     appkey:"98HcsgdJ3mx4Ufcm"
    //   },
    //   // 请求成功回调， res为服务器返回内容
    //   success:(res) => {
    //     console.log(res);
    //     console.log(this.data.test);
    //   }
    // })
  },

  onLikeClassic:function(event){
    console.log('Page Classic onLikeClassic --- ', event)
    let behavior = event.detail.behavior
    // 调用点赞接口
    likeModel.like(behavior, this.data.classicData.id, 
      this.data.classicData.type)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})