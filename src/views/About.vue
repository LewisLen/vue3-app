<template>
  <div class="about">
    <h2>{{ route.params.userName }}</h2>
    <el-button type="primary" @click="query">查询</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="电影名" prop="title" width="180" />
      <el-table-column label="评分" prop="rate" width="180" />
      <el-table-column label="简介" prop="url" />
      <el-table-column label="封面" prop="cover" />
    </el-table>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const currentInstance = getCurrentInstance();
    const { $http } = currentInstance.appContext.config.globalProperties;
    const route = useRoute();

    function query() {
      $http({
        url: "http://localhost:3030/movies/query",
      }).then((res) => {
        data.tableData = res.data;
      });
    }

    const data = reactive({
      tableData: [],
    });
    const refData = toRefs(data);

    onMounted(() => {
      console.log(route.params);
    });
    return {
      ...refData,
      query,
      route,
    };
  },
};
</script>
