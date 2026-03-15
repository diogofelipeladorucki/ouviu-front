<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Gestão de Livros - IA</h1>
    
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <label for="prompt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prompt para Criação do Resumo</label>
      <textarea 
        id="prompt" 
        v-model="prompt"
        rows="4" 
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Ex: Crie um resumo de 15 minutos do livro 'O Homem Mais Rico da Babilônia'..."
      ></textarea>
      
      <button 
        @click="generateSummary"
        type="button" 
        class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Gerar Livro com Gemini AI
      </button>
    </div>

    <div v-if="loading" class="mt-8 text-center text-gray-600">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      <p class="mt-2">Gerando resumo, áudio e imagem... Aguarde...</p>
    </div>

    <div v-if="summaryData" class="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
      <h2 class="text-xl font-semibold text-green-800">Resultado da Geração</h2>
      <div class="mt-4">
        <p><strong>Título:</strong> {{ summaryData.title }}</p>
        <p class="mt-2 text-gray-700 italic"><strong>Teaser:</strong> {{ summaryData.teaser }}</p>
        <div class="mt-4">
          <p class="font-bold mb-2">Texto do Resumo:</p>
          <div class="text-sm text-gray-600 leading-relaxed bg-white p-4 rounded border border-gray-100">{{ summaryData.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const prompt = ref("Crie um resumo de 15 minutos do livro 'O Homem Mais Rico da Babilônia'");
const loading = ref(false);
const summaryData = ref(null);

const generateSummary = async () => {
  loading.value = true;
  summaryData.value = null;
  
  try {
    const response = await fetch('http://localhost:3001/api/ai/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.value })
    });
    
    summaryData.value = await response.json();
  } catch (error) {
    console.error('Erro ao gerar resumo:', error);
    alert('Erro ao conectar com a API. Verifique se o servidor está rodando em http://localhost:3001');
  } finally {
    loading.value = false;
  }
}
</script>
