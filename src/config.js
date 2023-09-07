const envConfig = require(`./../config/env.${environment.NODE_ENV}`)
export const config = Object.assign({}, environment, envConfig, {
    botId: envConfig.REACT_APP_BOTID || "2RON6R80PC",
    botAliasId: envConfig.REACT_APP_BOTALIASID || "TSTALIASID",
    apiUri: envConfig.REACT_APP_API_URL || ""
});