import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import BatchController from "./batches/controller"
import setupDb from './db'
import UserController from './users/controller';
// const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [
       BatchController,
       UserController
    ]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))
