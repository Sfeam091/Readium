<template>
  <div class="min-h-screen bg-dark flex items-center justify-center p-6">
    <div class="max-w-md w-full bg-white p-10 border-t-4 border-primary shadow-2xl">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-black text-dark uppercase tracking-tighter mb-2">Readium</h1>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Admin Authentication</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Admin Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="Enter secure password"
            class="w-full border-2 border-gray-100 px-4 py-3 focus:border-primary outline-none transition-colors rounded-2xl"
            required
          >
        </div>

        <div v-if="error" class="text-red-500 text-xs font-bold uppercase tracking-wider text-center">
          {{ error }}
        </div>

        <button 
          type="submit" 
          class="w-full btn-primary py-4 font-bold uppercase tracking-[0.2em] text-sm"
        >
          Access Dashboard
        </button>
      </form>

      <div class="mt-8 pt-8 border-t border-gray-50 text-center">
        <router-link to="/" class="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-dark transition-colors">
          &larr; Back to Reader View
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = () => {
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  
  if (password.value === adminPassword) {
    localStorage.setItem('admin_token', 'authenticated_' + Date.now());
    router.push('/admin/dashboard');
  } else {
    error.value = 'Invalid admin credentials';
    password.value = '';
  }
};
</script>
