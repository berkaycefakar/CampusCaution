const config = {
  development: {
    API_URL: 'http://localhost:3000/api' // Backend'inizin çalıştığı port
  },
  production: {
    API_URL: 'https://your-production-api.com/api' // Production API URL'inizi buraya yazın
  }
}

const environment = process.env.NODE_ENV || 'development'
export const API_URL = config[environment].API_URL 