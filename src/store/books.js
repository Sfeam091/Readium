import { reactive } from 'vue';

// Import local JSON data
import booksData from '../data/books.json';
import authorsData from '../data/authors.json';
import categoriesData from '../data/categories.json';

export const store = reactive({
    books: booksData,
    authors: authorsData,
    categories: categoriesData,

    // Getters
    getBookById(id) {
        return this.books.find(book => book.id === parseInt(id));
    },
    getAuthorById(id) {
        return this.authors.find(author => author.id === parseInt(id));
    },
    getBooksByAuthor(authorId) {
        return this.books.filter(book => book.authorId === parseInt(authorId));
    },
    getBooksByCategory(categoryName) {
        return this.books.filter(book => {
            if (Array.isArray(book.category)) {
                return book.category.includes(categoryName);
            }
            return book.category === categoryName;
        });
    },
    getCategories() {
        return this.categories;
    },

    // Admin Methods (Local Save Only)
    async saveLocal(type) {
        // In Vite, import.meta.env.DEV is true during dev
        if (!import.meta.env.DEV) {
            console.warn('Saving is only allowed in local development mode.');
            return false;
        }

        const data = type === 'books' ? this.books :
            type === 'authors' ? this.authors :
                this.categories;

        try {
            const response = await fetch('/api/save-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, data })
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);
            console.log(`${type} saved successfully to local filesystem.`);
            return true;
        } catch (error) {
            console.error(`Error saving ${type}:`, error);
            return false;
        }
    },

    // CRUD Methods
    addBook(book) {
        const newId = this.books.length > 0 ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
        this.books.push({ ...book, id: newId });
        return this.saveLocal('books');
    },
    updateBook(id, updatedBook) {
        const index = this.books.findIndex(b => b.id === parseInt(id));
        if (index !== -1) {
            this.books[index] = { ...updatedBook, id: parseInt(id) };
            return this.saveLocal('books');
        }
        return false;
    },
    deleteBook(id) {
        this.books = this.books.filter(b => b.id !== parseInt(id));
        return this.saveLocal('books');
    },

    addAuthor(author) {
        const newId = this.authors.length > 0 ? Math.max(...this.authors.map(a => a.id)) + 1 : 1;
        this.authors.push({ ...author, id: newId });
        return this.saveLocal('authors');
    },
    updateAuthor(id, updatedAuthor) {
        const index = this.authors.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            this.authors[index] = { ...updatedAuthor, id: parseInt(id) };
            return this.saveLocal('authors');
        }
        return false;
    },
    deleteAuthor(id) {
        this.authors = this.authors.filter(a => a.id !== parseInt(id));
        return this.saveLocal('authors');
    },

    addCategory(category) {
        const newId = this.categories.length > 0 ? Math.max(...this.categories.map(c => c.id)) + 1 : 1;
        this.categories.push({ ...category, id: newId });
        return this.saveLocal('categories');
    },
    updateCategory(id, updatedCategory) {
        const index = this.categories.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            this.categories[index] = { ...updatedCategory, id: parseInt(id) };
            return this.saveLocal('categories');
        }
        return false;
    },
    deleteCategory(id) {
        this.categories = this.categories.filter(c => c.id !== parseInt(id));
        return this.saveLocal('categories');
    }
});
