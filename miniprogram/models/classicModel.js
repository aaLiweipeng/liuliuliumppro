import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {

  // 获取最近一期的期刊
  getLatest(sCallback) {
    this.request({
      url:'classic/latest',
      success:(res) => {
        console.log('classic Page: \n', res)
        sCallback(res)

        //获取第一页期刊数据的时候，也存进去缓存
        this._setLatestIndex(res.data.index)//把当前期刊索引 存进缓存
        let key = this._getKey(res.data.index)//生成key
        wx.setStorageSync(key, res)//把期刊数据 存进缓存
      }
    })
  }

  /**
   * 
   * 获取前|后一个期刊数据
   * 
   * @param {*} index 当前期刊！的索引
   * @param {*} nextOrPrevious 前|后一个期刊的索引
   * @param {*} sCallback 用来返回数据、处理返回数据的回调函数引用
   */
  getClassic(index, nextOrPrevious, sCallback) {
    // 获取classic的时候现在缓存中寻找，找不到再去请求服务器
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    let key = nextOrPrevious == 'next' ?
        this._getKey(index + 1) : this._getKey(index - 1)
    
    // 读缓存
    let classic = wx.getStorageSync(key)

    // 缓存找不到再去请求服务器
    if (!classic) {
        this.request({
            url: `classic/${nextOrPrevious}?index=${index}`,
            success: (res) => {

              console.log('classicModel getClassic(index, nextOrPrevious, sCallback) res --- ', res)

              // 请求成功，存缓存
                wx.setStorageSync(
                    this._getKey(res.data.index), res)
                sCallback(res)
            }
        })
    } else {
      // 缓存命中了，直接返回期刊数据
      console.log('classicModel getClassic(index, nextOrPrevious, sCallback) else classic --- ', classic)
      sCallback(classic)
    }
  }

  isFirst(index) {
      return index == 1 ? true : false
  }

  isLatest(index) {
      let latestIndex = this._getLatestIndex()
      return latestIndex == index ? true : false
  }

  getMyFavor(success) {
      const params = {
          url: 'classic/favor',
          success: success
      }
      this.request(params)
  }

  getById(cid, type, success) {
      let params = {
          url: `classic/${type}/${cid}`,
          success: success
      }
      this.request(params)
  }

  /* 把当前期刊索引 存进缓存 */
  _setLatestIndex(index) {
      wx.setStorageSync('latest', index)
  }

  /* 从缓存 取出 当前期刊索引 */
  _getLatestIndex() {
      const index = wx.getStorageSync('latest')
      return index
  }

  /* 自定义的 为期刊数据item 生成key的规则 */
  _getKey(index) {
      const key = 'classic-' + index
      console.log("_getKey --- ", key)
      return key
  }
}

export { ClassicModel }