#! /usr/bin/env node

const program = require('commander')
const Meditation = require('./meditation')

program
  .arguments('<minutes>')
  .description('Simple command line meditation timer with a nice bell sound.')
  .option('-s, --silent', `Silence the bell sound before and after the meditation`)
  .action( minutes => {
    const options = {
      silent: program.silent || false,
      minutes: minutes
    }

    const session = new Meditation(options)
  })
  .parse(process.argv)
