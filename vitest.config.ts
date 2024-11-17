import { defineConfig } from 'vitest/config';

export const config = defineConfig({
  test: {
    globals: true, // Enables global functions like `describe`, `it`, etc.
    environment: 'node', // Set environment to 'node' for Express testing
    include: ['src/**/*.spec.ts'], // Specify test files location
    coverage: {
      reporter: ['text', 'json', 'html'], // Optional: enable coverage reports
    },
  },
});

export default config;
