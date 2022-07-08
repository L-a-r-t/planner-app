import express from 'express';
const app = express.Router();

// import controller
import * as controllers from '../controllers/calendars';

// import middleware
import {checkJWT, getEmail} from '../middleware'

app.post('/create', checkJWT, getEmail, controllers.create);
app.post('/:id/update', checkJWT, getEmail, controllers.update);
app.post('/:id/add', checkJWT, getEmail, controllers.add);
app.post('/:id/delete/:index', checkJWT, getEmail, controllers.deleteRow);
app.post('/:id', checkJWT, getEmail, controllers.get);

export default app; 