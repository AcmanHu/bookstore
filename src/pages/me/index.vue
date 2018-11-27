<template>
    <div class="me">
      <div class="userinfo" @click="doLogin">
        <img :src="userinfo.avatarUrl" alt="">
        <p>{{userinfo.nickName}}</p>
      </div>
      <YearProgress></YearProgress>
      <button v-if="userinfo.openId" @click="scanBook" class="btn">添加图书</button>
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { showSuccess, showNone, post, showModal } from '@/util'
import YearProgress from '@/components/YearProgress'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/no_login.png',
        nickName: '点击登录'
      }
    }
  },
  mounted () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    // console.log(this.userinfo)
  },

  methods: {
    doLogin (e) {
      const session = qcloud.Session.get()
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log(res)
            showNone('你已经登陆过了,无需重复登陆')
          },
          fail: err => {
            console.error(err)
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            wx.setStorageSync('userinfo', res)
            this.userinfo = res
            showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
          }
        })
      }
    },
    async addBook (isbn) {
      console.log(isbn)
      const res = await post('/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      console.log(res)
      showModal('添加成功', `《${res.title}》添加成功`)
    },
    scanBook () {
      // let that = this
      wx.scanCode({
      // onlyFromCamera: true,
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }

          // console.log(res)
        }
      })
    }
  }

}
</script>

<style lang="scss">
  
  .me{
    padding: 0 30rpx;
    .userinfo{
      margin-top: 100rpx;
      text-align: center;
      img{
        width: 150rpx;
        height: 150rpx;
        margin: 20rpx;
        border-radius: 50%;
      }
    }
  }
</style>
