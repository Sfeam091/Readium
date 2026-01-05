<template>
  <div class="fixed top-4 inset-x-0 z-50 px-4 flex justify-center w-full pointer-events-none">
    <nav class="relative w-full max-w-7xl pointer-events-auto bg-[#212529] text-white rounded-2xl" :class="scrolled ? 'shadow-xl border border-gray-800' : 'shadow-none border-none'">
      <div class="px-6">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold tracking-tight text-white flex items-center uppercase">
              <img src="/logo/ReadiumLogoBGTransparent.png" alt="Readium" class="h-10 w-auto mr-2" />
              <span class="text-xs font-normal normal-case text-gray-400 hidden sm:inline">by Systemset Co</span>
            </router-link>
          </div>
  
          <!-- Desktop Menu -->
          <div class="hidden md:flex space-x-8">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="px-3 py-2 text-sm font-medium transition-colors border-b-2"
              :class="[
                $route.path === item.path 
                  ? 'border-primary text-white' 
                  : 'border-transparent text-gray-300 hover:text-white'
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
  
          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center">
            <button @click="isOpen = !isOpen" class="text-gray-300 hover:text-white focus:outline-none p-2 transition-colors">
              <span class="sr-only">Open main menu</span>
              <div class="relative w-6 h-6 flex flex-col justify-center gap-1.5 transition-all duration-300 transform" :class="{ 'rotate-180': isOpen }">
                <span class="block w-full h-0.5 bg-current transition-all duration-300 origin-center" :class="{ 'rotate-45 translate-y-2': isOpen }"></span>
                <span class="block w-full h-0.5 bg-current transition-all duration-300 origin-center" :class="{ 'opacity-0': isOpen }"></span>
                <span class="block w-full h-0.5 bg-current transition-all duration-300 origin-center" :class="{ '-rotate-45 -translate-y-2': isOpen }"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile Menu -->
      <transition 
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0 -translate-y-2"
        enter-to-class="transform scale-100 opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100 translate-y-0"
        leave-to-class="transform scale-95 opacity-0 -translate-y-2"
      >
        <div v-show="isOpen" class="md:hidden mt-3 bg-dark rounded-2xl absolute top-16 inset-x-0 w-full shadow-xl border border-gray-800">
          <div class="px-2 py-3 space-y-1">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              @click="isOpen = false"
              class="block px-3 py-3 text-base font-medium rounded-2xl transition-all text-gray-300 hover:text-white hover:bg-gray-800"
              :class="[
                $route.path === item.path 
                  ? 'bg-gray-800 text-white' 
                  : ''
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </transition>
    </nav>
  </div>
  <!-- Spacer to prevent content overlap -->
  <div class="h-24 transition-colors duration-300" :class="spacerBgClass"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isOpen = ref(false);
const scrolled = ref(false);

// Pages with dark hero section
const darkPages = ['/'];

const isDarkPage = computed(() => darkPages.includes(route.path));

const spacerBgClass = computed(() => {
  return isDarkPage.value ? 'bg-[#212529]' : 'bg-white';
});

// Handle scroll effect for navbar shadow
const handleScroll = () => {
  scrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'All Books', path: '/books' },
  { name: 'Categories', path: '/categories' },
  { name: 'Authors', path: '/authors' },
  { name: 'About', path: '/about' },
];
</script>

<style scoped>
/* Ensure navbar sits above everything */
nav {
  isolation: isolate;
}
</style>
