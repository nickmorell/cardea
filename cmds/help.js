const chalk = require('chalk')

const menus = {
    main: `
      ${chalk.greenBright('cardea [command] <options>')}
      
      ${chalk.blueBright('weatherbit')} .............. utilize the weatherbit api for your weather
      ${chalk.blueBright('version')} ............ show current package version
      ${chalk.blueBright('help')} ............... show help menu for a command`,

    weatherbit: `
      ${chalk.greenBright('cardea weatherbit <options>')}
      ${chalk.blueBright('--current')} ............... show the current weather
          ${chalk.blueBright('--postalCode')} ............... get weather for the specified postal code, default is saved postal code or 10036
          ${chalk.blueBright('--units')} ............... get weather in the desired unit ('F', 'C', 'K'), default is saved unit or 'C'
      ${chalk.blueBright('--print')} ............... prints your saved configuration
      ${chalk.blueBright('--config')} ............... set your configuration preferences
        ${chalk.blueBright('--key')} ............... sets your weatherbit.io api key, field is required before use
        ${chalk.blueBright('--postalCode')} ............... sets your prefered postal code
        ${chalk.blueBright('--units')} ............... sets your prefered units, options = 'F', 'C', 'K' 
    `,
    
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
    console.log(menus[subCmd] || menus.main)
  }