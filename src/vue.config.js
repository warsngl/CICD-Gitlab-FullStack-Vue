module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test_task_deploy/'
    : '/'
}