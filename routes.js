import express from 'express';
const router = express.Router();

import { globals } from './src/middlewares/middlewares.js';
import home from './src/controllers/Home.js';
import reg from './src/controllers/Register.js';
import login from './src/controllers/Login.js';
import update from './src/controllers/Update.js';


router.get('/', home.index);
router.get('/login', login.index);
router.get('/cadastrar', reg.index);

router.get('/fetchAll/:type?', home.fetchAll);
router.get('/fetchOne/:id/:type?', home.fetchOne);

router.delete('/del', globals.isLoged, update.del);

router.post('/cadastrar', reg.reg);
router.put('/edit', globals.isLoged, update.update);
router.get('/edit', globals.isLoged, update.index);
router.post('/login', login.logIn);
router.get('/logout', login.logout);


export default router;