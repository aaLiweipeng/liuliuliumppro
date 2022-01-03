// pages/classic/classic.js
// import { HTTP } from '../../util/http.js'
// let http = new HTTP()

import { ClassicModel } from '../../models/classicModel.js'
import { LikeModel } from '../../models/likeModel.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   * latest:true 【因为初始页面就是最新一页】
   */
  data: {
    test: 666,
    classic:null,
    latest:true, 
    first:false 
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
        classicData:res.data
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
   * 点击向左导航按钮
   * @param {*} event 组件通过triggerEvent传递过来的事件
   */
  onNaviNext:function(event){
    console.log('Page Classic onNaviNext event --- ', event)
    this._updateClassic('next')
  },

  onNaviPrevious:function(event){
    console.log('Page Classic onNaviPrevious event --- ', event)
    this._updateClassic('previous')
  },

  _updateClassic: function (nextOrPrevious) {
    const index = this.data.classicData.index

    console.log('Page Classic _updateClassic index --- ', index)
    console.log('Page Classic _updateClassic nextOrPrevious --- ', nextOrPrevious)

    classicModel.getClassic(index, nextOrPrevious, (res) => {

      // this._getLikeStatus(res.id, res.type)

      this.setData({
        classicData: res.data,
        latest: classicModel.isLatest(res.data.index),
        first: classicModel.isFirst(res.data.index)
      })
    })
  },

  // _getLikeStatus: function (artID, category) {
  //   likeModel.getClassicLikeStatus(artID, category,
  //     (res) => {
  //       this.setData({
  //         likeCount: res.fav_nums,
  //         likeStatus: res.like_status
  //       })
  //     })
  // },

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