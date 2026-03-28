<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <TheNavbar />
    <div class="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Minha Biblioteca</h1>
      <p class="text-gray-500 mb-8 max-w-sm font-medium">Aqui você encontrará os livros que salvou para ouvir depois. Em breve disponível!</p>
      <NuxtLink to="/library" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
        Explorar Livros
      </NuxtLink>
    </div>
  </div>
</template>
