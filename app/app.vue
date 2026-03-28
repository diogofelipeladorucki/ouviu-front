<template>
  <div :class="[route.path === '/' ? 'bg-white' : 'bg-gray-50', 'min-h-screen font-sans', userStore.user ? 'pb-20' : '']">
    <NuxtPage />
    
    <!-- Bottom Navigation -->
    <nav v-if="userStore.user && route.path !== '/login' && route.path !== '/subscribe'" 
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-10 py-4 flex justify-around items-center z-50 shadow-[0_-4px_15px_rgba(0,0,0,0.02)] backdrop-blur-md bg-white/90">
      
      <NuxtLink to="/library" class="relative flex flex-col items-center group">
        <svg class="nav-icon" :class="{ 'nav-icon-active': route.path === '/library' }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </NuxtLink>

      <NuxtLink to="/my-library" class="relative flex flex-col items-center group">
        <svg class="nav-icon" :class="{ 'nav-icon-active': route.path === '/my-library' }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
      </NuxtLink>

      <NuxtLink to="/stats" class="relative flex flex-col items-center group">
        <svg class="nav-icon" :class="{ 'nav-icon-active': route.path === '/stats' }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
const route = useRoute()
const userStore = useUserStore()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Ouviu` : 'Ouviu - Resumos de Livros';
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    }
  ],
  script: [
    {
      src: 'https://accounts.google.com/gsi/client',
      async: true,
      defer: true
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js',
      defer: true
    }
  ]
})
onMounted(() => {
  if (userStore.token) {
    userStore.fetchUser()
  }
})
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}

.nav-icon {
  width: 1.75rem;
  height: 1.75rem;
  color: #9ca3af; /* text-gray-400 */
  transition: all 0.3s ease;
}

.nav-icon:hover {
  color: #4b5563; /* text-gray-600 */
}

.nav-icon-active {
  color: #2563eb !important; /* blue-600 */
  transform: scale(1.25);
}

.nav-icon:active {
  transform: scale(0.9);
}
</style>
