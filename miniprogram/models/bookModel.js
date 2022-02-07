import {
  HTTP
}
from '../util/http-p.js'

class BookModel extends HTTP {
  data = null

  /**
   * 返回promise
   */
  getHotList() {
      return this.request({
          url: 'book/hot_list'
      })
  }

  /**
   * 返回promise
   */
  search(start, q){
      return this.request({
          url:'book/search?summary=1',
          data:{
              q:q,
              start:start
          }
      })
  }

  /**
   * 返回promise
   */
  getMyBookCount() {
      return this.request({
          url: '/book/favor/count'
      })
  }

  /**
   * 返回promise
   */
  getDetail(bid) {
      return this.request({
          url: `book/${bid}/detail`
      })
  }

  /**
   * 返回promise
   */
  getLikeStatus(bid) {
      return this.request({
          url: `/book/${bid}/favor`
      })
  }

  /**
   * 返回promise
   */
  getComments(bid) {
      return this.request({
          url: `book/${bid}/short_comment`
      })
  }


  postComment(bid, comment) {
      return this.request({
          url: 'book/add/short_comment',
          method: 'POST',
          data: {
              book_id: bid,
              content: comment
          }
      })
  }
}

export {
  BookModel
}