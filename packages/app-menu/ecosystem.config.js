module.exports = {
  apps: [
    {
      namespace: 'app-menu',
      name: 'nextjs',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      source_map_support: false,
      env: {
        NODE_ENV: 'development',
        PORT: '3000',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
};
