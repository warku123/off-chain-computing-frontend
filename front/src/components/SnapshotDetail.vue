<template>
    <div>
      <h1>快照详情</h1>
      <p>快照 ID: {{ id }}</p>
      <!-- 显示其他信息 -->
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    // 这里可以根据传递的 id 加载详细信息
  };
  </script>