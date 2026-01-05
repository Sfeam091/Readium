<template>
  <footer class="bg-dark text-white pt-12 pb-8 border-t border-gray-800">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div class="mb-4">
            <img src="/logo/ReadiumLogoBGTransparent.png" alt="Readium" class="h-12 w-auto mb-2" />
            <p class="text-gray-400 text-sm pl-1">by Systemset Co</p>
          </div>
          <p class="text-gray-400 text-sm">
            Providing high-quality free educational resources to everyone, everywhere. Our mission is to make knowledge accessible.
          </p>
        </div>
        <div>
          <h4 class="text-md font-bold mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><router-link to="/books" class="hover:text-primary transition-colors">All Books</router-link></li>
            <li><router-link to="/categories" class="hover:text-primary transition-colors">Categories</router-link></li>
            <li><router-link to="/authors" class="hover:text-primary transition-colors">Authors</router-link></li>
            <li><router-link to="/about" class="hover:text-primary transition-colors">About Us</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="text-md font-bold mb-4 uppercase tracking-wider">Contact</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>Email: systemset.co@gmail.com</li>
            <li>Location: Karachi, Pakistan</li>
            <li class="pt-2">
              <span class="inline-flex space-x-4">
                <a href="https://www.facebook.com/people/Systemset/61579612426841/" class="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="https://x.com/Systemsetco" class="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="https://www.linkedin.com/company/systemset" class="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-xs">
        &copy; {{ new Date().getFullYear() }} Readium by Systemset Co. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
