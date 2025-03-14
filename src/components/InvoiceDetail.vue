<script setup>
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const route = useRoute();

const GET_INVOICE_DETAILS = gql`
  query GetInvoice($invoiceNumber: String!) {
    getInvoice(invoiceNumber: $invoiceNumber) {
      invoiceNumber
      total
      date
      status
      items {
        description
        quantity
        price
      }
    }
  }
`;


const { result, loading, error } = useQuery(GET_INVOICE_DETAILS, {
  invoiceNumber: route.params.invoiceNumber
});

</script>

<template>
  <section class="invoice-detail-container">
    <h2>Detalle de la Factura</h2>

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="error">Error: {{ error.message }}</div>

    <div v-else>
      <h3>Factura: {{ result.getInvoice.invoiceNumber }}</h3>
      <p>Total: ${{ Number(result.getInvoice.total) }}</p>
      <p>Fecha: {{ result.getInvoice.date }}</p>
      <p>Estado: {{ formatStatus(result.getInvoice.status) }}</p>
      <h4>Productos:</h4>
      <table class="items-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in result.getInvoice.items" :key="item.description">
            <td>{{ item.description }}</td>
            <td>{{ Number(item.quantity) }}</td>
            <td>${{ Number(item.price) }}</td>
          </tr>
        </tbody>
      </table>

      <router-link to="/">Volver a la lista de facturas</router-link>
    </div>
  </section>
</template>

<script>
const formatStatus = (status) => {
  const statusMap = {
    "pending": "Pendiente",
    "paid": "Pagada",
    "overdue": "Vencida"
  };

  return statusMap[status] || "Desconocido";
};
</script>

<style lang="scss" scoped>
@use "../styles/invoiceDetail.scss";
</style>