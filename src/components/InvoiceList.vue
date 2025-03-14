<script setup>
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const GET_INVOICES = gql`
query {
  getAllInvoices {
    invoiceNumber
    total
    date
    status
  }
}
`;

const { result, loading, error } = useQuery(GET_INVOICES);

</script>

<template>
  <section class="invoice-container">
    <h2>Lista de Facturas</h2>

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="error">Error: {{ error.message }}</div>

    <table v-else class="invoice-table">
      <thead>
        <tr>
          <th>Número</th>
          <th>Total</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in result.getAllInvoices" :key="invoice.invoiceNumber">
          <td>{{ invoice.invoiceNumber }}</td>
          <td>${{ invoice.total ? Number(invoice.total).toFixed(0) : "0" }}</td>
          <td>{{ invoice.date }}</td>
          <td :class="getStatusClass(invoice.status)">{{ formatStatus(invoice.status) }}</td>
          <td>
            <router-link :to="`/invoice/${invoice.invoiceNumber}`">Ver Detalle</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
const getStatusClass = (status) => {
  switch (status) {
    case 'pending': return 'status-pending';
    case 'paid': return 'status-paid';
    case 'overdue': return 'status-overdue';
    default: return 'status-unknown';
  }
};

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
@use "../styles/invoices.scss";
</style>