<template>
  <div class="my-container">
    <!-- 已登录界面 -->
    <div
      v-if="user"
      class="header user-info"
    >
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            fit="cover"
            round
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button
            size="mini"
            round
          >编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats  ">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录界面 -->
    <div
      v-else
      class="header un-login"
    >
      <div
        class="login-btn"
        @click="$router.push('/login')"
      >
        <img
          class="img"
          src="@/assets/mobile.png"
        >
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid
      class="grid-nav"
      :column-num="2"
      clickable
    >
      <van-grid-item>
        <i
          slot="icon"
          class="toutiao toutiao-shoucang"
        ></i><span
          slot="text"
          class="text"
        >收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i
          slot="icon"
          class="toutiao toutiao-lishi"
        ></i><span
          slot="text"
          class="text"
        >历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell
      title="消息通知"
      is-link
    />
    <van-cell
      title="小智同学"
      class="mb-9"
      is-link
    />
    <van-cell
      v-if="user"
      title="退出登录"
      class="logout-cell"
      clickable
      @click="onLogout"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  data() {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  created() {
    // 如果用户登录了，则请求加载用户数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 获取用户信息
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取用户信息失败，请稍后重试！')
      }
    },
    // 点击退出按钮
    onLogout() {
      this.$dialog
        .confirm({
          title: '退出登录'
        })
        .then(() => {
          // 退出登录，清除登录状态（调用vuex的setUser方法，清除token）
          this.$store.commit('setUer', null)
        })
        .catch(() => {
          console.log('取消执行这里')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  height: 100vh;
  background-color: #efefef;
  .header {
    height: 361px;
    background: pink;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  // 未登录
  .un-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  // 已登录
  .user-info {
    .base-info {
      height: 231px;
      display: flex;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 3px solid #fff;
        }

        .name {
          font-size: 30px;
        }
      }
    }
    .data-stats {
      height: 130px;
      display: flex;
      .data-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    height: 141px;
    margin-bottom: 20px;
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
  .mb-9 {
    margin: 5px 0 10px;
  }
  .logout-cell {
    text-align: center;
    color: red;
    background-color: #fff;
  }
}
</style>
