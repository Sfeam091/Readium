<template>
  <div class="py-12 bg-white">
    <div class="container-custom">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-3xl font-bold text-dark mb-4">Our Authors</h1>
        <p class="text-gray-500">The minds behind the knowledge.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="author in authors" :key="author.id" class="flex items-center space-x-4 border-b border-gray-100 pb-6 last:border-0 lg:border-0 lg:pb-0">
          <div class="flex-shrink-0">
            <img :src="author.image" :alt="author.name" class="w-24 h-24 object-cover border border-gray-200 rounded-2xl">
          </div>
          <div>
            <h3 class="text-lg font-bold text-dark mb-1">
              <router-link :to="'/authors/' + author.id" class="hover:text-primary transition-colors">
                {{ author.name }}
              </router-link>
            </h3>
            <p class="text-gray-500 text-sm line-clamp-2 mb-3">
              {{ author.bio }}
            </p>
            <router-link :to="'/authors/' + author.id" class="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
              View Books &rarr;
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '../store/books';

const authors = computed(() => store.authors);
</script>
