module.exports = {
  apps: [{
    name: 'react-ssr',
    script: './server/app.js',
    source_map_support: true,
    watch: ['server'],
    watch_delay: 3000,
    ignore_watch: ['node_modules'],
    env: {
      NODE_ENV: 'production',
      PORT: 8825,
    },
    error_file: 'err.log',
    out_file: 'out.log',
    log_file: 'all.log',
    max_restarts: 10,
    exec_mode: 'cluster',
    instances: 2,
  }],
}
