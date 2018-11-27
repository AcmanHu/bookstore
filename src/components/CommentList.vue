<template>
    <div class="commentlist">
        <div class="title" v-if="comments.length">
            评论
        </div>
        <div class="comment"
            :key="key"
            v-for="(item,key) in comments"
            @click="handleClick(item)"
            >
            <div class="user">
                <div class="inline">
                    <img :src="item.image"
                        class="avatar"
                        mode="aspectFit"
                    >
                    {{item.title}}
                    
                </div>
                <div class="right">
                    {{item.location||"未知地点"}}
                    <span class="text-primary">
                        --
                    </span>
                    {{item.phone||"未知型号"}}
                </div>
            </div>
            <div class="content">
                {{item.comment}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['comments', 'type'],
  data () {

  },
  methods: {
    handleClick (item) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + item.bookid
        })
      }
    }
  }
}
</script>

<style lang="scss">
    .commentlist{
        background: #eee;
        font-size: 14px;
        .title{
            height: 20px;
            line-height: 20px;
            padding: 10px 0; 
            padding-left: 10px;
        }
        .comment{
            background: white;
            margin-bottom: 10px;
            padding: 5px 20px;
        }
        .user{
            .inline{
                display: inline;
                .avatar{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
        }
        .content{
            margin: 10px 0;

        }   
    }
</style>
