import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './Models/User';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb://localhost:27017/crud`);

app.get('/', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({err});
    }
});

app.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({err});
    }
});


app.post('/', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({err});
    }
});

app.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findByIdAndUpdate(id, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.json(user);
    } catch (err) {
        res.status(500).json({err});
    }
});

app.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const response = await UserModel.findByIdAndDelete(id);
        res.json(response);
    } catch (err) {
        res.status(500).json({err});
    }
});

app.listen(9090, () => {
    console.log("Server is Running");
});
