const ora = require('ora')
const chalk = require('chalk')
const api = require('../utils/weatherBit')
const Table = require('cli-table3')
const configKey = require('../cmds/configure').configKey

module.exports = async (args, config) => {
  const spinner = ora().start()
  let currentConfigObject = config.get(configKey)

  try {
    api.getForecast(config, configKey).then((data) =>{

      const table = new Table({
        head: ['City', 'State', 'Wind', 'Cloud', 'Percipitation', 'Weather', 'Tempature'],
        colWidths: ['20', '15', '10', '10', '20', '30', '20'],
        wordWrap: true
      })
      
      data.data.forEach(element => {
        table.push([
          data.city_name,
          data.state_code,
          `${element.wind_spd} m/s`,
          `${element.clouds}%`,
          `${element.precip} mm/hr`,
          element.weather.description,
          `${element.temp} ${currentConfigObject.units}`
        ])
      });

      console.log(table.toString());
    }).catch((err) => {
      console.log(`${chalk.redBright('Error:')} Unable to fetch data at this moment. Make sure you're credentials are set properly.`)
    });
    spinner.stop()
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}