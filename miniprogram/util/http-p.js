/* 使用promise的方式重构了http.js */
import {config} from '../config.js'

const tips = {
    1: '抱歉，出现了一个错误',// 默认错误码
    1005: '不正确的apikey',
    2000: '您已点赞过了',
    3000: '当前已经是最新的期刊',
    3001: '当前已经是第一个的期刊',
}

// # 解构
class HTTP{
    /* 返回一个promise */
    request({url,data={},method='GET'}){
        return new Promise((resolve, reject)=>{
            this._request(url,resolve,reject,data, method)
        })
    }

    _request(url,resolve, reject, data={}, method='GET'){
        wx.request({
            url:config.api_base_url + url,
            method:method,
            data:data,
            header:{
                'content-type':'application/json',
                // 'appkey:config.appkey'
            },
            success:(res)=>{
                const code = res.statusCode.toString()
                if (code.startsWith('2')){
                    console.log("request success! url --- " + url)
                    console.log("res.data --- ", res.data)
                    resolve(res.data)
                }
                else{
                    reject()
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail:(err)=>{
                console.log("request fail! url --- " + url)
                reject()
                this._show_error(1)
            }
        })

    }

    _show_error(error_code){
        if(!error_code){
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip?tip:tips[1], 
            icon:'none',
            duration:2000
        }) 
    }


}

export {HTTP}


















