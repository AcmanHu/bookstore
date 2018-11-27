<template>
  <div class="detail">
    <BookInfo :info="info"></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea
       v-model="commnet"
       class="textarea"
       :maxlength="100"
       placeholder="请输入图书评论短评"
      ></textarea>
      <div class="location">
        地理位置：
        <switch color="#EA5A49" :checked="location" @change="getGeo"/>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号：
        <switch color="#EA5A49" :checked="phone" @change="getPhone"/>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="text-footer">
      未登录或者已经评论过啦
    </div>
    <button open-type="share" class="btn">转发给好友</button>
  </div>
</template>

<script>
import { get, post, showModal } from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      bookid: '',
      info: '',
      commnet: '',
      location: '',
      phone: '',
      userinfo: {},
      comments: []
    }
  },
  computed: {
    showAdd () {
      // 没登陆
      if (!this.userinfo) {
        return false
      }
      // 评论页面里面查到有自己的openid
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  methods: {
    async addComment () {
      // 评论内容
      // 手机型号
      // 地理位置
      // 图书id
      // open_id
      if (!this.commnet) {
        showModal('失败', '你还没填写任何评论')
        return
      }
      const data = {
        bookid: this.bookid,
        comment: this.commnet,
        phone: this.phone,
        location: this.location,
        openid: this.userinfo.openId
      }
      // console.log(data)
      try {
        await post('/addcomment', data)
        this.commnet = ''
        this.getComments()
      } catch (error) {
        showModal('失败', error.msg)
      }
      console.log(data)
    },
    async getDetail () {
      const info = await get('/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
      // console.log(info)
    },
    async getComments () {
      const comments = await get('/commentlist', {bookid: this.bookid})
      // console.log(comments)
      this.comments = comments.list
    },
    getGeo (e) {
      const ak = 'CPLx2FifZKzGBrwu8yLmrE1lcgPb1Z5F'
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84',
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                // console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        // console.log(phoneInfo)
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang="scss">
  .detail{
    .comment{ 
      margin-top: 10px;
      .textarea{
        width: 730rpx;
        height: 200rpx;
        background: #eee;
        padding: 10rpx;
      }
      .location{
        margin-top: 10px;
      }
      .phone{
        margin-top: 10px;
        // padding: 5px 10px;
      }
     
    }
  }

</style>
