// server/index.js
'use strict';

const app = require('./app');

const PORT = process.env.PORT || 9001;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`App listening on port ${PORT}`);
});