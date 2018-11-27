<template>
    <div class="rate">
        <span>☆☆☆☆☆</span>
        <div class="hellow" :style="style">
            ★★★★★
        </div>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      defult: '0'
    }
  },
  computed: {
    style () {
      return `width:${this.value / 2}em`
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
    .rate{
        position: relative;
        display: inline-block;
        .hellow{
            position: absolute;
            display: inline-block;
            top: 0;
            left: 0;
            width: 1em;
            overflow: hidden;
        }
    }
</style>
