<template>
  <div class="py-24 px-6 lg:px-8 bg-white">
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="text-base/7 font-semibold text-primary-600">Planos e Preços</h2>
      <p class="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Escolha o plano ideal para você</p>
    </div>
    
    <div class="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
      <!-- Trial Plan -->
      <div class="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Trial</h3>
          <p class="mt-4 text-sm text-gray-600">Experimente grátis por uma semana.</p>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-bold tracking-tight text-gray-900">R$ 0</span>
          </p>
          <ul role="list" class="mt-8 space-y-3 text-sm text-gray-600">
            <li class="flex gap-x-3">7 dias grátis</li>
            <li class="flex gap-x-3">Sem cartão de crédito</li>
          </ul>
        </div>
        <NuxtLink :to="userStore.user ? '/library' : '/login'" class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold ring-1 ring-inset ring-primary-200 text-primary-600 hover:ring-primary-300">Começar Trial</NuxtLink>
      </div>

      <!-- Monthly Plan -->
      <div class="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 border-2 border-primary-600">
        <div>
          <h3 class="text-lg font-semibold text-primary-600">Mensal</h3>
          <p class="mt-4 text-sm text-gray-600">Acesso flexível mês a mês.</p>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-bold tracking-tight text-gray-900">R$ 29</span>
            <span class="text-sm font-semibold text-gray-600">/mês</span>
          </p>
          <ul role="list" class="mt-8 space-y-3 text-sm text-gray-600">
            <li class="flex gap-x-3">Acesso ilimitado</li>
            <li class="flex gap-x-3">Áudio e Texto</li>
          </ul>
        </div>
        <NuxtLink :to="userStore.user ? '/library' : '/login'" class="mt-8 block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white">Assinar Agora</NuxtLink>
      </div>

      <!-- Annual Plan -->
      <div class="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Anual</h3>
          <p class="mt-4 text-sm text-gray-600">Melhor custo-benefício.</p>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-bold tracking-tight text-gray-900">R$ 19</span>
            <span class="text-sm font-semibold text-gray-600">/mês*</span>
          </p>
          <p class="mt-1 text-xs text-gray-500">*Faturado anualmente (R$ 228)</p>
          <ul role="list" class="mt-8 space-y-3 text-sm text-gray-600">
            <li class="flex gap-x-3">Acesso ilimitado</li>
            <li class="flex gap-x-3">Economize 35%</li>
          </ul>
        </div>
        <NuxtLink :to="userStore.user ? '/library' : '/login'" class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold ring-1 ring-inset ring-primary-200 text-primary-600 hover:ring-primary-300">Assinar Plano Anual</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore()
</script>
