<template>
  <div class="py-12 bg-white">
    <div class="container-custom">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-3xl font-bold text-dark mb-4">Books by Category</h1>
        <p class="text-gray-500">Explore our library organized by topic.</p>
      </div>

      <div class="space-y-16">
        <div v-for="cat in categories" :key="cat.id" class="border-t border-gray-100 pt-12 first:border-t-0 first:pt-0">
          <div class="flex justify-between items-center mb-8">
            <div>
              <h2 class="text-xl font-bold text-dark border-l-4 border-primary pl-4 uppercase tracking-wider">
                {{ cat.name }}
              </h2>
              <p class="text-gray-500 text-sm mt-2 pl-4">{{ cat.description }}</p>
            </div>
            <router-link to="/books" class="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
              See All {{ cat.name }} &rarr;
            </router-link>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <BookCard 
              v-for="book in store.getBooksByCategory(cat.name).slice(0, 4)" 
              :key="book.id" 
              :book="book" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '../store/books';
import BookCard from '../components/BookCard.vue';

const categories = computed(() => store.getCategories());
</script>
