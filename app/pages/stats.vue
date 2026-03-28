<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <TheNavbar />
    <div class="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path></svg>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Estatísticas</h1>
      <p class="text-gray-500 mb-8 max-w-sm font-medium">Acompanhe seu tempo de leitura, aprendizados e metas diárias nesta página. Em breve disponível!</p>
      <NuxtLink to="/library" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
        Continuar Estudando
      </NuxtLink>
    </div>
  </div>
</template>
