<template>
    <div class="code-executor">
      <h1>执行器测试</h1>
      <textarea v-model="code" placeholder="在这里输入代码..."></textarea>
      <button @click="executeCode">执行</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        code: '' // 用于存储输入的代码
      };
    },
    methods: {
      executeCode() {
        // 在这里添加执行代码的逻辑
        console.log("执行的代码：", this.code);
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
  </style>
  