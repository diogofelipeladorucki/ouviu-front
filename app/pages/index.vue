<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <header class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Ouça o melhor dos livros em minutos.
        </h1>
        <p class="mt-8 text-lg font-medium text-gray-500 sm:text-xl/8">
          Resumos inteligentes em áudio e texto para quem não tem tempo a perder. Foco total na leitura e aprendizado contínuo.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NuxtLink to="/subscribe" class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Começar Agora - 7 Dias Grátis
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Features -->
    <div class="py-24 sm:py-32 bg-gray-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base/7 font-semibold text-blue-600">Aprenda Rápido</h2>
          <p class="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Tudo o que você precisa para evoluir</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div class="relative pl-16">
              <dt class="text-base/7 font-semibold text-gray-900">Transcrição Completa</dt>
              <dd class="mt-2 text-base/7 text-gray-600">Leia junto com o áudio para fixar melhor o conteúdo.</dd>
            </div>
            <div class="relative pl-16">
              <dt class="text-base/7 font-semibold text-gray-900">Sincronização</dt>
              <dd class="mt-2 text-base/7 text-gray-600">Marque de onde parou e retome em qualquer dispositivo.</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
