var express = require('express');
var router = express.Router();
const controller = require('../controller/admin.controller');

router.get('/nguoidung', controller.showUserList);

router.get('/danhmuc', controller.showCategory);

router.get('/danhmuc/edit/:id', controller.getCategoryById);

router.post('/danhmuc/patch', controller.editCategory);

router.post('/danhmuc/del', controller.deleteCategory);

router.get('/', controller.getWaitingUser);

router.get('/:username/accept', controller.acceptWaitingUser);

router.get('/:username/delete', controller.declineWaitingUser);

module.exports = router;