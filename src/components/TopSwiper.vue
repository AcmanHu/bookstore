<template>
    <div class="top">
        <swiper 
            :indicator-dots="true"
            indicator-color="#EA5A49"
            :autoplay="true" 
            :interval="6000" 
            :duration="1000"
            :circular="true"
        >
            <div :key="key" v-for="(item,key) in imgUrls">
                <swiper-item>
                    <img 
                    @click="bookDetail(img)"
                    mode="aspectFit"
                    :key="key1" 
                    v-for="(img,key1) in item"
                    :src="img.image" 
                    class="slide-image" 
                    />
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      // 如果通用  就用chunk函数  比如lodash的chunk方法
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  },
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  }
}
</script>

<style lang="scss">
 .top{
     margin-top: 5px;
     .slide-image{
         width: 33%;
         height: 250rpx;
     }
 }
</style>
