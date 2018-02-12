import express from 'express';

import * as favController from '../controllers/fav.server.controller';
const router = express.Router();

router.route('/')
  .get(favController.getFavs)
  .post(favController.addFav)
  .put(favController.updateFav)


router.route('/:favId')
  .get(favController.getFav)
  .delete(favController.deleteFav)
  .put(favController.deleteItem);




export default router;