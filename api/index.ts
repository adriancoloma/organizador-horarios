import * as express from 'express';
import * as bodyParser from 'body-parser';
import router from './routes';
const path = require('path');
const port = process.env.PORT || 3000;

let app = express();
//app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/api', router);
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../frontend/dist/index.html')));
app.listen(port, () => console.log("Server iniciado en el puerto " + port));
