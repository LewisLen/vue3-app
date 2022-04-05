<template>
  <div class="form-content">
    <el-form>
      <el-form-item label="账号">
        <el-input v-model="userName" placeholder="请输入账号" maxlength="10" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="passWord"
          placeholder="请输入密码"
          type="password"
          maxlength="12"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="register">注册</el-button>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const currentInstance = getCurrentInstance();
    const { $http } = currentInstance.appContext.config.globalProperties;
    const router = useRouter();

    function register() {
      $http({
        url: "/users/register",
        method: "POST",
        headers: { isHideLoading: true },
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
        url: "/users/login",
        method: "POST",
        headers: { isHideLoading: true },
        data: {
          userName: data.userName,
          passWord: data.passWord,
        },
      })
        .then((res) => {
          data.userName = "";
          data.passWord = "";
          sessionStorage.setItem("__tokenInfo__", res.token || "");
          router.push({
            name: "About",
            params: { userName: res.userName },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function query() {
      $http({
        url: "/users/query",
        method: "GET",
        headers: { isHideLoading: true },
      }).then((res) => {
        if (res.userName) {
          ElMessage.success(`你好呀! ${res.userName}`);
        }
        console.log(res);
      });
    }

    const data = reactive({
      userName: "",
      passWord: "",
    });
    // toRefs为了能使reactive对象能够被结构
    const refData = toRefs(data);
    onMounted(() => {});

    return {
      ...refData,
      register,
      login,
      query,
    };
  },
};
</script>

<style>
.box {
  width: 100%;
  height: 100%;
}
.form-content {
  width: 400px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-200px, -150px);
}
</style>
