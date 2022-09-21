const request = require('request');
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  // Everything is okay.
  console.log(req.path);
  console.log(req.query);
  console.log(req.headers);

  let p = req.path.replace('/nhkchanproxy', '');


  if (req.method === 'POST') {
    request(
      {
        url: 'https://api.mangadex.org' + p,
        method: req.method,
        body: req.body,
        headers: {
          "Content-Type": "application/json"
        }
      }, function (error, response, body) {

      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.append('Access-Control-Allow-Headers', 'Content-Type');

      if (error) {
        console.log('error:', error); // Print the error if one occurred
        res.status(500).send(`{ "status": "Error", "description": ${error} }`);
      } 
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
      console.log('body:', body); //Prints the response of the request.
      res.status(200).send(body);
    });
  } else if (req.method === 'GET') {
    request(
      {
        url: 'https://api.mangadex.org' + p,
        method: req.method,
        qs: req.query
      }, function (error, response, body) {
      if (error) {
        console.log('error:', error); // Print the error if one occurred
        res.status(500).send(`{ "status": "Error", "description": ${error} }`);
      } 
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
      console.log('body:', body); //Prints the response of the request.

      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.append('Access-Control-Allow-Headers', 'Content-Type');
      res.status(200).send(body);
    });
  } else {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send("success");
  }

};
