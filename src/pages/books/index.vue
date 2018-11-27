<template>
<div class="books">
    <TopSwiper :tops="tops"></TopSwiper>
    <Card :key="key" :book="item" v-for="(item, key) in books"></Card>
    <p class="text-footer" v-if="more">
      没有更多数据了
    </p>
</div>
</template>
<script>
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
import { get } from '@/util'
export default {

  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: {},
      page: 0,
      more: false,
      tops: ''
    }
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = false
      }
      wx.showNavigationBarLoading()
      const book = await get('/booklist', {page: this.page})
      if (book.list.length < 10 && this.page > 0) {
        this.more = true
      }
      if (init) {
        this.books = book.list
        wx.stopPullDownRefresh() // 停止下拉刷新
      } else {
        // 下拉刷新，不能直接覆盖books 而是累加
        this.books = this.books.concat(book.list) // 连接两个数组中
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/top')
      this.tops = tops.list
    }
  },
  onPullDownRefresh () { // 下拉刷新生命周期函数
    this.getList(true)
    this.getTop()
  },
  onReachBottom () {
    if (this.more) { // 上拉加载生命周期函数
      return true
    }
    this.page++
    this.getList(false)
  },
  mounted () {
    this.getList(true)
    this.getTop()
  }

}
</script>

<style lang="scss">

</style>
