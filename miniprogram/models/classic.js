import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {
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