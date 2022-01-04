/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

import express from 'express';

const router = express.Router();

/**
 * @swagger
 * path:
 *  /health:
 *    get:
 *      summary: Get the health of the application
 *      tags: [Health]
 *      responses:
 *        "200":
 *          description: An object with health OK for now...
 */

router.get('/', (req, res) => {
  res.status(200).json({ health: 'OK' });
});

export default router;
