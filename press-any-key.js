module.exports = function(callback) {
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', () => {
    process.stdin.setRawMode(false)
    callback()
  })
}
