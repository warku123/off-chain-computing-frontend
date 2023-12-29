<template>
    <div class="code-executor">
      <h1>执行器测试</h1>
      <textarea v-model="code" placeholder="在这里输入代码..."></textarea>
      <button @click="executeCode">执行</button>
      <div class="snapshots">
        <img v-for="(snapshot, index) in snapshots" :key="index" :src="snapshot" alt="快照" />
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        code: '', // 用于存储输入的代码
        snapshots: [] // 存储快照图片的数组
      };
    },
    methods: {
      executeCode() {
        // 添加快照
        this.snapshots.push(require('@/assets/state.png')); // 替换为实际快照图片的路径
  
        // 每隔2秒添加一个新的快照
        setInterval(() => {
          this.snapshots.push(require('@/assets/state.png')); // 替换为实际快照图片的路径
        }, 2000);
      }
    }
  };
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
  
  button {
    height: 40px; /* 按钮高度固定 */
  }

  .snapshots img {
  width: 100px; /* 或者任何您希望的大小 */
  margin: 10px;
  }
</style>
  