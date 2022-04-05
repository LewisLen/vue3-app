<template>
  <div class="about">
    <h2>{{ route.params.userName }}</h2>
    <el-button type="primary" @click="query">查询</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="电影名" prop="title" width="180" />
      <el-table-column label="评分" prop="rate" width="180" />
      <el-table-column label="简介" prop="url" />
      <el-table-column label="封面">
        <template #default="scope">
          <img :src="scope.row.cover" alt="封面" width="44" height="23" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="deleteMovie(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="编辑">
      <el-form :model="editData">
        <el-form-item label="电影名" :label-width="formLabelWidth">
          <el-input v-model="editData.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-input v-model="editData.rate" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editMovie()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const currentInstance = getCurrentInstance();
    const { $http } = currentInstance.appContext.config.globalProperties;
    const route = useRoute();

    const dialogFormVisible = ref(false);
    const formLabelWidth = "140px";

    function query() {
      $http({
        url: "/movies/query",
      }).then((res) => {
        data.tableData = res.data;
      });
    }

    function handleEdit(index, row) {
      dialogFormVisible.value = true;
      data.editData = row;
    }

    const editMovie = () => {
      const { title, rate, id } = data.editData || {};
      $http({
        url: "/movies/update",
        method: "POST",
        data: {
          id,
          title,
          rate,
        },
      }).then((res) => {
        console.log(res);
        dialogFormVisible.value = false;
        query();
      });
    };

    function deleteMovie(index, row) {
      const { id } = row || {};
      dialogFormVisible.value = false;
      $http({
        url: "/movies/delete",
        method: "POST",
        data: {
          id,
        },
      }).then((res) => {
        console.log(res);
        query();
      });
    }

    const data = reactive({
      tableData: [],
      editData: {},
    });
    const refData = toRefs(data);

    onMounted(() => {
      query();
      console.log(route.params);
    });
    return {
      ...refData,
      dialogFormVisible,
      formLabelWidth,
      query,
      deleteMovie,
      handleEdit,
      editMovie,
      route,
    };
  },
};
</script>
