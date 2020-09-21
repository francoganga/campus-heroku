import express from 'express';
import { getGraphData, insertPoint } from '../controller/api-controller';

const router = express.Router();

router.route('/points').get(getGraphData);
router.route('/point').post(insertPoint);

export = router;
