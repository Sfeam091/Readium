<template>
  <AdminLayout>
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-3xl font-black text-dark uppercase tracking-tighter">Manage Books</h2>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total: {{ store.books.length }} Books</p>
      </div>
      <button @click="showAddModal = true" class="btn-primary py-3 text-xs font-bold uppercase tracking-widest">
        Add New Book
      </button>
    </div>

    <!-- Search Bar -->
    <div class="mb-8">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search books by title, author or category..."
        class="w-full bg-white border border-gray-200 px-6 py-4 outline-none focus:border-primary transition-colors text-sm font-medium"
      >
    </div>

    <!-- Books Table -->
    <div class="bg-white border border-gray-200 overflow-hidden shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Cover</th>
            <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Book Details</th>
            <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
            <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 font-medium text-sm">
          <tr v-for="book in filteredBooks" :key="book.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 w-20">
              <img :src="book.coverImage" class="w-12 h-16 object-cover border border-gray-100">
            </td>
            <td class="px-6 py-4">
              <div class="font-bold text-dark text-base">{{ book.title }}</div>
              <div class="text-gray-400 text-xs">{{ book.author }} ({{ book.year }})</div>
            </td>
            <td class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
              {{ Array.isArray(book.category) ? book.category.join(', ') : book.category }}
            </td>
            <td class="px-6 py-4 text-right space-x-4">
              <button @click="editBook(book)" class="text-primary hover:underline text-xs font-bold uppercase tracking-widest">Edit</button>
              <button @click="confirmDelete(book.id)" class="text-red-500 hover:underline text-xs font-bold uppercase tracking-widest">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingBook" class="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-dark/80 backdrop-blur-sm">
      <div class="bg-white w-full max-w-2xl p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
        <h3 class="text-2xl font-black text-dark uppercase tracking-tighter mb-8">
          {{ editingBook ? 'Edit Book' : 'Add New Book' }}
        </h3>
        
        <form @submit.prevent="saveBook" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Book Title</label>
            <input v-model="form.title" type="text" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl">
          </div>
          
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Author</label>
            <select v-model="form.authorId" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl">
              <option v-for="author in store.authors" :key="author.id" :value="author.id">{{ author.name }}</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Category</label>
            <select v-model="form.category" multiple class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors min-h-[100px] rounded-2xl">
              <option v-for="cat in store.categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Publication Year</label>
            <input v-model.number="form.year" type="number" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl">
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Pages</label>
            <input v-model.number="form.pages" type="number" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl">
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Cover Image URL</label>
            <input v-model="form.coverImage" type="url" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl">
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">PDF Download URL</label>
            <input v-model="form.downloadUrl" type="text" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl">
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
            <textarea v-model="form.description" rows="4" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl"></textarea>
          </div>

          <div class="md:col-span-2 flex justify-end gap-4 mt-4">
            <button type="button" @click="closeModal" class="px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" class="btn-primary py-3 px-10 text-xs font-bold uppercase tracking-widest">
              {{ editingBook ? 'Update Book' : 'Save Book' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue';
import AdminLayout from '../../components/admin/AdminLayout.vue';
import { store } from '../../store/books';

const searchQuery = ref('');
const showAddModal = ref(false);
const editingBook = ref(null);

const form = reactive({
  title: '',
  authorId: null,
  author: '',
  category: [],
  description: '',
  coverImage: '',
  downloadUrl: '',
  year: new Date().getFullYear(),
  pages: 0
});

const filteredBooks = computed(() => {
  if (!searchQuery.value) return store.books;
  const q = searchQuery.value.toLowerCase();
  return store.books.filter(b => 
    b.title.toLowerCase().includes(q) || 
    b.author.toLowerCase().includes(q) ||
    (Array.isArray(b.category) ? b.category.join(' ').toLowerCase().includes(q) : b.category.toLowerCase().includes(q))
  );
});

watch(() => form.authorId, (newId) => {
  const author = store.authors.find(a => a.id === newId);
  if (author) form.author = author.name;
});

const editBook = (book) => {
  editingBook.value = book.id;
  Object.assign(form, JSON.parse(JSON.stringify(book)));
  showAddModal.value = false;
};

const closeModal = () => {
  showAddModal.value = false;
  editingBook.value = null;
  resetForm();
};

const resetForm = () => {
  Object.assign(form, {
    title: '',
    authorId: store.authors[0]?.id || null,
    author: store.authors[0]?.name || '',
    category: [],
    description: '',
    coverImage: '',
    downloadUrl: '',
    year: new Date().getFullYear(),
    pages: 0
  });
};

const saveBook = async () => {
  let success = false;
  const bookToSave = { ...form };
  
  if (editingBook.value) {
    success = await store.updateBook(editingBook.value, bookToSave);
  } else {
    success = await store.addBook(bookToSave);
  }

  if (success) {
    alert(editingBook.value ? 'Book updated successfully!' : 'Book added successfully!');
    closeModal();
  } else {
    alert('Error saving book. Check local environment setup.');
  }
};

const confirmDelete = async (id) => {
  if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
    const success = await store.deleteBook(id);
    if (success) {
      alert('Book deleted successfully!');
    } else {
      alert('Error deleting book.');
    }
  }
};

// Initial author selection
if (store.authors.length > 0) {
  form.authorId = store.authors[0].id;
  form.author = store.authors[0].name;
}
</script>
