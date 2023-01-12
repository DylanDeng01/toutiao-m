<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    >
      <van-icon
        name="cross"
        slot="left"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form
      class="form-container"
      ref="loginForm"
      @submit="onSubmit"
    >
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i
          slot="left-icon"
          class="toutiao toutiao-shouji"
        ></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i
          slot="left-icon"
          class="toutiao toutiao-yanzhengma"
        ></i>
        <template #button>
          <!-- 倒计时按钮 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="60*1000"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            size="small"
            round
            type="default"
            class="send-sms-btn"
            native-type="button"
            @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button
          block
          type="info"
          native-type="submit"
          class="login-btn"
        >登录</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^[1][3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user
      // 2.表单校验
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 防止点击穿透
        message: '登录中'
      })

      // 3.提交表单，请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUer', data.data)
        this.$toast.success({
          message: '登录成功'
        })
        // 登录成功，跳转回之前的页面,后续优化
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('用户名或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
        console.log(err)
      }
    },

    // 获取验证码
    async onSendSms() {
      try {
        // 1.验证手机号(验证表单，支持传入 name 来验证单个或部分表单项,返回Promise)
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log(err, '验证失败')
      }
      // 2.验证通过，显示倒计时按钮
      this.isCountDownShow = true

      // 3.发请求获取验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast(err, '请求太频繁了，请稍后再试')
        } else {
          this.$toast(err, '发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .form-container {
    .toutiao {
      font-size: 37px;
    }

    .send-sms-btn {
      width: 152px;
      height: 46px;
      padding: 7px;
      line-height: 46px;
      background-color: #ededed;
      color: #666;
      font-size: 22px;
    }

    .login-btn-wrap {
      padding: 53px 33px;

      .login-btn {
        background-color: #6db4fb;
        border: none;
      }
    }
  }
}
</style>
