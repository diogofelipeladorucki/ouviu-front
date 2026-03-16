<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <nav class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <NuxtLink to="/library" class="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all font-bold group">
        <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Biblioteca
      </NuxtLink>
      
      <div v-if="book" class="text-center">
        <h1 class="text-sm font-black text-gray-900 uppercase tracking-widest line-clamp-1">{{ book.title }}</h1>
        <p class="text-[10px] text-gray-400 font-bold uppercase">{{ book.author }}</p>
      </div>

      <div class="w-20"></div> <!-- Spacer for balance -->
    </nav>

    <main v-if="book" class="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12">
      <!-- Cover and Info -->
      <div class="flex flex-col md:flex-row gap-8 mb-16 items-center md:items-start text-center md:text-left">
        <div class="w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-blue-100 flex-shrink-0">
          <img :src="book.coverUrl" class="w-full h-full object-cover" :alt="book.title">
        </div>
        <div class="flex-1">
          <span class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-black rounded-lg uppercase tracking-wider mb-4 inline-block">
            {{ book.category?.name || 'Geral' }}
          </span>
          <h2 class="text-4xl font-black text-gray-900 tracking-tight mb-4">{{ book.title }}</h2>
          <p class="text-lg text-gray-500 font-medium italic mb-6 leading-relaxed">"{{ book.description }}"</p>
          
          <!-- Audio Player Block -->
          <div class="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
            <div class="flex items-center gap-6">
              <button @click="togglePlay" class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 hover:scale-105 transition-transform active:scale-95 shadow-lg">
                <svg v-if="!playing" class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4.018 14L14.41 10 4.018 6z"></path></svg>
                <svg v-else class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4h4v12H4zM12 4h4v12h-4z"></path></svg>
              </button>
              <div class="flex-1">
                <p class="text-xs font-black text-blue-100 uppercase tracking-widest mb-1">Ouvir Resumo</p>
                <div class="h-1.5 w-full bg-blue-500/50 rounded-full overflow-hidden mb-2">
                  <div class="h-full bg-white transition-all duration-300" :style="{ width: progress + '%' }"></div>
                </div>
                <div class="flex justify-between text-[10px] font-black text-blue-100 uppercase">
                  <span>{{ formatTime(currentTime) }}</span>
                  <span>{{ formatTime(book.durationInSeconds || 0) }}</span>
                </div>
              </div>
            </div>
            <audio ref="audioRef" :src="book.audioSummaryUrl" @timeupdate="updateProgress"></audio>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-12 shadow-sm">
        <h3 class="text-xs font-black text-gray-400 mb-8 uppercase tracking-widest border-b border-gray-50 pb-4">Resumo em Texto</h3>
        <div class="prose prose-blue max-w-none">
          <div class="text-gray-800 font-medium leading-[1.8] text-lg whitespace-pre-wrap">
            {{ book.fullText }}
          </div>
        </div>
      </div>
    </main>

    <!-- Loading State -->
    <div v-else class="flex-1 flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
const route = useRoute()
const config = useRuntimeConfig()

const book = ref(null)
const playing = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const audioRef = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get(`${config.public.apiUrl}/api/books/${route.params.id}`)
    book.value = res.data
  } catch (error) {
    console.error('Error loading book:', error)
  }
})

function togglePlay() {
  if (playing.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  playing.value = !playing.value
}

function updateProgress() {
  const audio = audioRef.value
  if (!audio) return
  progress.value = (audio.currentTime / audio.duration) * 100
  currentTime.value = audio.currentTime
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)
  return `${min}:${sec.toString().padStart(2, '0')}`
}
</script>

<style scoped>
/* Typography improvements */
.prose div {
  font-family: 'Inter', sans-serif;
}
</style>
