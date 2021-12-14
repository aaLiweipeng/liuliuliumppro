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
}

export { ClassicModel }