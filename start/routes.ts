/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const AuthenticationController = () => import('#controllers/authentication_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('api/auth', [AuthenticationController, 'authenticate'])

router.get('api/users', [UsersController, 'list']).use(middleware.auth())
router.post('api/users', [UsersController, 'create']).use(middleware.auth())
router.delete('api/users/:id', [UsersController, 'delete']).use(middleware.auth())
