<template>
    <div class="code-executor">
      <h1>执行器测试</h1>
      <textarea v-model="code" placeholder="在这里输入代码..."></textarea>
      <div class="buttons">
        <button @click="executeCode">执行</button>
        <button @click="stopExecution" class="stop-button">停止</button>
      </div>
      <div class="snapshot-container">
        <div
        class="snapshot"
        v-for="(snapshot, index) in snapshots"
        :key="index"
        @mouseover="showSnapshotInfo(snapshot, index)"
        @mouseleave="clearSnapshotInfo"
        >
        <img :src="snapshot.url" alt="快照" />
        </div>
      </div>
      <div v-if="hoveredSnapshotInfo !== null" class="snapshot-info-display">
        <div>快照 ID: {{ hoveredSnapshotInfo.index }}</div>
        <div>任务 ID: {{ hoveredSnapshotInfo.taskId }}</div>
        <div>存储哈希: {{ hoveredSnapshotInfo.storageHash }}</div>
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
      const hoveredSnapshotInfo = ref(null);
  
      function executeCode() {
        // 清空快照数组
        snapshots.value = [];
        // 清除任何现有的计时器
        if (intervalId) {
          clearInterval(intervalId);
        }
        // 添加初始快照
        addSnapshot();
        // 设置新的计时器，每0.5秒添加快照
        intervalId = setInterval(addSnapshot, 500);
      }
  
      function addSnapshot() {
      // 示例数据
        const taskId = 'Task123'; // 示例任务 ID
        const storageHash = 'HashABC'; // 示例存储哈希
        const imageUrl = new URL('@/assets/state.png', import.meta.url).href;
        snapshots.value.push({ url: imageUrl, taskId, storageHash });
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
      
      function showSnapshotInfo(snapshot, index) {
        hoveredSnapshotInfo.value = { ...snapshot, index };
      }

      function clearSnapshotInfo() {
        hoveredSnapshotInfo.value = null;
      }

      return {
        code,
        snapshots,
        executeCode,
        stopExecution,
        hoveredSnapshotInfo,
        showSnapshotInfo,
        clearSnapshotInfo
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
    max-width: 100%;
  }

  .snapshot {
    flex: 0 0 auto; /* 不允许快照缩放或收缩 */
  }

  .snapshot img {
    width: 50px; /* 快照图片的大小 */
    height: auto; /* 保持图片比例 */
  }

  .snapshot-id-display {
    margin-top: 20px;
  }
</style>
  