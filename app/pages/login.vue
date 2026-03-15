<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-orange-50">
    <div class="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-12 border border-gray-100 relative overflow-hidden">
      <div class="relative text-center">
        <!-- Logo -->
        <div class="inline-flex items-center gap-2 mb-8 mt-4">
          <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <span class="text-white text-2xl font-bold">O</span>
          </div>
          <div class="text-left leading-none">
            <span class="text-2xl font-black text-gray-900 tracking-tighter uppercase">Ouviu</span>
            <span class="block text-[10px] font-bold text-blue-600 tracking-[0.2em]">RESUMOS</span>
          </div>
        </div>

        <h1 class="text-3xl font-black text-gray-900 mb-4 tracking-tight">Bem-vindo!</h1>
        <p class="text-gray-500 font-medium mb-8">Sua jornada de conhecimento começa aqui. Faça login para continuar.</p>

        <!-- Google Login Container -->
        <div class="flex flex-col items-center gap-6">
          <div id="google-login-btn"></div>
          
          <div class="w-full h-px bg-gray-100"></div>
        </div>

        <footer class="mt-8 pt-6 border-t border-gray-50">
          <p class="text-[11px] text-gray-400 font-medium">
            Ao entrar, você concorda com nossos 
            <a href="#" class="text-blue-600 font-bold hover:underline">Termos</a> e 
            <a href="#" class="text-blue-600 font-bold hover:underline">Privacidade</a>.
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore()
const config = useRuntimeConfig()

onMounted(() => {
  if (process.client) {
    const checkGoogle = setInterval(() => {
      if (window.google) {
        clearInterval(checkGoogle)
        initGoogleLogin()
      }
    }, 100)
  }
})

function initGoogleLogin() {
  window.google.accounts.id.initialize({
    client_id: config.public.googleClientId,
    callback: handleCredentialResponse
  })

  window.google.accounts.id.renderButton(
    document.getElementById('google-login-btn'),
    { 
      theme: 'outline', 
      size: 'large', 
      width: 320,
      text: 'signin_with',
      shape: 'pill'
    }
  )
}

async function handleCredentialResponse(response) {
  const result = await userStore.loginWithGoogle(response.credential)
  
  if (result.success) {
    return navigateTo('/', { replace: true })
  } else {
    alert('Erro ao fazer login com Google. Tente novamente.')
  }
}
</script>
