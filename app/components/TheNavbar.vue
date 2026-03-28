<template>
  <nav class="bg-white border-b border-gray-200 px-4 py-2.5 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      
      <!-- Left side: Back button (if in book mode) or Logo (if in default mode) -->
      <div class="flex items-center gap-4 min-w-[120px]">
        <NuxtLink v-if="mode === 'book'" to="/library" class="p-2 text-gray-500 hover:text-blue-600 transition-all font-bold group">
          <svg class="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </NuxtLink>
        
        <div v-if="mode === 'default'" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">O</span>
          </div>
          <span class="text-xl font-black text-gray-900 tracking-tighter uppercase">Ouviu</span>
        </div>
      </div>

      <!-- Center Logo (only in book mode) -->
      <div v-if="mode === 'book'" class="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold">O</span>
        </div>
        <span class="text-xl font-black text-gray-900 tracking-tighter uppercase">Ouviu</span>
      </div>

      <!-- Right side: User Info / Logout or empty spacer -->
      <div class="flex items-center gap-4 min-w-[120px] justify-end">
        <div v-if="userStore.user" class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-xs font-bold text-gray-900">{{ userStore.user.name }}</p>
            <p class="text-[10px] text-blue-600 font-bold uppercase">{{ userStore.user.plan }}</p>
          </div>
          <NuxtLink v-if="userStore.user.isAdmin" to="/admin" class="p-2 text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 rounded-lg" title="Acessar Admin">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </NuxtLink>
          <img :src="userStore.user.avatar" class="w-8 h-8 rounded-full border border-gray-200" alt="avatar">
          <button @click="handleLogout" class="text-gray-400 hover:text-red-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
        <div v-else-if="mode === 'book'" class="w-10"></div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: 'default' // 'default' or 'book'
  }
})

const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
  navigateTo('/login')
}
</script>
