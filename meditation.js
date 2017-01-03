const clear = require('clear')

const pressAnyKey = require('./press-any-key.js')
const ringBell = require('./ring-bell.js')

function Meditation(options) {
  this.options = options

  this.prepare()

  pressAnyKey(() => {
    this.start()

    setTimeout(() => { this.end() }, toMilliseconds(this.options.minutes))
  })
}

Meditation.prototype.prepare = function() {
  console.log(`For ${this.options.minutes} minutes, focus on the sensation of your breathing.\nWhen your mind wanders, gently bring it back to the breath.\nPress any key when you're ready.`)
}

Meditation.prototype.start = function() {
  clear()
  ringBell(this.options.silent)
  console.log(`☯`)
}

Meditation.prototype.end = function() {
  ringBell(this.options.silent)
  console.log(`Take a few seconds to bring your mind back to the world around you.\nHave a peaceful day.`)
  process.exit(0)
}

function toMilliseconds(minutes) {
  return minutes * 60000
}

module.exports = Meditation
