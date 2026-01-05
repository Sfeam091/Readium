<template>
  <div class="py-12 bg-white">
    <div class="container-custom">
      <!-- Header -->
      <div class="mb-12 text-center">
        <img src="/logo/ReadiumLogoBGTransparentDark.png" alt="Readium" class="h-16 w-auto mx-auto mb-4" />
        <p class="text-gray-500 max-w-2xl mx-auto">A professional platform dedicated to the free exchange of knowledge and technical expertise.</p>
      </div>

      <div class="max-w-3xl mx-auto">
        <div class="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 class="text-xl font-bold text-dark mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">Our Mission</h2>
            <p>
              We believe that high-quality educational resources should be accessible to everyone, regardless of their financial situation. Our mission is to curate and provide a collection of professional-grade e-books across various disciplines, focusing on software engineering, career development, and technical skills.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-dark mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">What We Offer</h2>
            <p>
              Every book in our library is available for <strong>0 PKR (Free)</strong>. We focus on:
            </p>
            <ul class="list-disc pl-5 mt-4 space-y-2">
              <li>Comprehensive technical guides for modern programming languages.</li>
              <li>Software architecture and design pattern textbooks.</li>
              <li>Career development and soft skills resources for professionals.</li>
              <li>Hand-picked selections from industry icons and experts.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-dark mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">Commitment to Quality</h2>
            <p>
              Unlike other free resources, we prioritize quality over quantity. Each entry in our catalog includes detailed descriptions, author information, and publication details to help you find exactly what you need for your professional journey.
            </p>
          </section>
        </div>

        <div class="mt-16 bg-primary text-white p-10 text-center">
          <h2 class="text-2xl font-bold mb-4">Start Learning Today</h2>
          <p class="mb-8 opacity-90">Explore our catalog and download your first book for free.</p>
          <router-link to="/books" class="bg-white text-primary px-10 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors rounded-2xl">
            Browse Catalog
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
