const http = require('http')
const options = {
  host: '52weekchallenge-dev.us-west-2.elasticbeanstalk.com',
  path: '/api/worker',
  method: 'GET'
}

exports.handler = (event, context, callback) => {
  const req = http.request(options, (res) => {
    let body = ''
    console.log('Status:', res.statusCode)
    res.setEncoding('utf8')
    res.on('data', (chunk) => body += chunk)
    res.on('end', () => {
      // If we know it's JSON, parse it
      if (res.headers['content-type'] === 'application/json') {
        body = JSON.parse(body)
      }
      console.log('Body', body)
      callback(null, body)
    })
  }).end()
}
