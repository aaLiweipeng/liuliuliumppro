import { config } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',// 默认错误码
  1005: '不正确的apikey',
  2000: '您已点赞过了'
}

class HTTP {
  request(params){

    // 鲁棒性 如果没method，给个默认method
    if(!params.method) {
      params.method = "GET"
    }

    wx.request({
      url: config.api_base_url + params.url,
      method:params.method,
      data:params.data,
      header:{
        'content-type':'application/json',
        // 'appkey:config.appkey'
      },
      success:(res)=>{
        let code = res.statusCode.toString()
        if (code.startsWith('2')){
          
          //回调传进来的回调函数 【注意判空】 
          console.log('http util success res --- ', res);
          params.success && params.success(res.data)
        }
        else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        //test时候可以用断网环境测试
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if(!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration: 1600
    })
  }
}

export {HTTP}