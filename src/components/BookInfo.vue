<template>
    <div class="bookinfo">
        <div class="thumb">
            <img class="back" 
            :src="info.image"
            mode="aspectFill"
            >
            <img class="img" 
            :src="info.image"
            mode="aspectFit"
            >
            <div class="info">
                <div class="title">
                    {{info.title}}
                </div>
                <div class="author">
                    {{info.author}}
                </div>
            </div>
        </div>
        <div class="detail">
            <img class="avatar" :src="userinfo.image" mode="aspectFit">
            {{userinfo.name}}
            <div class="right text-primary">
                {{info.rate}}分
                <Rate :value="info.rate"></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" :key="key" v-for="(item,key) in info.tags">{{item}}</div>
        </div>
        <div class="summary">
            <p :key="key" v-for="(item,key) in info.summary">{{item}}</p>
        </div>
    </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: ['info'],
  components: {
    Rate
  },
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  }

}
</script>

<style lang="scss">
    .bookinfo{
        .badge{
            display: inline-block;
            margin: 5px;
            padding: 5px;
            border-radius: 10px;
            border: 1px #EA5A49 solid;
            color: #EA5A49; 
        }
        .summary{
            margin-top: 15px;
            padding: 0 10px;
            p{
                text-indent: 2em;
                font-size: 14px;
            }
        }
        font-size: 14px;
        .right {
            float: right;
        }
        .detail{
            padding: 5px 10px;
            .avatar{
                width: 25px;
                height: 25px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
        .thumb{
            width: 750rpx;
            height: 500rpx;
            overflow: hidden;
            position: relative;
            .back{
                filter: blur(15px);
                width: 100%;
            }
            .img{
                position: absolute;
                width: 100%;
                height: 300rpx;
                left: 0;
                top: 30rpx;
            }
            .info{
                color: white;
                position: absolute;
                width: 100%;
                left: 0;
                top: 330rpx;
                text-align: center;
                .title{
                    font-size: 20px;
                }
                .author{
                    font-size: 14px;
                }
            }
        }
    }
</style>
