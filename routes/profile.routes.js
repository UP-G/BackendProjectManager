const Router = require('express')
const router = new Router()
const ProfileController = require('../controller/profile.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/photo/', authMiddleware, ProfileController.uploadPhoto)
router.get('/getp', function (req, res) {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.write('<img src="/static/user-4/avatar/X7UkOPLOKsuR8N6s0x6Lxw.png" alt="альтернативный текст" />');
    res.write('<link rel="stylesheet">');
    res.write('<form action="/apiV0/photo" enctype="multipart/form-data" method="post">');
    res.write('<input type="file" class="form-control-file" name="avatar">');
    res.write('<input type="text" class="form-control" placeholder="Number of speakers" name="user_id">');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
})

module.exports = router
