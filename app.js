const cluster = require('cluster');
const express = require('express');
const os = require('os');
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    cluster.fork();
  });
}
else {
  const app = express();
  app.use(express.static(__dirname + '/public'));
  app.get('/', (req, res) => res.render('index'));

  app.listen(port);
}
