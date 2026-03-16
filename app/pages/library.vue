<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-200 px-4 py-2.5 flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold">O</span>
        </div>
        <span class="text-xl font-black text-gray-900 tracking-tighter uppercase">Ouviu</span>
      </div>
      
      <div class="flex items-center gap-4">
        <div v-if="userStore.user" class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-xs font-bold text-gray-900">{{ userStore.user.name }}</p>
            <p class="text-[10px] text-blue-600 font-bold uppercase">{{ userStore.user.plan }}</p>
          </div>
          <img :src="userStore.user.avatar" class="w-8 h-8 rounded-full border border-gray-200" alt="avatar">
          <button @click="handleLogout" class="text-gray-400 hover:text-red-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 py-12">
      <header class="mb-12">
        <h1 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Sua Biblioteca</h1>
        <p class="text-gray-500 font-medium">Explore os melhores resumos selecionados para você.</p>
      </header>

      <!-- Search & Filters -->
      <div class="flex flex-col md:flex-row gap-4 mb-12">
        <div class="relative flex-1">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input v-model="search" type="text" placeholder="Buscar por título ou autor..." class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <button 
            @click="selectedCategory = null"
            :class="[!selectedCategory ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200']"
            class="px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap"
          >
            Tudo
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="selectedCategory = cat.id"
            :class="[selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200']"
            class="px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Books Grid -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        <div v-for="i in 5" :key="i" class="animate-pulse">
          <div class="aspect-[3/4] bg-gray-200 rounded-2xl mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else-if="filteredBooks.length === 0" class="text-center py-20">
        <p class="text-gray-400 font-bold">Nenhum livro encontrado.</p>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        <div v-for="book in filteredBooks" :key="book.id" class="group cursor-pointer">
          <div class="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 bg-white border border-gray-100">
            <img :src="book.coverUrl || 'https://via.placeholder.com/300x400'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :alt="book.title">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <button class="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-lg">OUVIR RESUMO</button>
            </div>
          </div>
          <h3 class="font-bold text-gray-900 leading-tight mb-1 line-clamp-2 transition-colors group-hover:text-blue-600">{{ book.title }}</h3>
          <p class="text-xs text-gray-500 font-medium mb-2 opacity-80 group-hover:opacity-100">{{ book.author }}</p>
          <div class="flex items-center gap-2">
            <span v-if="book.category" class="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider">{{ book.category.name }}</span>
            <span v-if="book.content?.durationInSeconds" class="text-[10px] text-gray-400 font-bold uppercase">{{ Math.floor(book.content.durationInSeconds / 60) }} MIN</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios'
const userStore = useUserStore()
const config = useRuntimeConfig()

const books = ref([])
const categories = ref([])
const loading = ref(true)
const search = ref('')
const selectedCategory = ref(null)

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.value.toLowerCase()) || 
                          book.author.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || book.categoryId === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

onMounted(async () => {
  try {
    const [booksRes, catsRes] = await Promise.all([
      axios.get(`${config.public.apiUrl}/api/books`),
      axios.get(`${config.public.apiUrl}/api/books/categories`)
    ])
    books.value = booksRes.data
    categories.value = catsRes.data
  } catch (error) {
    console.error('Error loading library:', error)
  } finally {
    loading.value = false
  }
})

function handleLogout() {
  userStore.logout()
  navigateTo('/login')
}
</script>
