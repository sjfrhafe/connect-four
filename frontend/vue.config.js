module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }, 
        '/gamews': {
          target: 'http://localhost:3000/gamews',
          changeOrigin: true
        }
      }
    }
  }