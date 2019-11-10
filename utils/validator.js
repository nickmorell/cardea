const axios = require('axios')
const chalk = require('chalk')

module.exports = {
    validateApiKey: (apiKey) => {
        if (!apiKey || apiKey.length !== 32) {
            console.error(
              chalk.redBright(
                `API Key for OpenWeatherMap service has not been set up yet.`
              )
            );
            console.warn(
              `Please use command ${chalk.greenBright(
                'cardea config --apiKey'
              )} to save your API key.
                `
            );
            return false;
          }
          return true;
    },
    validateCityId: (cityId) => {
        if (!Number.isInteger(cityId) || cityId < 1) {
            console.error(
              chalk.redBright(
                `CityID for OpenWeatherMap service is invalid. Only number is allowed.`
              )
            );
            console.warn(
              `Please use command ${chalk.greenBright(
                'cardea config --cityId'
              )} to save your default city ID or use command flag ${chalk.greenBright(
                '--cityId [-c]'
              )} to specify your city ID.
                `
            );
            return false;
          }
          return true;
    },
    validateUnits: (units) => {
        if (!units || ['c', 'C', 'f', 'F', 'k', 'K'].indexOf(units[0]) < 0) {
            console.error(
              chalk.redBright(
                `Temperature Units for OpenWeatherMap service is invalid.`
              )
            );
            console.warn(
              `Allowed values are: ${chalk.greenBright('Kelvin')}, ${chalk.greenBright(
                'Celsius'
              )}, ${chalk.greenBright('Fahrenheit')}.
                `
            );
            return false;
          }
          return true;
    }

}