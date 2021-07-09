<template>
  <div class="list">
    <p>当前页:列表页</p>
    <a @click="jumpSearch()">go搜索页</a>
    <ul>
      <li v-for="item in list" :key="item.name">
        <p>城市: {{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch("getList");
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
  },
  methods: {
    jumpSearch() {
      this.$router.push({
        path: "search",
      });
    },
  },
  metaInfo: {
    title: "列表页",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
};
</script>
