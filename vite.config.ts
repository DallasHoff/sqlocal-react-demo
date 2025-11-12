import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sqlocal from 'sqlocal/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), sqlocal()],
});
