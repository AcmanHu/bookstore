<script>
import { get } from './util'
import qcloud from 'wafer2-client-sdk'
import config from './config'

export default {
  async created () {
    qcloud.setLoginUrl(config.loginUrl)
    // qcloud.login({
    //     success: function (userInfo) {
    //         console.log('登录成功', userInfo);
    //     },
    //     fail: function (err) {
    //         console.log('登录失败', err);
    //     }
    // })
    const res = await get('/demo')
    console.log(res)

    // wx.request({
    //   url: config.host+'/demo', //仅为示例，并非真实的接口地址
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     console.log(res.data)
    //   }
    // })
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom: 10px;
  color: #EA5A49;
}
.page-title{
  padding-left: 20px;
  background: #eee;
  line-height: 40px;
  font-size: 14px;
}
.right{
  float: right;
}
.text-primary{
  color: #EA5A49;
}
  .btn{
    color: white;
    background: #EA5A49;
    margin-bottom: 10px;
    padding:0px 15px;
    border-radius: 2px;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    width: 100%;
  }
  .btn:active{
    background: #FA5A49;
  }
</style>
