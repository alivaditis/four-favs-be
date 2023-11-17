import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware';
import { updateFavs } from './handlers/user';

const router = Router()

router.put('/user/:username/favs', [
  body('fourFavs')
    .isArray().withMessage('favs must be an array')
    .custom(value => value.every(item => typeof item === 'number')).withMessage('All elements in favs must be numbers'),
], handleInputErrors, updateFavs)

router.use((err, req, res, next) => {
  console.log(err)
  res.json({message:'in router handler'})
})

export default router
