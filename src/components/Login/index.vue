<template>
  <el-dialog
    title="请登录"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    center
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="phone">
        <el-input
          v-model="form.phone"
          autocomplete="off"
          placeholder="请输入手机号"
          style="margin: 20px 0"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="form.code"
          autocomplete="off"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button @click="getCode">获取验证码</el-button>
      <el-button type="primary" @click="loginByCode">登 录</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      form: {
        phone: "",
        code: "",
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", tigger: blur }],
        code: [{ required: true, message: "请输入验证码", tigger: blur }],
      },
      buttonType: "primary",
    };
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin,
      dialogVisible: (state) => state.user.dialogVisible,
    }),
  },
  methods: {
    /* async loginByPassword() {
      try {
        await this.$store.dispatch("userLoginByPassword", {
          phone: this.phone,
          password: this.password,
        });
        this.$router.push("/home");
      } catch (error) {
        alert(error);
      }
    }, */
    //验证码登录
    loginByCode() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            await this.$store.dispatch("user/userLoginByCode", {
              phone: this.form.phone,
              captcha: this.form.code,
            });
            this.$store.commit("user/DIALOGVISIBLE", false);
            this.$router.push("/home");
          } catch (error) {
            this.$message.error(error);
          }
        } else {
          this.$message.info("信息填写不完整！");
        }
      });
    },
    //获取验证码
    async getCode() {
      if(this.form.phone.length!==0){
         try {
            await this.$store.dispatch("user/getCode", this.form.phone);
            this.$message.success("验证码已发送！");
          } catch (error) {
            this.$message.error(error);
          }
      }else{
        this.$message.info('请填写手机号！')
      }
    },
    handleClose(done) {
      this.$store.commit("user/DIALOGVISIBLE", false);
    },
  },
};
</script>

<style scoped>
.el-dialog {
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
  left: 35%;
  min-width: 300px;
}
.dialog-footer {
  width: 100%;
}
</style>