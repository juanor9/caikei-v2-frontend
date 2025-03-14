<script setup>
import { ref } from 'vue';

const file = ref(null);
const uploading = ref(false);
const uploadSuccess = ref(null);
const uploadError = ref(null);

const handleFileChange = (event) => {
  file.value = event.target.files[0];
  uploadSuccess.value = null;
  uploadError.value = null;
};

const uploadFile = async () => {
  if (!file.value) {
    uploadError.value = "Por favor, selecciona un archivo XML.";
    return;
  }

  uploading.value = true;
  uploadSuccess.value = null;
  uploadError.value = null;

  const formData = new FormData();
  formData.append("file", file.value);

  try {
    const response = await fetch(import.meta.env.VITE_FASTAPI_URL + "/api/upload/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al subir el archivo.");

    const data = await response.json();
    uploadSuccess.value = `Archivo ${data.filename} subido correctamente.`;
  } catch (error) {
    uploadError.value = "Hubo un problema al subir el archivo.";
  } finally {
    uploading.value = false;
  }
};
</script>

<template>
  <div class="upload-container">
    <h2>Subir Archivo XML</h2>
    <input type="file" accept=".xml" @change="handleFileChange" />
    <button @click="uploadFile" :disabled="uploading">
      {{ uploading ? "Subiendo..." : "Subir Archivo" }}
    </button>
    <p v-if="uploadSuccess" class="success">{{ uploadSuccess }}</p>
    <p v-if="uploadError" class="error">{{ uploadError }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/upload.scss";
</style>
