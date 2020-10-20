<template>
  <div class="loading">
    <van-overlay :show="show" class="mark">
      <van-loading size="24px" vertical color="#ffffff" type="spinner"
        >{{ text }}...</van-loading
      >
    </van-overlay>
  </div>
</template>
<script>
export default {
  props: {
    show: [Boolean, false],
    text: [String, "加载中"]
  },
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
.loading {
  // width: 100v;
  // height: 100vh;
  .mark {
    /deep/.van-loading {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      .van-loading__text {
        color: #ffffff;
      }
    }
  }
}
</style>