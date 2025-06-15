const express = require('express');
const { createMenu,
  allMenu, singleMenu, updatedMenu, deleteMenu } = require('../controllers/menuController');
const router = express.Router();

//post request to create a new menu item
router.post('/menu', createMenu);
//get request to get all menu items
router.get('/menu', allMenu);
//get request to get a single menu item by id
router.get('/menu/:id', singleMenu);
//put request to update a menu item by id
router.put('/menu/:id', updatedMenu);
//delete request to delete a menu item by id
router.delete('/menu/:id', deleteMenu);

module.exports = router;