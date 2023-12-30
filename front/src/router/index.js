import { createRouter, createWebHistory } from 'vue-router';
import SnapshotDetail from '../components/SnapshotDetail.vue';

const routes = [
  {
    path: '/snapshot/:id',
    name: 'SnapshotDetail',
    component: SnapshotDetail,
    props: true
  },
  // ... 其他路由 ...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
