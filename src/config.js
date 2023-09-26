const envConfig = require(`./../config/env.${environment.NODE_ENV}`)
const siteId = sessionStorage.getItem('siteid')
const siteConfig = require('./siteSettings');
export const config = Object.assign({}, environment, envConfig, {
    apiUri: envConfig.REACT_APP_API_URL || "",
    siteSettings: siteConfig[siteId]
});
