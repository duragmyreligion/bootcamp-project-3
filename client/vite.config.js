import { defineConfig } from 'vite'; // Importing the defineConfig function from Vite
import react from '@vitejs/plugin-react'; // Importing the Vite React plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Configuring Vite to use the React plugin
  server: {
    port: 3000, // Configuring the server port
    open: true, // Opening the browser automatically when the server starts
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001', // Proxying requests to '/graphql' to the specified target
        secure: false, // Disabling secure connections (HTTPS)
        changeOrigin: true // Changing the origin of the request when sending to the target
      }
    }
  },
  test: {
    environment: 'happy-dom', // Setting the environment for testing
    globals: true // Allowing global variables in tests
  }
});
