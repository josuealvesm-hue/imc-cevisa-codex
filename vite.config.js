import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/REPO_NAME/', // Troque REPO_NAME pelo nome do repositório no GitHub Pages.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
