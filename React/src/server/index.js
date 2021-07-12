// server/index.js
import React from 'react'
import express from 'express';
import ReactDOMServer from 'react-dom/server.js';
import Home from '../containers/Home.js';

const app = express();
const content = ReactDOMServer.renderToString(<Home />);

app.get('/', function (req, res) {
  res.send(
    `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `
  );
})
app.listen(3001, () => {
  console.log('listen:3001')
})

