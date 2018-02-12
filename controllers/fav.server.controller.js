import mongoose from 'mongoose';

import fav from '../models/fav.server.model';

export const getFavs = (req, res) => {
  fav.find().exec((err, favs) => {
    if (err) {
      return res.json({
        'success': false,
        'message': 'Some Error'
      });
    }
    return res.json({
      'succes': true,
      'message': 'favs fetched successfully',
      favs
    });
  });
}

export const addFav = (req, res) => {
  const newFav = new fav(req.body);
  newFav.save((err, fav) => {
    if (err) {
      return res.json({
        'success': false,
        'message': 'Some Error'
      });
    }
    return res.json({
      'success': true,
      'message': 'fav added successfully',
      fav
    });
  })
}

export const updateFav = (req, res) => {

  fav.findByIdAndUpdate({
      _id: req.body._id
    }, {
      $push: {
        idList: req.body.newId
      }
    }, {
      safe: true,
      upsert: true
    },
    (err, fav) => {
      if (err) {
        return res.json({
          'succes': false,
          'message': 'some error',
          'error': err
        });
      }
      return res.json({
        'succes': true,
        'message': 'fav finded and updated',
      });
    })
}


export const getFav = (req, res) => {
  fav.find({
    _id: req.params.favId
  }).exec((err, fav) => {
    if (err) {
      return res.json({
        'success': false,
        'message': 'Some Error'
      });
    }
    if (fav.length) {
      console.log(req.params.id);
      return res.json({
        'success': true,
        'message': 'fav fetched by id successfully',
        fav
      });
    } else {
      return res.json({
        'success': false,
        'message': 'fav with the given id not found'
      });
    }
  })
}
export const deleteFav = (req, res) => {
  fav.findByIdAndRemove(req.params.favId, (err, fav) => {
    if (err) {
      return res.json({
        'success': false,
        'message': 'Some Error'
      });
    }
    return res.json({
      'success': true,
      'message': ' deleted successfully'
    });
  })
}

export const deleteItem = (req, res) => {
  fav.update({
    _id: req.params.favId
  }, {
    "$pull": {
      "idList": {
        "_id": req.body.favToRemove
      }
    }
  }, {
    safe: true,
    multi: true
  }, function(err, obj) {
    if (err) {
      return res.json({
        'succes': false,
        'message': 'some error',
        'error': err
      });
    }
    return res.json({
      'succes': true,
      'message': 'fav finded and updated',
    });
  });
}