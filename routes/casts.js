'use strict'

const router  = require('express').Router()
const casts   = require('../controllers/casts')

router.get  ('/',           casts.getCasts    )
router.get  ('/add',        casts.addGetCast  )
router.post ('/add',        casts.addPostCast )
router.get  ('/:id/edit',   casts.editGetCast )
router.post ('/:id/edit',   casts.editPostCast)
router.get  ('/:id/delete', casts.deleteCast  )
router.get  ('/:id/movies', casts.moviesCast  )

module.exports = router