<template>
    <div class="code-executor">
      <h1>执行器测试</h1>
      <textarea v-model="code" placeholder="在这里输入代码..."></textarea>
      <div class="buttons">
        <button @click="executeCode">执行</button>
        <button @click="stopExecution" class="stop-button">停止</button>
      </div>
      <div class="snapshot-container">
        <div class="snapshot" v-for="(snapshot, index) in snapshots" :key="index">
          <img :src="snapshot" alt="快照" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onBeforeUnmount } from 'vue';
  
  export default defineComponent({
    setup() {
      const code = ref('');
      const snapshots = ref([]);
      let intervalId = null;
  
      function executeCode() {
        if (intervalId) {
          clearInterval(intervalId);
        }
        addSnapshot();
        intervalId = setInterval(addSnapshot, 2000);
      }
  
      function addSnapshot() {
        snapshots.value.push(new URL('@/assets/state.png', import.meta.url).href);
      }
  
      function stopExecution() {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null; // 清空 intervalId
        }
      }
  
      onBeforeUnmount(() => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      });
  
      return {
        code,
        snapshots,
        executeCode,
        stopExecution
      };
    }
  });
  </script>
  
<style>
  .code-executor {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .code-executor > textarea,
  .code-executor > button {
    width: 80%; /* 输入框和按钮宽度相同，占据父元素宽度的 80% */
    max-width: 500px; /* 设置一个最大宽度 */
    margin: 10px 0;
  }
  
  textarea {
    height: 20vh; /* 输入框高度根据视口高度变化 */
    min-height: 100px; /* 设置最小高度 */
  }
  
  .buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px;
  min-width: 80px; /* 设置按钮的最小宽度 */
}

.stop-button {
  min-width: 60px; /* 停止按钮的最小宽度小于执行按钮 */
}

  .snapshot-container {
    display: flex;
    flex-wrap: nowrap; /* 不换行，以便出现滚动条 */
    overflow-x: auto; /* 当内容宽度超过容器宽度时显示滚动条 */
    gap: 10px;
    padding: 10px;
    margin-top: 20px;
  }

  .snapshot {
    flex: 0 0 auto; /* 不允许快照缩放或收缩 */
  }

  .snapshot img {
    width: 100px; /* 快照图片的大小 */
    min-width: 100px; /* 确保图片不会被压缩 */
    height: auto; /* 保持图片比例 */
  }
</style>
  