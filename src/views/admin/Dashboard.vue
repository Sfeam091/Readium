<template>
  <AdminLayout>
    <div class="mb-10">
      <h2 class="text-3xl font-black text-dark uppercase tracking-tighter">Admin Dashboard</h2>
      <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Platform Overview</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="bg-white p-8 border border-gray-100 shadow-sm">
        <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Books</div>
        <div class="text-4xl font-black text-primary">{{ store.books.length }}</div>
        <router-link to="/admin/books" class="text-[10px] font-bold text-primary uppercase tracking-widest mt-4 block hover:underline">Manage Books &rarr;</router-link>
      </div>
      
      <div class="bg-white p-8 border border-gray-100 shadow-sm">
        <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Authors</div>
        <div class="text-4xl font-black text-dark">{{ store.authors.length }}</div>
        <router-link to="/admin/authors" class="text-[10px] font-bold text-primary uppercase tracking-widest mt-4 block hover:underline">Manage Authors &rarr;</router-link>
      </div>

      <div class="bg-white p-8 border border-gray-100 shadow-sm">
        <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Categories</div>
        <div class="text-4xl font-black text-dark">{{ store.categories.length }}</div>
        <router-link to="/admin/categories" class="text-[10px] font-bold text-primary uppercase tracking-widest mt-4 block hover:underline">Manage Categories &rarr;</router-link>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-dark p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
      <div>
        <h3 class="text-xl font-bold uppercase tracking-tight mb-2">Quick Deployment</h3>
        <p class="text-sm text-gray-400 max-w-md">After making changes, remember to commit the JSON files and push to GitHub to trigger a Netlify rebuild.</p>
      </div>
      <div class="flex gap-4 w-full md:w-auto">
        <router-link to="/admin/books" class="bg-primary text-white border border-primary px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-transparent transition-all text-center flex-grow md:flex-grow-0">
          Add New Book
        </router-link>
        <router-link to="/admin/authors" class="bg-transparent text-white border border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-dark transition-all text-center flex-grow md:flex-grow-0">
          Manage Authors
        </router-link>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../components/admin/AdminLayout.vue';
import { store } from '../../store/books';
</script>
