import express from 'express';
const app = express.Router();

// import controller
import * as controllers from '../controllers/calendars';

app.get('/:id', controllers.get);
app.post('/create', controllers.create);
app.post('/:id/update', controllers.update);
app.post('/:id/add', controllers.add);
app.post('/:id/delete/:index', controllers.deleteRow);

export default app; 