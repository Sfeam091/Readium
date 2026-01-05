<template>
  <div v-if="book" class="py-12 bg-white min-h-screen">
    <div class="container-custom">
      <!-- Breadcrumbs -->
      <div class="mb-8 text-xs font-bold uppercase tracking-widest text-gray-400">
        <router-link to="/" class="hover:text-primary transition-colors">Home</router-link>
        <span class="mx-2">/</span>
        <router-link to="/books" class="hover:text-primary transition-colors">Books</router-link>
        <span class="mx-2">/</span>
        <span class="text-dark">{{ book.title }}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
        <!-- Left: Image -->
        <div class="md:col-span-4">
          <div class="bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
            <img :src="book.coverImage" :alt="book.title" class="w-full h-auto object-cover">
          </div>
          
          <div class="mt-8 p-6 bg-gray-50 border border-gray-100">
            <h4 class="text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Book Details</h4>
            <ul class="space-y-3 text-sm">
              <li class="flex justify-between">
                <span class="text-gray-500">Publication Year</span>
                <span class="font-bold text-dark">{{ book.year }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-500">Pages</span>
                <span class="font-bold text-dark">{{ book.pages }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-500">Category</span>
                <span class="font-bold text-primary">{{ book.category }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-500">Price</span>
                <span class="font-bold text-green-600">FREE (0 PKR)</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="md:col-span-8">
          <h1 class="text-4xl font-extrabold text-dark mb-2 leading-tight">
            {{ book.title }}
          </h1>
          <p class="text-xl text-gray-500 mb-6">
            By <router-link :to="'/authors/' + book.authorId" class="text-primary hover:underline font-medium">{{ book.author }}</router-link>
          </p>

          <div class="prose prose-lg max-w-none text-gray-600 mb-10 leading-relaxed">
            <h3 class="text-lg font-bold text-dark mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">Description</h3>
            <p>{{ book.description }}</p>
            <p class="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <a :href="book.downloadUrl" class="btn-primary h-12 px-10 text-center text-sm font-bold uppercase tracking-widest flex-grow">
              Download Full PDF
            </a>
            <button @click="$router.back()" class="bg-white border border-gray-200 text-dark px-10 h-12 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors rounded-2xl">
              Go Back
            </button>
          </div>

          <!-- Author Mini Bio -->
          <div v-if="author" class="border-t border-gray-100 pt-10">
            <h3 class="text-lg font-bold text-dark mb-6 uppercase tracking-wider">About the Author</h3>
            <div class="flex items-start gap-6">
              <img :src="author.image" :alt="author.name" class="w-20 h-20 object-cover border border-gray-200 rounded-2xl">
              <div>
                <h4 class="font-bold text-dark mb-2">{{ author.name }}</h4>
                <p class="text-gray-500 text-sm mb-4 line-clamp-3 italic">{{ author.bio }}</p>
                <router-link :to="'/authors/' + author.id" class="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
                  View More Books by {{ author.name }} &rarr;
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="py-20 text-center min-h-screen">
    <div class="container-custom">
      <h2 class="text-2xl font-bold text-dark">Book not found</h2>
      <router-link to="/books" class="text-primary hover:underline mt-4 block">Return to catalog</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '../store/books';

const route = useRoute();
const bookId = computed(() => route.params.id);
const book = computed(() => store.getBookById(bookId.value));
const author = computed(() => book.value ? store.getAuthorById(book.value.authorId) : null);
</script>
