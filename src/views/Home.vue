<template>
  <div class="box">
    <el-form>
      <el-form-item label="姓名">
        <el-input v-model="userName" placeholder="请设置姓名" maxlength="10" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="passWord"
          placeholder="请设置密码"
          type="password"
          maxlength="12"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
export default {
  setup() {
    const currentInstance = getCurrentInstance();
    const { $http } = currentInstance.appContext.config.globalProperties;

    function register() {
      $http({
        url: "http://192.168.1.100:3030/users/register",
        method: "POST",
        data: {
          userName: data.userName,
          passWord: data.passWord,
        },
      }).then((res) => {
        console.log(res);
      });
    }

    function login() {
      $http({
        url: "http://192.168.1.100:3030/users/login",
        method: "POST",
        data: {
          userName: data.userName,
          passWord: data.passWord,
        },
      }).then((res) => {
        console.log(res);
      });
    }

    const data = reactive({
      userName: "",
      passWord: "",
    });

    const refData = toRefs(data);
    onMounted(() => {});

    return {
      ...refData,
      register,
      login,
    };
  },
};
</script>

<style>
.box {
  width: 400px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-200px, -150px);
}
p {
  margin-top: 5px;
}
.box-input {
  height: 30px;
  border: 1px solid #ccc;
}
</style>
