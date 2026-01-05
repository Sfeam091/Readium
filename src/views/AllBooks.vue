<template>
  <div class="py-12 bg-white">
    <div class="container-custom">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-3xl font-bold text-dark mb-4">Complete Catalog</h1>
        <p class="text-gray-500">Browse our entire collection of professional books.</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
        <div class="flex flex-wrap gap-2">
          <button 
            @click="selectedCategory = 'All'"
            class="px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-2xl"
            :class="[ selectedCategory === 'All' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ]"
          >
            All
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="selectedCategory = cat.name"
            class="px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-2xl"
            :class="[ selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ]"
          >
            {{ cat.name }}
          </button>
        </div>
        
        <div class="relative w-full md:w-64">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search books..." 
            class="w-full pl-3 pr-10 py-2 border border-gray-200 text-sm focus:outline-none focus:border-primary rounded-2xl"
          >
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Grid -->
      <div v-if="filteredBooks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <BookCard 
          v-for="book in filteredBooks" 
          :key="book.id" 
          :book="book" 
        />
      </div>
      <div v-else class="py-20 text-center text-gray-500 italic">
        No books found matching your criteria.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store } from '../store/books';
import BookCard from '../components/BookCard.vue';

const selectedCategory = ref('All');
const searchQuery = ref('');

const categories = computed(() => store.getCategories());

const filteredBooks = computed(() => {
  return store.books.filter(book => {
    let matchesCategory = false;
    if (selectedCategory.value === 'All') {
      matchesCategory = true;
    } else if (Array.isArray(book.category)) {
      matchesCategory = book.category.includes(selectedCategory.value);
    } else {
      matchesCategory = book.category === selectedCategory.value;
    }

    const matchesSearch = book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
</script>
