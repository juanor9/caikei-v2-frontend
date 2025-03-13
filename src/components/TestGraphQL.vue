<script setup>
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const GET_INVOICES  = gql`
query {
    getAllInvoices {
      invoiceNumber
      total
      date
    }
  }
`;

const { result, loading, error } = useQuery(GET_INVOICES );
</script>

<template>
  <div>
    <h2>Lista de Facturas</h2>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else>
      <li v-for="invoice in result.getAllInvoices" :key="invoice.invoiceNumber">
        <strong>Factura:</strong> {{ invoice.invoiceNumber }} - 
        <strong>Total:</strong> ${{ invoice.total }} - 
        <strong>Fecha:</strong> {{ invoice.date }}
      </li>
    </ul>
  </div>
</template>
