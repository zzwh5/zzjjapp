<template>
  <div class="login">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back">
        <!-- <img src="@/assets/back.png" alt /> -->
      </div>
      <div class="head_text">登录</div>
      <div class="head_add">
        <!-- <img src="@/assets/add.png" alt /> -->
      </div>
    </div>
    <!-- 登录表单 -->
    <div class="info">
      <van-form ref="Form" @submit="onSubmit">
        <div class="info_item">
          <van-field
            v-model="username"
            :name="username"
            label="用户名"
            placeholder="请输入组织名称"
            required
            :rules="[{ required: true }]"
          />
          <!-- 占位 -->
          <span></span>
        </div>
      </van-form>
      <div class="submit">
        <van-button
          :loading="isLoading"
          text="登录"
          type="info"
          size="large"
          loading-text="加载中..."
          @click.native="onsubmit"
        />
      </div>
    </div>
  </div>
</template>
<script>
// 登录接口
import { login } from "@/api/common";
// 提示框
import { Notify } from "vant";
export default {
  data() {
    return {
      // 是否正在登录
      isLoading: false,
      // 用户名
      username: "",
      // 登陆完成之后前往的页面
      redirect: undefined
    };
  },
  methods: {
    // 点击提交
    onsubmit() {
      this.$refs.Form.submit();
    },
    // 表单提交
    onSubmit() {
      // console.log("tijiao");

      login({ name: this.username.trim() }).then(res => {
        console.log(res);
        if (res.code != 200) {
          Notify({ type: "warning", message: "登录失败" });
          return;
        }
        const id = res.ret.id;
        const name = res.ret.name;
        sessionStorage.setItem("orgId", id);
        sessionStorage.setItem("name", name);
        this.$router.push({ path: this.redirect || "/" });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 44px;
    background: #f5f5f5;
    box-shadow: 0px 3px 9px 0px #e1e1e1;
    justify-content: space-between;
    padding: 0 13px;
    box-sizing: border-box;
    .head_back {
      display: flex;
      align-items: center;
      img {
        width: 19px;
        height: 17px;
      }
    }
    .head_text {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 31px;
    }
    .head_add {
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 18px;
      }
    }
  }
  .info {
    padding-top: 3%;
    .info_item {
      position: relative;
      /deep/.van-cell {
        line-height: 27px;
        position: relative;
        &:after {
          border-bottom: 2px solid #eeeeee;
        }
        .van-cell__value {
          .van-field__body {
            .van-field__control {
              width: 92%;
            }
          }
        }
      }
      img {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 17px;
      }
    }
  }
  .submit {
    width: 100%;
    box-sizing: border-box;
    padding: 0 6%;
    padding-top: 2%;
    display: flex;
    align-content: center;
    justify-content: flex-end;
  }
}
</style>