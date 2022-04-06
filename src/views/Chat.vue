<template>
  <div class="chat-box">
    <h3>随心聊天室</h3>
    <div class="chat-content">
      <p v-for="(item, index) in chatMsg" :key="index">
        {{ item.user }}在{{ item.msgDate }}时说：{{ item.msg }}
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

<style></style>
