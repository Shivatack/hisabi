const express = require('express');
const router = express.Router();
const users = require('../services/users');

/**
 * GET users
 */
router.get('/', async (req, res, next) => {
    try {
        res.json(await users.getMultiple(req.query.page));
    } catch(err) {
        console.error(`Error while getting users: `, err.message);
        next(err);
    }
});

/**
 * POST user
 */
router.post('/', async (req, res, next) => {
    try {
        res.json(await users.create(req.body));
    } catch(err) {
        console.error(`Error while creating user: `, err.message);
        next(err);
    }
});

/**
 * PUT user
 */
 router.put('/:id', async (req, res, next) => {
    try {
        res.json(await users.update(req.params.id, req.body));
    } catch(err) {
        console.error(`Error while updating user: `, err.message);
        next(err);
    }
});

module.exports = router;