module.exports = {
  apps: [
    {
      namespace: 'cms-menu',
      name: 'strapi',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      source_map_support: false,
      env: {
        NODE_ENV: 'development',
        PORT: '1337'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '1337'
      },
    },
  ],
};
