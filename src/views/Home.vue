<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-dark text-white py-12">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Your Gateway to <span class="text-primary">Free Knowledge</span>
        </h1>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Professional development books, technical guides, and career resources — all available free in PDF format. No registration required.
        </p>
        <div class="flex justify-center space-x-4">
          <router-link to="/books" class="btn-primary py-3 text-sm">
            Browse All Books
          </router-link>
          <router-link to="/about" class="bg-transparent border border-gray-700 text-white px-10 py-3 text-sm font-medium hover:bg-gray-800 transition-colors rounded-2xl">
            Learn More
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Books -->
    <section class="py-10 bg-white">
      <div class="container-custom">
        <div class="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
          <div>
            <h2 class="text-2xl font-bold text-dark">Featured Books</h2>
            <p class="text-gray-500 text-sm mt-1">Our top picks for this week</p>
          </div>
          <router-link to="/books" class="text-primary font-bold text-sm tracking-widest uppercase hover:underline">
            View All &rarr;
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <BookCard 
            v-for="book in featuredBooks" 
            :key="book.id" 
            :book="book" 
          />
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-10 bg-gray-50 border-y border-gray-100">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <span class="font-bold text-xl">1</span>
            </div>
            <h3 class="font-bold text-lg mb-3">100% Free</h3>
            <p class="text-gray-600 text-sm">All books in our library are shared with permission or under open licenses.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <span class="font-bold text-xl">2</span>
            </div>
            <h3 class="font-bold text-lg mb-3">Professional Quality</h3>
            <p class="text-gray-600 text-sm">We curate only the most relevant and high-quality technical content.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <span class="font-bold text-xl">3</span>
            </div>
            <h3 class="font-bold text-lg mb-3">Easy Access</h3>
            <p class="text-gray-600 text-sm">Direct PDF downloads without any paywalls or registration forms.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '../store/books';
import BookCard from '../components/BookCard.vue';

const featuredBooks = computed(() => store.books.slice(0, 4));
</script>
