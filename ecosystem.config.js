module.exports = {
  apps : [{
    name: 'event-management',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'dev'
    },
    env_stag: {
      NODE_ENV: 'staging'
    },
    env_product: {
      NODE_ENV: 'product'
    }
  }]
};
