const player = require('play-sound')(opts = {})
const sound = './assets/bowl.mp3'

module.exports = (silent) => {
  if(!silent) {
    player.play(sound, function(err) {
      throw err
    })
  }
}
