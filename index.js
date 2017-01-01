#! /usr/bin/env node

const program = require('commander')
const clear = require('clear')
const death = require('death')
const player = require('play-sound')(opts = {})

const SOUND = './assets/bowl.mp3'

const meditation = {
  before: (minutes) => {
    console.log(`For ${minutes} minutes, focus on the sensation of your breathing.\nWhen your mind wanders, gently bring it back to the breath.\nPress any key when you're ready.`)
  },
  begin: (silent) => {
    clear()
    playSoundIfAllowed()
    console.log(`☯`)
  },
  after: (silent) => {
    playSoundIfAllowed()
    console.log(`Take a few seconds to bring your mind back to the world around you.\nHave a peaceful day.`)
    process.exit(0)
  }
}

function pressAnyKey(callback) {
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', () => {
    process.stdin.setRawMode(false)
    callback()
  })
}

function playSoundIfAllowed() {
  !program.silent && player.play(SOUND)
}

death((signal, error) => { 
  console.log(`\nAll things are impermanent.`)
  process.exit()
})

program
  .arguments('<minutes>')
  .option('-s, --silent', `Silence the bell sound before and after the meditation`)
  .action( minutes => {
    // Print a nice message
    meditation.before(minutes)

    // After key press, display a calming nearly-empty terminal
    pressAnyKey(meditation.begin)

    // Once the session is over, print a nice message and quit
    setTimeout(() => { meditation.after() }, minutes * 60000)
  })
  .parse(process.argv)
