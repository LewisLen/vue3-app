<template>
  <div class="chat-box">
    <h3>随心聊天室</h3>
    <div class="chat-content">
      <p v-for="(item, index) in chatMsg" :key="index">
        <span>{{ item.user }}</span> 在 {{ item.msgDate }} 时说：<span
          class="chat-msg"
          >{{ item.msg }}</span
        >
      </p>
    </div>
    <div class="chat-input">
      <el-input
        v-model="chatContent"
        :rows="2"
        type="textarea"
        placeholder="请输入..."
      />
      <el-button type="primary" @click="sendMsg">发送</el-button>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import { onMounted, ref, reactive, toRefs } from "vue";
import { baseURL } from "../assets/js/constant";

export default {
  setup() {
    const socket = io(
      baseURL // 'ws://127.0.0.1:3030'
    );
    const chatContent = ref("");

    const data = reactive({
      chatMsg: [],
    });
    // toRefs为了能使reactive对象能够被结构
    const refData = toRefs(data);

    onMounted(() => {
      socket.on("connection", (socket) => {
        console.log("建立链接成功", socket.request);
      });
      socket.on("serve-send-msg", (res) => {
        data.chatMsg.push(res);
      });
      socket.on("hello", (res) => {
        console.log("#hello: ", res);
      });
      socket.on("disconnect", () => {
        console.log("断开连接");
      });
    });

    const sendMsg = () => {
      console.log(chatContent.value);
      socket.emit("client-send-msg", chatContent.value);
    };

    return {
      ...refData,
      chatContent,
      sendMsg,
    };
  },
};
</script>

<style>
.chat-box {
  width: 900px;
  margin: 0 auto;
}
.chat-content {
  padding: 10px;
  border: 1px solid #ccc;
  height: 300px;
  text-align: left;
  overflow: hidden;
  overflow-y: visible;
  margin-bottom: 10px;
}
.chat-msg {
  background-color: aliceblue;
  border-radius: 6px;
  padding: 6px;
}
.chat-input {
  display: flex;
}
</style>
