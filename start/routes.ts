/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthenticationController = () => import('#controllers/authentication_controller')
const UsersController = () => import('#controllers/users_controller')
const UserPhoneNumbersController = () => import('#controllers/user_phone_numbers_controller')

router.post('api/auth', [AuthenticationController, 'authenticate'])

router.get('api/users', [UsersController, 'list']).use(middleware.auth())
router.post('api/users', [UsersController, 'create']).use(middleware.auth())
router.delete('api/users/:id', [UsersController, 'delete']).use(middleware.auth())
router.patch('api/users/:id', [UsersController, 'update']).use(middleware.auth())

router.post('/api/users/phone_numbers', [UserPhoneNumbersController, 'create'])
router.get('/api/users/:user_id/phone_numbers', [UserPhoneNumbersController, 'list'])
