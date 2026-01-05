<template>
  <AdminLayout>
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-3xl font-black text-dark uppercase tracking-tighter">Manage Categories</h2>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total: {{ store.categories.length }} Categories</p>
      </div>
      <button @click="showAddModal = true" class="btn-primary py-3 text-xs font-bold uppercase tracking-widest">
        Add New Category
      </button>
    </div>

    <!-- Categories List -->
    <div class="bg-white border border-gray-200 overflow-hidden shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category Name</th>
            <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</th>
            <th class="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 font-medium text-sm">
          <tr v-for="cat in store.categories" :key="cat.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <span class="text-primary font-bold uppercase tracking-wider">{{ cat.name }}</span>
            </td>
            <td class="px-6 py-4 text-gray-500 italic max-w-md truncate">
              {{ cat.description }}
            </td>
            <td class="px-6 py-4 text-right space-x-4">
              <button @click="editCategory(cat)" class="text-primary hover:underline text-xs font-bold uppercase tracking-widest">Edit</button>
              <button @click="confirmDelete(cat.id, cat.name)" class="text-red-500 hover:underline text-xs font-bold uppercase tracking-widest">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingCategory" class="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-dark/80 backdrop-blur-sm">
      <div class="bg-white w-full max-w-lg p-10 shadow-2xl">
        <h3 class="text-2xl font-black text-dark uppercase tracking-tighter mb-8">
          {{ editingCategory ? 'Edit Category' : 'Add New Category' }}
        </h3>
        
        <form @submit.prevent="saveCategory" class="space-y-6">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Category Name</label>
            <input v-model="form.name" type="text" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl">
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
            <textarea v-model="form.description" rows="3" required class="w-full border-2 border-gray-50 px-4 py-3 outline-none focus:border-primary transition-colors rounded-2xl"></textarea>
          </div>

          <div class="flex justify-end gap-4 mt-8">
            <button type="button" @click="closeModal" class="px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" class="btn-primary py-3 px-10 text-xs font-bold uppercase tracking-widest">
              {{ editingCategory ? 'Update Category' : 'Save Category' }}
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
const editingCategory = ref(null);

const form = reactive({
  name: '',
  description: ''
});

const editCategory = (cat) => {
  editingCategory.value = cat.id;
  Object.assign(form, { ...cat });
  showAddModal.value = false;
};

const closeModal = () => {
  showAddModal.value = false;
  editingCategory.value = null;
  resetForm();
};

const resetForm = () => {
  Object.assign(form, {
    name: '',
    description: ''
  });
};

const saveCategory = async () => {
  let success = false;
  if (editingCategory.value) {
    success = await store.updateCategory(editingCategory.value, { ...form });
  } else {
    success = await store.addCategory({ ...form });
  }

  if (success) {
    alert(editingCategory.value ? 'Category updated successfully!' : 'Category added successfully!');
    closeModal();
  } else {
    alert('Error saving category.');
  }
};

const confirmDelete = async (id, name) => {
  const booksInCategory = store.getBooksByCategory(name);
  if (booksInCategory.length > 0) {
    alert(`Cannot delete category. There are ${booksInCategory.length} books assigned to this category.`);
    return;
  }

  if (confirm(`Are you sure you want to delete the "${name}" category?`)) {
    const success = await store.deleteCategory(id);
    if (success) {
      alert('Category deleted successfully!');
    } else {
      alert('Error deleting category.');
    }
  }
};
</script>
