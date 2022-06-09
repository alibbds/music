<template>
  <div class="commentSide">
    <div class="gotoComment">
      <div class="total">
        <h3>评论</h3>
        <span>共{{ commentTotal }}条评论</span>
      </div>
      <div class="sendComment">
        <img :src="avaurl" alt="" />
        <el-input
          class="inputWord"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 5 }"
          placeholder="期待你的神评论......"
          v-model="word"
        >
        </el-input>
        <div class="sendButton">
          <button class="Button" @click="sendComment">发送</button>
          <span>限制字数：{{ limitiWord }}</span>
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="commentItem" v-for="item of comment" :key="item.commentId">
        <div class="mains">
          <img v-lazy="item.user.avatarUrl" alt="" />
          <div class="content">
            <span class="userName">{{ item.user.nickname }}</span>
            <p class="userText">{{ item.content }}</p>
            <p class="followText" v-if="item.beReplied.length !== 0">
              <span>{{ item.beReplied[0].user.nickname }}：</span
              >{{ item.beReplied[0].content }}
            </p>
            <p class="publishTime">
              <span>{{ item.timeStr }}</span>
            </p>
          </div>
        </div>
        <el-divider content-position="right"></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "CommentList",
  props:['comment','commentTotal'],
  data() {
    return {
      //即将发出的评论
      word: "",
      //用户头像
      avaurl: JSON.parse(window.localStorage.getItem("userInfo")).avatarUrl,
    };
  },
  computed: {
    limitiWord() {
      return 140 - this.word.length;
    },
  },
  methods: {
    sendComment: _.throttle(
      async function () {
        if (this.limitiWord === 140) {
          this.$message.info("内容不能为空");
        } else if (this.limitiWord < 0) {
          this.$message.info("字数超过限制");
        } else {
          try {
            let result = await this.$store.dispatch("mvDetail/sendComment", {
              id: this.$route.params.id,
              t: 1,
              type: 1,
              content: this.word,
            });
            this.getComments({
              limit: 20,
              offset: 0,
              id: this.$route.params.id,
            });
            this.$message.success(result + " 30秒冷却");
          } catch (error) {
            this.$message.info(error);
          }
        }
      },
      30000,
      { trailing: false }
    ),
  },
};
</script>

<style lang="less">
.commentSide {
  width: 700px;
  display: flex;
  flex-direction: column;
  margin-top:50px;
  .gotoComment {
    width: 100%;
    display: flex;
    flex-direction: column;
    .total {
      width: 100%;
      display: flex;
      justify-content: space-between;
      span{
        font-size: 14px;
        color: #999;
      }
    }
    .sendComment {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .inputWord {
        width: 630px;
      }
      .sendButton {
        width: 100%;
        margin-top: 5px;
        .Button {
          float: right;
          width: 40px;
          height: 30px;
          font-size: 14px;
          background-color: #1e90ff;
          border-radius: 2px 2px;
          border: none;
          color: white;
        }
        span {
          float: right;
          margin-right: 15px;
          line-height: 30px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .comments {
    width: 100%;
    .commentItem {
      margin-top: 0px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .mains {
        width: 100%;
        display: flex;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .content {
          display: flex;
          flex-direction: column;
          margin-left: 15px;
          width: 100%;
          .userText {
            font-size: 14px;
            margin-top: 15px;
            color: #333;
          }
          .followText {
            margin-top: 10px;
            font-size: 14px;
            display: block;
            background-color: #f0f0f0;
            padding: 8px 8px 8px 8px;
            border-radius: 5px 5px;
            color: #333;
            span {
              color: #1e90ff;
            }
          }
          .userName {
            font-size: 14px;
            color: #1e90ff;
          }
          .publishTime {
            width: 100%;
            margin-top: 5px;
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>