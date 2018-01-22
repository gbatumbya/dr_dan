var http = require('http')
var url = require('url')
var cloudinary = require('cloudinary');

//create a server object:
http.createServer(function(req, res) {
   try {
      var ticket_number = url.parse(req.url, true).pathname.split("/")[2];

      if (!ticket_number || parseInt(ticket_number) < 0) {
         throw "Malformed request";
      }

      var number_overlay = {
         text: ticket_number,
         font_family: 'Arial',
         font_size: 36,
         font_weight: 'bold',
         font_style: 'italic',
         letter_spacing: 3
      };

      res.writeHead(200, {
         'Content-Type': 'text/html'
      });
      res.write(
         cloudinary.image("stag.jpg", {
            transformation: [{
                  gravity: 'north',
                  x: 300,
                  y: 829,
                  overlay: number_overlay
               },
               {
                  gravity: 'north',
                  x: 300,
                  y: 1180,
                  overlay: number_overlay
               },
               {
                  height: "0.65",
                  crop: "scale"
               }
            ]
         })
      ); //write a response to the client
   } catch (exception) {
      res.writeHead(400, {
         'Content-Type': 'text/html'
      });
      res.write("" + exception);
   } finally {
      res.end();
   }
}).listen(8080); //the server object listens on port 8080

//