<template>
  <div class="comment">
    <div class="container">
      <CommentList
            v-if="userinfo.openId"
            type="user"
            :comments="comments"
            ></CommentList>
    </div>
    <div v-if="userinfo.openId">
      <Card :key="key" :book="item" v-for="(item, key) in books"></Card>
      <div v-if="!books.length">暂时还没添加过书，快去扫码添加图书吧</div>
    </div>
  </div>
</template>

<script>
import { get } from '@/util'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
export default {
  components: {
    CommentList,
    Card
  },
  data () {
    return {
      comments: [],
      books: {},
      userinfo: {}
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getBooks () {
      const books = await get('/booklist', {
        openid: this.userinfo.openId
      })
      console.log(books)

      this.books = books.list
    },
    async getComments () {
      const comments = await get('/commentlist', {openid: this.userinfo.openId})
      this.comments = comments.list
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow () {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync('userinfo')
      console.log(userinfo)
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  }
}
</script>

<style>

</style>
