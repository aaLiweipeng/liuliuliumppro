import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {

  // 获取最近一期的期刊
  getLatest(sCallback) {
    this.request({
      url:'classic/latest',
      success:(res) => {
        console.log('classic Page: \n', res)
        sCallback(res)
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallback) {
    // 获取classic的时候现在缓存中寻找，找不到再去请求服务器
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    let key = nextOrPrevious == 'next' ?
        this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
        this.request({
            url: `classic/${index}/${nextOrPrevious}`,
            success: (res) => {
                wx.setStorageSync(
                    this._getKey(res.index), res)
                sCallback(res)
            }
        })
    } else {
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

  _setLatestIndex(index) {
      wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
      const index = wx.getStorageSync('latest')
      return index
  }

  _getKey(index) {
      const key = 'classic-' + index
      return key
  }
}

export { ClassicModel }