<template>
    <div>
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
  textarea {
      width: 50%; /* 占据界面的一半 */
      height: 200px; /* 适当的高度 */
      margin: 10px;
  }
  
  button {
      display: block;
      margin: 10px;
  }
  </style>
  