import express from 'express';
import { test, getGraphData } from '../controller/api-controller';

const router = express.Router();

router.route('/points').get(getGraphData);
router.route('/test').get(test);

export = router;
