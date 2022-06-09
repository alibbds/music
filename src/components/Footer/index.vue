<template>
  <div class="footer">
    <div class="myCount">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-QQ1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-weixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-github1"></use>
      </svg>
    </div>
    <hr />
    <p>感谢小伙伴们参观</p>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .myCount {
    display: flex;
    width: 600px;
    justify-content: space-around;
    .icon {
      font-size: 30px;
    }
  }
  hr {
    width: 80%;
    margin: 10px auto;
    height: 1px;
    border: none;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      cyan,
      rgba(0, 0, 0, 0)
    );
  }
  p{
      font-size: 14px;
      color: #999;
  }
}
</style>