<template>
  <div>
    <h2>你来到了一片荒漠！{{ countTime }}s钟之后将回到首页</h2>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const countTime = ref(3);
    onMounted(() => {
      let timer = setInterval(() => {
        countTime.value--;
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        router.push({ name: "Home" });
      }, 3000);
    });
    return {
      countTime,
    };
  },
};
</script>
