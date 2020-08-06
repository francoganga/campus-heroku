import express from 'express';
import { createGraphRequest, test } from '../controller/api-controller';

const router = express.Router();

router.route('/createGraph').post(createGraphRequest);
router.route('/test').get(test);

export = router;
