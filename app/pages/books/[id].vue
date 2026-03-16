<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <nav class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <NuxtLink to="/library" class="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all font-bold group">
        <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Biblioteca
      </NuxtLink>
      
      <div v-if="book" class="text-center">
        <h1 class="text-sm font-black text-gray-900 uppercase tracking-widest line-clamp-1 gap-2">{{ book.title }}</h1>
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
          <h2 class="text-4xl font-black text-gray-900 tracking-tight mb-4 line-clamp-2">{{ book.title }}</h2>
          <p class="text-lg text-gray-500 font-medium italic mb-6 leading-relaxed">"{{ book.description }}"</p>
          
          <!-- Audio Player Block -->
          <div class="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-200">
            <!-- Time Markers -->
            <div class="flex justify-between text-[11px] font-black text-blue-200 uppercase tracking-widest mb-4 px-2">
              <span class="bg-blue-700/50 px-2 py-0.5 rounded-md">{{ formatTime(currentTime) }}</span>
              <span class="bg-blue-700/50 px-2 py-0.5 rounded-md">{{ formatTime(duration) }}</span>
            </div>

            <!-- Seek Bar -->
            <div class="relative group h-6 flex items-center mb-8 cursor-pointer" @mousedown="startDragging" @touchstart.passive="startDragging">
              <div class="h-1.5 w-full bg-blue-500/50 rounded-full overflow-hidden">
                <div class="h-full bg-white transition-all duration-75" :style="{ width: progress + '%' }"></div>
              </div>
              <!-- Handle -->
              <div class="absolute w-4 h-4 bg-white rounded-full shadow-lg border-2 border-blue-600 transition-transform group-hover:scale-125" :style="{ left: `calc(${progress}% - 8px)` }"></div>
              <!-- Invisible Target -->
              <input 
                type="range" 
                class="absolute inset-0 opacity-0 cursor-pointer w-full" 
                min="0" 
                :max="duration" 
                step="0.1" 
                v-model="currentTime"
                @input="seek"
              >
            </div>

            <!-- Controls -->
            <div class="flex items-center justify-center gap-10">
              <button @click="skip(-5)" class="text-blue-200 hover:text-white transition-colors group">
                <svg class="w-8 h-8 group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"></path>
                </svg>
                <p class="text-[9px] font-black mt-1">5S</p>
              </button>

              <button @click="togglePlay" class="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 hover:scale-105 transition-all active:scale-95 shadow-2xl">
                <svg v-if="!playing" class="w-10 h-10 ml-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M4.018 14L14.41 10 4.018 6z"></path></svg>
                <svg v-else class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4h4v12H4zM12 4h4v12h-4z"></path></svg>
              </button>

              <button @click="skip(10)" class="text-blue-200 hover:text-white transition-colors group">
                <svg class="w-8 h-8 group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 005 8v8a1 1 0 001.6.8l5.334-4zM19.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"></path>
                </svg>
                <p class="text-[9px] font-black mt-1">10S</p>
              </button>
            </div>

            <audio ref="audioRef" :src="book.audioSummaryUrl" @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata" @ended="playing = false"></audio>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-12 shadow-sm mb-20">
        <h3 class="text-xs font-black text-gray-400 mb-8 uppercase tracking-widest border-b border-gray-50 pb-4 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          Resumo em Texto
        </h3>
        <div class="prose prose-blue max-w-none">
          <div class="text-gray-800 font-medium markdown-content" v-html="renderedMarkdown"></div>
        </div>
      </div>
    </main>

    <!-- Loading State -->
    <div v-else class="flex-1 flex items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Carregando livro...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { marked } from 'marked'

const route = useRoute()
const config = useRuntimeConfig()

const book = ref(null)
const playing = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const audioRef = ref(null)
const isDragging = ref(false)

const renderedMarkdown = computed(() => {
  if (!book.value?.fullText) return ''
  return marked(book.value.fullText)
})

onMounted(async () => {
  try {
    const res = await axios.get(`${config.public.apiUrl}/api/books/${route.params.id}`)
    book.value = res.data
  } catch (error) {
    console.error('Error loading book:', error)
  }
})

function togglePlay() {
  if (!audioRef.value) return
  if (playing.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  playing.value = !playing.value
}

function skip(seconds) {
  if (!audioRef.value) return
  audioRef.value.currentTime += seconds
}

function seek() {
  if (!audioRef.value) return
  audioRef.value.currentTime = currentTime.value
  updateProgress()
}

function onLoadedMetadata() {
  if (audioRef.value) {
    duration.value = audioRef.value.duration
  }
}

function onTimeUpdate() {
  if (!isDragging.value && audioRef.value) {
    currentTime.value = audioRef.value.currentTime
    updateProgress()
  }
}

function updateProgress() {
  if (duration.value > 0) {
    progress.value = (currentTime.value / duration.value) * 100
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00'
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)
  return `${min}:${sec.toString().padStart(2, '0')}`
}

// User Interaction Helpers
function startDragging() { isDragging.value = true }
function stopDragging() { isDragging.value = false }

// Global mouse events to handle range dragging smoothly
if (process.client) {
  window.addEventListener('mouseup', stopDragging)
  window.addEventListener('touchend', stopDragging)
}
</script>

<style scoped>
/* Typography improvements */
.prose div {
  font-family: 'Inter', sans-serif;
}

.markdown-content :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.125rem;
}

.markdown-content :deep(h1), 
.markdown-content :deep(h2), 
.markdown-content :deep(h3) {
  color: #111827;
  font-weight: 900;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.025em;
}

.markdown-content :deep(h2) { font-size: 1.5rem; }
.markdown-content :deep(h3) { font-size: 1.25rem; }

.markdown-content :deep(ul), 
.markdown-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 100%;
}
</style>
