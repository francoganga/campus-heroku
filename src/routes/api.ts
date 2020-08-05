import express from 'express';
import { createData, test } from '../controller/api-controller';

const router = express.Router();

router.route('/').post(createData);
router.route('/test').get(test);

export = router;
