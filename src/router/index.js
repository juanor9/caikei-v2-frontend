import { createRouter, createWebHistory } from 'vue-router';
import InvoiceList from '../components/InvoiceList.vue';
import InvoiceDetail from '../components/InvoiceDetail.vue';


const routes = [
  { path: '/', component: InvoiceList },
  { path: '/invoice/:invoiceNumber', component: InvoiceDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
