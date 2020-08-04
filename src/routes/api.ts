import express from 'express';
import { createData } from '../controller/api-controller';

const router = express.Router();

router.route('/').post(createData);

export = router;
