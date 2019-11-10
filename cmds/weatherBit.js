const configSelector = 'weatherbit';
const chalk = require('chalk')
const Table = require('cli-table3')
const error = require('../utils/error')
const api = require('../utils/apiManager')
const axios = require('axios')

module.exports = (args, config) => {
    let savedObject = config.get(configSelector)

    if(args.print) {
        print(savedObject)
    }

    if(args.current) {
        validateKeysExist(savedObject)
        current(args, savedObject)
    }

    if(args.forecast) {
        validateKeysExist(savedObject)
        forecast(args, savedObject)
    }

    if(args.config) {
        if(savedObject) {
            setConfig(args, savedObject, config)
        }else {
            setConfig(args, {}, config)
        }
    }

}


let current = (args, savedObject) => {
    let postalCode = args.postalCode ? args.postalCode : savedObject.postalCode
    postalCode = postalCode != undefined ? postalCode : '10036'
    let units = args.units ? args.units : savedObject.units
    if(!units)
        units = 'M'
    units = normalizeUnitsApi(units)

    getCurrent(savedObject.key, postalCode, units).then((data) =>{
        const table = new Table({
            head: ['City', 'State', 'Wind', 'Cloud', 'Percipitation', 'Weather', 'Tempature', 'Date'],
            colWidths: ['20', '15', '10', '10', '10', '30', '20', '20'],
            wordWrap: true
        })
            
        data.forEach(element => {
            table.push([
                element.city_name,
                element.state_code,
                `${element.wind_spd} m/s`,
                `${element.clouds}%`,
                `${element.precip} mm/hr`,
                element.weather.description,
                `${element.temp} ${normalizeUnitsDisplay(units)}`,
                element.datetime.split(':')[0]
            ])
        });
      
        console.log(table.toString());
    }).catch((err) => {
        console.log(`${chalk.redBright('Error:')} Unable to fetch data at this moment. Make sure you're credentials are set properly.`)
    });      
    
}

let forecast = (args, savedObject) => {
    let postalCode = args.postalCode ? args.postalCode : savedObject.postalCode
    postalCode = postalCode != undefined ? postalCode : '10036'  
    let units = args.units ? args.units : savedObject.units
    if(!units)
        units = 'M'
    units = normalizeUnitsApi(units)
        

    getForecast(savedObject.key, postalCode).then((data) =>{
        const table = new Table({
          head: ['City', 'State', 'Wind', 'Cloud', 'Percipitation', 'Weather', 'Tempature', 'Date'],
          colWidths: ['20', '15', '10', '10', '20', '30', '20', '20'],
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
            `${element.temp} ${normalizeUnitsDisplay(units)}`,
            element.datetime.split(':')[0]
          ])
        });
  
        console.log(table.toString());
      }).catch((err) => {
        console.log(`${chalk.redBright('Error:')} Unable to fetch data at this moment. Make sure you're credentials are set properly.`)
      });
}

let setConfig = (args, savedObject, config) => {
    if(args.key) {
        savedObject.key = args.key
        console.log(`Key has been set to ${savedObject.key}`)
    }

    if(args.postalCode) {
        savedObject.postalCode = args.postalCode
        console.log(`Postal code has been set to ${savedObject.postalCode}`) 
    }

    if(args.units) {
        savedObjects.units = normalizeUnitsApi(args.units)
        console.log(`Units have been saved to ${savedObject.units}`)
    }

    config.set(configSelector, savedObject)
}

let print = (savedObject) => {
    if(!savedObject) {
        error(`Your weatherbit.io settings have not been set yet. Please learn more by using ${chalk.blueBright('cardea')} help weatherbit`, true)
    }

    const table = new Table({
        head: ['API Key', 'Postal Code'],
        colWidths: ['40', '15'],
        wordWrap: true
      })
      
      table.push([
        savedObject.key,
        savedObject.postalCode
      ])
    
    console.log(table.toString());
}

let validateKeysExist = (savedObject) => {
    if(!savedObject) {
        error(`Your weatherbit.io settings have not been set yet. Please learn more by using ${chalk.blueBright('cardea')} help weatherbit`, true)
    }

    if(!savedObject.key) {
        error(`Your weatherbit.io api key have not been set yet. Please learn more by using ${chalk.blueBright('cardea')} help weatherbit`, true)
    }
}

let normalizeUnitsApi = (unit) => {
    switch(unit) {
        case 'F':
        case 'fahrenheit':
        case 'Fahrenheit':
            return 'I'
        case 'K':
        case 'kelvin':
        case 'Kelvin':
            return 'S'
        default:
            return 'M'
    }
}

let normalizeUnitsDisplay = (unit) => { 
    switch(unit) {
        case 'M':
            return 'C'
        case 'S':
            return 'K'
        case 'I':
            return 'F'
    }
}

/*
  API Calls 
*/

let getCurrent = async (key, postalCode, units) => {
    let apiObject = api.getApi('weatherBit')
       
    let url = apiObject.baseUrl + `current?postal_code=${postalCode}&key=${key}&units=${units}`;
    let data = await axios({
        method: 'get',
        url: url
    });
    return data.data.data;
}

let getForecast = async (key, postalCode) => {
    let apiObject = api.getApi('weatherBit')
    let url = apiObject.baseUrl + `forecast/daily?postal_code=${postalCode}&key=${key}`;
    let data = await axios({
        method: 'get',
        url: url
    });
    return data.data;
}