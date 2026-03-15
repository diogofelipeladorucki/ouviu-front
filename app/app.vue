<template>
  <div :class="[route.path === '/' ? 'bg-white' : 'bg-gray-50', 'min-h-screen font-sans']">
    <NuxtPage />
  </div>
</template>

<script setup>
const route = useRoute()

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
      src: 'https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js',
      defer: true
    }
  ]
})
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
