const axios = require('axios')

let baseUrl = 'https://api.weatherbit.io/v2.0/'

module.exports = {
    getCurrent: async (config, configKey) =>{
        let currentConfigObject = config.get(configKey);
        
        let unit = 'I';
        if(unit === 'C')
            unit = 'S'
        
        let url = baseUrl + `current?city_id=${currentConfigObject.cityId}&key=${currentConfigObject.apiKey}&units=${unit}`;
        let data = await axios({
            method: 'get',
            url: url
          });
        return data.data.data;
    },
    getForecast: async (config, configKey) => {
        let currentConfigObject = config.get(configKey);
        
        let unit = 'I';
        if(unit === 'C')
            unit = 'S'
        let url = baseUrl + `forecast/daily?city_id=${currentConfigObject.cityId}&key=${currentConfigObject.apiKey}&units=${unit}`;
        let data = await axios({
            method: 'get',
            url: url
          });
        return data.data;
    }
}