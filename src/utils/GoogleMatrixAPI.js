const axios = require('axios');
const config = require('../config/config');
const pick = require('../utils/pick');
class GoogleMatrixAPI {
  MATRIX_API_BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  API_KEY = config.matrixAPIKey;
  constructor(srcLatitude, srcLongitude, destLatitude, destLongitude) {
    this.srcLatitude = srcLatitude;
    this.destLatitude = destLatitude;
    this.srcLongitude = srcLongitude;
    this.destLongitude = destLongitude;
  }

  async getDistance() {
    const payload = {
      method: 'get',
      url: `${this.MATRIX_API_BASE_URL}?origins=${this.srcLatitude}%2C${this.srcLongitude}&destinations=${this.destLatitude}%2C${this.destLongitude}&key=${this.API_KEY}`,
      headers: {},
    };
    var response = await axios(payload);
    //Due to billing method not set we will be using default repsonse
    response = {
      destination_addresses: ['JPM7+FC3, Jahanabad, Uttar Pradesh 262001, India'],
      origin_addresses: ['47/48, Kailashpuri, Sikandra, Agra, Uttar Pradesh 282007, India'],
      rows: [
        {
          elements: [
            {
              distance: { text: '271 km', value: 271176 },
              duration: { text: '6 hours 22 mins', value: 22921 },
              status: 'OK',
            },
          ],
        },
      ],
      status: 'OK',
    };
    return response.rows[0].elements[0].distance.text;
  }
}

module.exports = GoogleMatrixAPI;
