import express from 'express'
import {UserController} from "../controllers/UserController";

const routes = express.Router()

const userController = new UserController();

routes.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({message: 'API Request'})
})

//TODO: pegar as informações do usuário para validar um token
routes.post('/login', (req: express.Request, res: express.Response) => {
    console.log(req.body);
    res.status(200).json({message: 'API Request', user: req.body.user, password: req.body.password})
})

routes.post('/user', userController.createUser);
routes.get('/user/:email', userController.getUser);
routes.get('/users', userController.listUsers);
routes.put("/user/:id", userController.updateUser);
routes.delete("/user/:id", userController.deleteUser);

export default routes