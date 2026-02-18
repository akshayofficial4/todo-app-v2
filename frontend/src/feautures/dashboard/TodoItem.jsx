import React, { useState } from "react";
import { Trash2, CheckCircle, Circle, Pencil } from "lucide-react";

function TodoItem({ todo, onToggle, onDelete, onUpdate  }) {

    const [ isEditing , setIsEditing ] = useState(false);
    const [ editedTitle , setEditedTitle ] = useState(todo.title);

    const handleSave = () => {
        if(!editedTitle.trim()) return;
        onUpdate(todo._id , editedTitle);
        setIsEditing(false);
    }
    

}