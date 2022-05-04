<template>
  <div class="hello">
    {{ testMsg }}
    <button @click="sayFn">给父组件传递数据</button>
    <slot name="sss"></slot>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  props: ["testMsg"],
  // emits: ["hello"],
  setup(props, context) {
    console.log(props);
    console.log(context.slots);
    const obj = reactive({
      name: "Len",
    });
    const sayFn = () => {
      // emit事件向父组件传递数据
      context.emit("hello", obj.name);
    };
    return {
      obj,
      sayFn,
    };
  },
};
</script>

<style></style>
