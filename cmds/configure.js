const Table = require('cli-table3')
const {validateApiKey, validateCityId, validateUnits} = require('../utils/validator')

const configKey = 'weather-cli';
module.exports = {
    configKey: configKey,
    configure: function configure(args, config) {

        if (args._.includes('clear')) {
            config.clear();
            console.log(`The configuration for weather-cli has been deleted.
            Current value: ${config.get(configKey)}
            `);
            return;
        }

        if (args._.includes('path')) {
            console.log(`The config file path is: 
            ${config.path}
            `);
            return;
        }  

        let currentConfigObject = config.get(configKey);
        if (args._.includes('p') || args._.includes('print')) {
            const table = new Table({
                head: ['Api Key', 'City ID', 'Unit'],
                colWidths: ['32', '10', '15'],
                wordWrap: true
            });
            table.push([
                currentConfigObject.apiKey,
                currentConfigObject.cityId,
                currentConfigObject.units
            ])
            
            console.log(table.toString())
            return;
        }
        
        currentConfigObject = currentConfigObject || {};

        let apiKey = args._.includes('apiKey') || args._.includes.apikey || args._.includes('api-key') || args._.includes('key') || args._includes('k');

        if (!apiKey) {
            apiKey = currentConfigObject.apiKey;
        }

        if (!validateApiKey(apiKey)) {
            return;
        }
    
        let cityId = args._.includes('city') || args._.includes('cityId') || args._.includes('cityID') || args._.includes('city-id') || args._.includes('c');
        if (!cityId) {
            cityId = currentConfigObject.cityId || 4862034;
            cityId = Number(cityId);
        }
        if (!validateCityId(cityId)) {
            return;
        }
    
        let units = args._.includes('units') || args._.includes('unit') || args._.includes('u');
        if (!units) {
            units = currentConfigObject.units || 'Kelvin';
        }
        if (!validateUnits(units)) {
            return;
        }

        config.set(configKey, { apiKey: apiKey, cityId: cityId, units: units });
    }
};