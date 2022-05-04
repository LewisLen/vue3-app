# vue3.x

## setup执行时机

setup 钩子函数在 beforeCreate 之前执行，且 setup 中的 this 指向 undefined，接收(props,context)两个参数。 props 也是 proxy 响应式对象。

```vue
<script>
import { reactive } from "vue";
export default {
  props: ["testMsg"],
  setup(props,context) {
    console.log(props); // proxy 响应式对象
    console.log(context); // 包含 attrs、emit和slots的对象
    // attrs就相当于$attrs
    const obj = reactive({
      name: "Len",
    });
    // 向父组件传递参数
    context.emit("hello", obj.name);
    return {
      obj,
    };
  },
};
</script>
```

vue2父子组件通过 props 传递数据时，如果子组件不通过 props 接收参数，其实也可以通过`$attr`来接收，但是没法给数据做类型上的限制，同时，只有未被 props 接收的数据才会体现在 $attr 上。

在vue3 setup函数 的 context 参数中 attrs 就相当于 vue2 VueComponent中的`$attr`属性，slots 则对应着 $slots 属性。
