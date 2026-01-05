<template>
  <div v-if="author" class="py-12 bg-white">
    <div class="container-custom">
      <!-- Author Bio -->
      <div class="bg-gray-50 border border-gray-100 p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center md:items-start gap-10">
        <div class="flex-shrink-0">
          <img :src="author.image" :alt="author.name" class="w-48 h-48 object-cover border-4 border-white shadow-sm rounded-2xl">
        </div>
        <div>
          <h1 class="text-3xl font-bold text-dark mb-4">{{ author.name }}</h1>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ author.bio }}
          </p>
          <div class="flex space-x-4">
             <div class="text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Books by this Author</div>
          </div>
        </div>
      </div>

      <!-- Author's Books -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <BookCard 
          v-for="book in authorBooks" 
          :key="book.id" 
          :book="book" 
        />
      </div>
    </div>
  </div>
  <div v-else class="py-20 text-center">
    Author not found.
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '../store/books';
import BookCard from '../components/BookCard.vue';

const route = useRoute();
const authorId = computed(() => route.params.id);
const author = computed(() => store.getAuthorById(authorId.value));
const authorBooks = computed(() => store.getBooksByAuthor(parseInt(authorId.value)));
</script>
