<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Admin Header -->
    <header class="bg-dark text-white border-b border-gray-800 h-16 flex items-center px-6 shrink-0">
      <div class="flex items-center gap-4">
        <router-link to="/" class="flex items-center"><img src="/logo/ReadiumLogoBGTransparent.png" class="h-8 w-auto" alt="Readium" /></router-link>
        <div class="h-6 w-px bg-gray-700"></div>
        <span class="text-sm font-bold uppercase tracking-widest text-gray-400">Admin Control</span>
      </div>
      
      <div class="ml-auto flex items-center gap-6">
        <router-link to="/admin/dashboard" class="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Dashboard</router-link>
        <button @click="logout" class="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors">Logout</button>
      </div>
    </header>

    <div class="flex flex-grow overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6 shrink-0">
        <nav class="space-y-4">
          <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Management</div>
          
          <router-link 
            v-for="item in menuItems" 
            :key="item.path" 
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-none border border-transparent transition-all"
            :class="[ $route.path === item.path ? 'bg-dark text-white border-dark' : 'text-gray-600 hover:bg-gray-50 hover:border-gray-200' ]"
          >
            {{ item.name }}
          </router-link>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow overflow-y-auto p-8">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Books', path: '/admin/books' },
  { name: 'Authors', path: '/admin/authors' },
  { name: 'Categories', path: '/admin/categories' },
];

const logout = () => {
  localStorage.removeItem('admin_token');
  router.push('/admin/login');
};
</script>
