const router = require('express').Router();
const {
    getThoughts,
    postThought,
} = require('../../controllers/thoughtsController');

router.route('./').get(getThoughts).post(postThought);

module.exports = router;