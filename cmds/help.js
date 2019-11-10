const chalk = require('chalk')

const menus = {
    main: `
      ${chalk.greenBright('cardea [command] <options>')}
      
      ${chalk.blueBright('config')}.............. set API key, default city ID, default temperature units
      ${chalk.blueBright('today')} .............. show weather for today
      ${chalk.blueBright('forecast')} ........... show 10-day weather forecast
      ${chalk.blueBright('version')} ............ show package version
      ${chalk.blueBright('help')} ............... show help menu for a command`,
  
      now: `
      ${chalk.greenBright('cardea now <options>')}
        --api-key, -k ..... set the API Key for OpenWeatherMap services if you haven't set it in configure method.
        --city, -c ........ set the City ID in OpenWeatherMap if you want to query weather data in a city different from the default one.
        --units, -u ....... set the temperature units if you want to read temperature in a different unit.
      `,
      
        forecast: `
      ${chalk.greenBright('cardea forecast <options>')}
        --api-key, -k ..... set the API Key for OpenWeatherMap services if you haven't set it in configure method.
        --city, -c ........ set the City ID in OpenWeatherMap if you want to query weather data in a city different from the default one.
        --units, -u ....... set the temperature units if you want to read temperature in a different unit.
      `,
      
        config: `
        ${chalk.greenBright('cardea config <options>')}
        --print, -p ....... print current configuration object.
        --api-key, -k ..... [Required] set the API Key for OpenWeatherMap services.
        --city, -c ........ [Optional] set the default City ID in OpenWeatherMap. Default: 4862034
        --units, -u ....... [Optional] set the default temperature units. Options: Kelvin (default), Celsius, Fahrenheit.
      `,
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
    console.log(menus[subCmd] || menus.main)
  }