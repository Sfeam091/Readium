<template>
  <div class="book-card h-full flex flex-col cursor-pointer" @click="$router.push('/book/' + book.id)">
    <!-- Image -->
    <div class="relative pt-[140%] bg-gray-100 border-b border-gray-200">
      <img 
        :src="book.coverImage" 
        :alt="book.title" 
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      >
    </div>

    <!-- Content -->
    <div class="p-5 flex-grow flex flex-col">
      <div class="mb-auto">
        <span class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">
          {{ book.category }}
        </span>
        <h3 class="text-lg font-bold text-dark leading-tight mb-1 line-clamp-2">
          {{ book.title }}
        </h3>
        <p class="text-sm text-gray-500 mb-3" @click.stop>
          By <router-link :to="'/authors/' + book.authorId" class="hover:text-primary transition-colors">{{ book.author }}</router-link>
        </p>
        <p class="text-gray-600 text-sm line-clamp-3 mb-4">
          {{ book.description }}
        </p>
      </div>

      <!-- Footer Info -->
      <div class="mt-4 pt-4 border-t border-gray-100">
        <div class="flex items-center justify-between mb-3">
          <div class="text-[11px] text-gray-400 font-medium">
            {{ book.pages }} Pages • {{ book.year }}
          </div>
          <span class="text-[10px] font-bold text-primary uppercase">Free (0 PKR)</span>
        </div>
        <a :href="book.downloadUrl" @click.stop class="btn-primary text-xs uppercase tracking-widest py-2 w-full block text-center">
           Download
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* Strict restriction: No hover effects allowed */
.book-card {
  transition: border-color 0.2s ease;
}
.book-card:hover {
  border-color: #0d6efd;
}
</style>
