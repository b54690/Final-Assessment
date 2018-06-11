import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import BatchController from "./batches/controller"
import setupDb from './db'
import UserController from './users/controller';
import StudentController from './students/controller';
import LoginController from './logins/controller'
import {Action} from 'routing-controllers'
import {verify} from './jwt'
// const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [
       BatchController,
       UserController, 
       StudentController,
       LoginController
    ],
    authorizationChecker: (action: Action) => {
        const header: string = action.request.headers.authorization
      
        if (header && header.startsWith('Bearer ')) {
          const [ , token ] = header.split(' ')
          return !!(token && verify(token))
        }
        // ...
        return false
      }
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))
