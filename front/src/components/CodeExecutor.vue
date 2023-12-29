<template>
    <div class="code-executor">
      <h1>执行器测试</h1>
      <textarea v-model="code" placeholder="在这里输入代码..."></textarea>
      <button @click="executeCode">执行</button>
      <div class="snapshot-container">
        <div class="snapshot" v-for="(snapshot, index) in snapshots" :key="index">
          <img :src="snapshot" alt="快照" />
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        code: '', // 用于存储输入的代码
        snapshots: [], // 存储快照图片的数组
        intervalId: null // 存储 setInterval 的 ID
      };
    },
    methods: {
      executeCode() {
        if (this.intervalId !== null) {
          // 如果已有计时器在运行，则清除它
          clearInterval(this.intervalId);
        }
  
        this.addSnapshot();
  
        // 每隔2秒添加一个新的快照
        this.intervalId = setInterval(this.addSnapshot, 2000);
      },
      addSnapshot() {
        // 添加新快照到数组，使用 require 来指定资源路径
        this.snapshots.push(require('@/assets/state.png'));
      }
    },
    beforeDestroy() {
      // 组件销毁前清除计时器
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
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

  .snapshot-container {
    display: flex;
    flex-wrap: nowrap; /* 不换行，以便出现滚动条 */
    overflow-x: auto; /* 当内容宽度超过容器宽度时显示滚动条 */
    gap: 10px;
    padding: 10px;
    margin-top: 20px;
  }

  .snapshot img {
    width: 100px; /* 快照图片的大小 */
    min-width: 100px; /* 确保图片不会被压缩 */
    height: auto; /* 保持图片比例 */
  }
</style>
  