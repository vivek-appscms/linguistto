const axios = require('axios')

exports.handler = function (event, context, callback) {
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

const getWebsiteCounter =  () => {
     axios
      .get(name)
      .then((res) => send(res.data))
      .catch((err) => send(err))
  }

  //   Make sure method is GET
  if (event.httpMethod == 'GET') {
    getWebsiteCounter()
  }
 
}
