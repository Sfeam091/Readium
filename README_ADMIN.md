# Readium Admin Dashboard - Local Management Guide

This project includes a local-only Admin Dashboard for managing the e-book library's content without needing a database.

## Local Configuration

1.  **Environment Setup**:
    Create a `.env` file in the root directory (based on `.env.example`):
    ```env
    VITE_ADMIN_PASSWORD=your_secure_password
    VITE_ADMIN_MODE=true
    ```

2.  **Access the Dashboard**:
    Run the development server:
    ```bash
    npm run dev
    ```
    Navigate to `http://localhost:5173/admin/login` and use the password defined in your `.env`.

## How it Works

- **Local Storage**: All data for books, authors, and categories is stored in standard JSON files within `src/data/`.
- **Saving Changes**: When you click "Save" in the admin dashboard, a custom Vite middleware writes the updated JSON directly to your local filesystem.
- **Production Safety**: The admin routes and saving mechanism are disabled in production mode. Data is bundled as static JSON for speed and cost-efficiency.

## Workflow: Adding New Content

1.  **Open Admin**: Go to the sidebar and select the section you want to manage.
2.  **Authors First**: Add or edit the author profile.
3.  **Categories**: Ensure the categories you want to use are defined.
4.  **Books**: Add the book, selecting the author and categories from the dropdowns. Paste cover and PDF URLs (use services like Imgur or Cloudinary for hosting images if needed).
5.  **Save**: Click Save. You will see a success notification if the local file was updated.

## Deploying to Production

Since the data is stored in the source code, deploying updates is as simple as pushing a git commit:

```bash
# Add updated data files
git add src/data/*.json

# Commit changes
git commit -m "Admin: Added new books and updated author bios"

# Push to trigger Netlify/Production deploy
git push origin main
```

**Netlify will automatically detect the changes, rebuild the static assets, and deploy the new content within minutes.**
