<template>
  <div class="nodata">{{text}}</div>
</template>
<script>
export default {
  props: {
    text: [String, "暂时没有数据"]
  }
};
</script>
<style scoped lang="scss">
.nodata {
  width: 100%;
  height: 50px;
  color: #969799;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-top: 10px;
}
</style>