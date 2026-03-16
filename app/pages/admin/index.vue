<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div class="p-6 border-b border-gray-200 flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold">O</span>
        </div>
        <span class="text-xl font-black text-gray-900 tracking-tighter uppercase">Ouviu Admin</span>
      </div>
      
      <nav class="flex-1 p-4 space-y-2">
        <NuxtLink to="/library" class="flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-all font-bold text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Voltar à Biblioteca
        </NuxtLink>
        <div class="px-4 pt-6 pb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Gerenciamento</div>
        <a href="#" class="flex items-center gap-3 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl transition-all font-bold text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Novo Livro (IA)
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <header class="bg-white border-b border-gray-200 p-6">
        <div class="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gerador de Conteúdo IA</h1>
            <p class="text-sm text-gray-500 font-medium">Crie resumos completos em segundos usando Gemini AI.</p>
          </div>
        </div>
      </header>

      <div class="p-8 max-w-4xl mx-auto space-y-8">
        <!-- Input Section -->
        <section class="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">O que vamos resumir hoje?</label>
              <textarea 
                v-model="form.prompt"
                rows="4" 
                class="block w-full px-4 py-3 text-gray-900 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all font-medium" 
                placeholder="Ex: Crie um resumo do livro 'Pai Rico, Pai Pobre', focando nos 6 pilares da independência financeira..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Categoria</label>
                <select v-model="form.categoryId" class="block w-full px-4 py-3 bg-gray-50 border-none ring-1 ring-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium">
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Idioma de Saída</label>
                <select class="block w-full px-4 py-3 bg-gray-50 border-none ring-1 ring-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium">
                  <option>Português (Brasil)</option>
                  <option>Inglês (United States)</option>
                </select>
              </div>
            </div>

            <button 
              @click="generateContent"
              :disabled="loading"
              class="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3"
            >
              <template v-if="loading">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processando com IA...
              </template>
              <template v-else>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                GERAR RESUMO COMPLETO
              </template>
            </button>
          </div>
        </section>

        <!-- Preview Section -->
        <section v-if="summaryData" class="space-y-8 animate-fade-in">
          <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-8 border-b border-gray-100 flex items-start gap-6">
              <div class="w-32 aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                <img :src="summaryData.coverUrl" class="w-full h-full object-cover">
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <div>
                    <h2 class="text-2xl font-black text-gray-900 mb-1">{{ summaryData.title }}</h2>
                    <p class="text-blue-600 font-bold text-sm tracking-wide uppercase">{{ summaryData.categoryName }}</p>
                  </div>
                  <NuxtLink to="/library" class="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all flex items-center gap-2">
                    VER NA BIBLIOTECA
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </NuxtLink>
                </div>
                <p class="mt-4 text-gray-600 font-medium leading-relaxed italic border-l-4 border-blue-200 pl-4">"{{ summaryData.description }}"</p>
              </div>
            </div>
            <div class="p-8 bg-gray-50/50">
              <h3 class="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">Texto do Resumo</h3>
              <div class="prose prose-blue max-w-none text-gray-800 font-medium whitespace-pre-wrap leading-relaxed">
                {{ summaryData.fullText }}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios'
const config = useRuntimeConfig()

const loading = ref(false)
const categories = ref([])
const form = ref({
  prompt: '',
  categoryId: null
})
const summaryData = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get(`${config.public.apiUrl}/api/books/categories`)
    categories.value = res.data
    if (categories.value.length > 0) form.value.categoryId = categories.value[0].id
  } catch (error) {
    console.error('Error loading categories')
  }
})

const generateContent = async () => {
  if (!form.value.prompt) return alert('Por favor, insira um prompt.')
  
  loading.value = true
  summaryData.value = null
  
  try {
    const res = await axios.post(`${config.public.apiUrl}/api/ai/generate-summary`, {
      prompt: form.value.prompt,
      categoryId: form.value.categoryId
    })
    summaryData.value = res.data
    // Alerta de sucesso imediato já que já foi salvo
    alert('Livro gerado e salvo com sucesso na biblioteca!')
  } catch (error) {
    console.error('Error generating content:', error)
    alert('Erro ao gerar conteúdo. Verifique o console.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
