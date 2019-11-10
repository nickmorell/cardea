const apis = [
    {
        name: 'weatherBit',
        baseUrl: 'https://api.weatherbit.io/v2.0/',
        website: 'https://weatherBit.io',
        displayName: 'weatherbit.io'
    }
]

const configSelector = 'api-selector'

module.exports = {
    apiSelector: configSelector,
    setDefault: (args, config) => {
        if(!args.default) {
            require('./error') ('No api specified', true)
        }

        let result = apis.filter(option => option.name === args.default)
        
        if(result.length === 0) {
            require('./error') (`${args.default} is not a valid api.`,true)
        }

        config.set(configSelector,result[0])
        console.log(`Set ${result[0].displayName} has been set as your default api`)
    },
    getCurrentApi: (config) => {
        api = config.get(configSelector)

        if(!api) {
            api = apis[0];
        }

        return api
    },
    getApi: (name) => {
        return apis.filter(option => option.name == name)[0]
    }

}