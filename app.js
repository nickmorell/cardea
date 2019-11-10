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
  case 'config':
    require('./cmds/configure').configure(args, conf)
    break
  case 'today':
    require('./cmds/today') (args, config)
    break
  case 'forecast':
    require('./cmds/forecast')(args, config)
    break
  case 'version':
    require('./cmds/version') (args)
    break
  case 'help':
    require('./cmds/help') (args)
    break
  default:
    error(`"${cmd}" is not a valid command!`, true)
    break
}

}