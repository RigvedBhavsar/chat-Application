const {Router} = require ('express'); 
const router = Router();
const authController = require('../controllers/authControllers');

router.post('/signup',authController.signup)

router.post('/login',authController.login)

router.get('/logout',authController.logout)

router.get('/verifyuser', authController.verifyuser)

module.exports = router;