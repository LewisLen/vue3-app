<template>
  <div class="box">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const currentInstance = getCurrentInstance();
    const { $http } = currentInstance.appContext.config.globalProperties;
    const router = useRouter();

    function query() {
      $http({
        url: "/users/query",
        method: "GET",
        headers: { isHideLoading: true },
      })
        .then((res) => {
          if (!res.userName) {
            setTimeout(() => {
              router.push({
                name: "Login",
              });
            }, 3000);
          } else {
            ElMessage.success(`Hello,${res.userName}`);
          }
        })
        .catch((err) => {
          ElMessage.warning("会话已过期，请重新登录");
          console.log(err);
          setTimeout(() => {
            router.push({
              name: "Login",
            });
          }, 3000);
        });
    }

    const refData = reactive({
      userName: "",
      passWord: "",
    });

    onMounted(() => {
      query();
    });

    return {
      ...refData,
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
