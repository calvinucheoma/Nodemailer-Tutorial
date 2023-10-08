const router = require('express').Router();
const { signup, getBill, sendEmail } = require('../controller/appController');

/**HTTP Request */
router.post('/user/signup', signup);
router.post('/product/getBill', getBill);
router.post('/email/sendEmail', sendEmail);

module.exports = router;
