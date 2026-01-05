<template>
  <AdminLayout>
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-3xl font-black text-dark uppercase tracking-tighter">Manage Authors</h2>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total: {{ store.authors.length }} Authors</p>
      </div>
      <button @click="showAddModal = true" class="btn-primary py-3 text-xs font-bold uppercase tracking-widest">
        Add New Author
      </button>
    </div>

    <!-- Authors List -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div v-for="author in store.authors" :key="author.id" class="bg-white border border-gray-200 p-8 flex gap-8 items-start shadow-sm group">
        <img :src="author.image" :alt="author.name" class="w-24 h-24 object-cover border border-gray-100 rounded-2xl shrink-0">
        <div class="flex-grow">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xl font-bold text-dark">{{ author.name }}</h3>
            <div class="space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button @click="editAuthor(author)" class="text-primary hover:underline text-xs font-bold uppercase tracking-widest">Edit</button>
              <button @click="confirmDelete(author.id)" class="text-red-500 hover:underline text-xs font-bold uppercase tracking-widest">Delete</button>
            </div>
          </div>
          <p class="text-sm text-gray-500 leading-relaxed italic line-clamp-3">"{{ author.bio }}"</p>
          <div class="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Books on platform: {{ store.getBooksByAuthor(author.id).length }}
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingAuthor" class="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-dark/80 backdrop-blur-sm">
      <div class="bg-white w-full max-w-xl p-10 shadow-2xl">
        <h3 class="text-2xl font-black text-dark uppercase tracking-tighter mb-8">
          {{ editingAuthor ? 'Edit Author' : 'Add New Author' }}
        </h3>
        
        <form @submit.prevent="saveAuthor" class="space-y-6">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
            <input v-model="form.name" type="text" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl">
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Profile Image URL</label>
            <input v-model="form.image" type="url" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl">
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Biography</label>
            <textarea v-model="form.bio" rows="4" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl"></textarea>
          </div>

          <div class="flex justify-end gap-4 mt-8">
            <button type="button" @click="closeModal" class="px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" class="btn-primary py-3 px-10 text-xs font-bold uppercase tracking-widest">
              {{ editingAuthor ? 'Update Author' : 'Save Author' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import AdminLayout from '../../components/admin/AdminLayout.vue';
import { store } from '../../store/books';

const showAddModal = ref(false);
const editingAuthor = ref(null);

const form = reactive({
  name: '',
  image: '',
  bio: ''
});

const editAuthor = (author) => {
  editingAuthor.value = author.id;
  Object.assign(form, { ...author });
  showAddModal.value = false;
};

const closeModal = () => {
  showAddModal.value = false;
  editingAuthor.value = null;
  resetForm();
};

const resetForm = () => {
  Object.assign(form, {
    name: '',
    image: '',
    bio: ''
  });
};

const saveAuthor = async () => {
  let success = false;
  if (editingAuthor.value) {
    success = await store.updateAuthor(editingAuthor.value, { ...form });
  } else {
    success = await store.addAuthor({ ...form });
  }

  if (success) {
    alert(editingAuthor.value ? 'Author updated successfully!' : 'Author added successfully!');
    closeModal();
  } else {
    alert('Error saving author.');
  }
};

const confirmDelete = async (id) => {
  const booksByAuthor = store.getBooksByAuthor(id);
  if (booksByAuthor.length > 0) {
    alert(`Cannot delete author. There are ${booksByAuthor.length} books assigned to this author.`);
    return;
  }

  if (confirm('Are you sure you want to delete this author?')) {
    const success = await store.deleteAuthor(id);
    if (success) {
      alert('Author deleted successfully!');
    } else {
      alert('Error deleting author.');
    }
  }
};
</script>
