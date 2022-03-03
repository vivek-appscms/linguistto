const axios = require('axios')
const urlMetadata = require('url-metadata')

exports.handler = function (event, context, callback) {
  // your server-side functionality
  request_data = event['queryStringParameters']
  name = request_data['name']

  const send = (body) => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Request-With, Content-Type , Accept',
      },
      body: JSON.stringify(body),
    })
  }
  //   Perform APi Call
  const getMetaChecker = async () => {
    urlMetadata(name).then(function (metadata) {
      send(metadata)
    })
  }

  //   Make sure method is GET
  if (event.httpMethod == 'GET') {
    getMetaChecker()
  }
}
