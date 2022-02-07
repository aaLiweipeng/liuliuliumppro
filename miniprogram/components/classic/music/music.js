// components/classic/music/music.js
import {
  classicBeh
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列, 动画
   * 动画API CSS3 canvas 游戏
   * 现成
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   * 播放音乐API 老版API 新版API
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  // hidden ready created
  //onShow
  attached(event) {
    // 跳转页面 当前 切换
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached: function (event) {
    // wx:if hidden
    // mMgr.stop()
  },

  /**
   * 组件的方法列表 
   */
  methods: {
    onPlay: function (event) {
      // 图片要切换
      if (!this.data.playing) {
        // 如果不在播，开始播
        this.setData({
          playing: true
        })

        console.log("Music.js onPlay Open the music!!")
        console.log("this.properties.src -- ", this.properties.src)

        // 设置src成新的音频src就会开始自动播放
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title

        console.log("Music.js onPlay mMgr.src -- ", mMgr.src)
      } else {
        // 如果在播，暂停播放
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus: function () {

      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }

      // 切换页面
      // 如果正在播放的歌 是 当前页的歌，则继续播放，开启组件UI
      // 不然, 当前页的音乐 就 默认不播放，UI不开启，
      // mgr的播放与否随它
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    // UI 适配 设备或者IDE的总控开关
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})