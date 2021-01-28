const https = require('https');

const httpsGetRequest = (options, resolve, reject) => {
  https.get(options, res => {
    const chunks = [];

    res.on("data", chunk => {
      chunks.push(chunk)
    });

    res.on("end", chunk => {
      const body = Buffer.concat(chunks);
      resolve(JSON.parse(body.toString()));
    });

    res.on("error", error => {
      console.error(error);
      reject(error);
    });
  })
}

module.exports = {
  httpsGetRequest: httpsGetRequest
}