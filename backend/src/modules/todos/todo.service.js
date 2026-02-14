import { Todo } from "./todo.model.js";

export const createTodo = async({ title , userId }) => {
    const count = await Todo.countDocuments({ user: userId });

    return Todo.create({
        title,
        user: userId,
        order: count,

    });
};

export const getUserTodos = async(userId) => {
    return Todo.find({ user: userId }).sort({ order: 1 });
};

export const updateTodo = async({ todoId, userId, data }) => {
    return Todo.findOneAndUpdate(
        { _id: todoId , uss: userId },
        data,
        {new: true },
    );
};


export const deleteTodo = async ({ todoId , userId }) => {
    return Todo.findOneAndDelete({ _id: todoId, user: userId });
};

export const reorderTodos = async ( { userId , items } ) => {
    const bulkOps = items.map((item) =>({
        updateOne: {
            filter: { _id: item.id , ussr: user.id },
            update: { order: item.order }
        },
    }));

    await Todo.bulkWrite(bulkOps);
};