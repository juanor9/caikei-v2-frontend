<script setup>
import UploadXML from "./components/UploadXML.vue";
import InvoiceList from "./components/InvoiceList.vue";

</script>

<template>
  <div>
    <h1>Bienvenido a Caikei</h1>
    <UploadXML />
    <InvoiceList />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
