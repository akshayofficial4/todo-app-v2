import {
    createTodo,
    getUserTodos,
    updateTodo,
    deleteTodo,
} from '../todos/todo.service.js';

import { reorderTodos } from '../todos/todo.service.js';

export const create = async(req , res) => {
    const todo = await createTodo({
        title: req.body.title,
        userId: req.user._id,
    });

    res.status(201).json(todo);
};

export const getAll = async ( req , res ) => {
    const todos = await getUserTodos(req.user._id);
    res.json(todos);
};

export const update = async ( req , res ) => {
    const todo = await updateTodo({
        todoId: req.params.id,
        userId: req.user._id,
        data: req.body,
    });

    res.json(todo);
};

export const remove = async ( req , res ) => {
    await deleteTodo({
        todoId: req.params.id,
        userId: req.user._id,
    });
    res.status(204).end();
};

export const reorder = async ( req , res ) => {
    await reorderTodos({
        userId: req.user._id,
        items: req.body.items,
    });
    res.json({ message: "Todos reordered" })
};

