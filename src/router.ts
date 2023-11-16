import { Router } from 'express'
import { body } from 'express-validator'
import { updateFavs } from './handlers/user';

const router = Router()

router.put('/user/:username/favs', [
  body('fourFavs')
    .isArray().withMessage('favs must be an array')
    .custom(value => value.every(item => typeof item === 'number')).withMessage('All elements in favs must be numbers'),
], updateFavs)

export default router
