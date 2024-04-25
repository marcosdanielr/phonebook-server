/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UserController = () => import('#controllers/user_controller')
import router from '@adonisjs/core/services/router'

router.get('users', [UserController, 'list'])
