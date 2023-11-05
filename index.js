const express = require('express');
const cors = require('cors');

//routerApi para clasificar las rutas en archivos distintos y mantener un orden. Este requiere la carpeta de rutas.
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

//usar middleware
app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Domain not allowed!'));
    }
  }
}
app.use(cors(options));
//app.use(cors()); //Habilitar que cualquier dominio pueda acceder a los datos del servidor. sin esto, ningun usuario externo al dominio que esta utilizando esto le saldra un error de bloqueo por CORS.

app.get('/', (req, res) => {
  res.send('Mi primer express');
});

app.get('/new-route', (req, res) => {
  res.send('Hola! Soy una nueva ruta o endpoint');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi puerto es: ' + port);
});
