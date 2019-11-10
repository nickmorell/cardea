const minimist = require('minimist')
const error = require('./utils/error')
const Conf = require('conf');

const config = new Conf({
  projectName: 'cardea'
})


module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const cmd = args._[0] || 'help'

switch (cmd) {
  case 'weatherbit': 
    require('./cmds/weatherBit') (args, config)
    break
  case 'version':
    require('./cmds/version') ()
    break
  case 'help':
    require('./cmds/help') (args)
    break
  default:
    error(`"${cmd}" is not a valid command!`, true)
    break
}

}