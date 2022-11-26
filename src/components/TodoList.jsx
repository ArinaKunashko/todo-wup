import React from 'react'
import Stack from '@mui/material/Stack'
import TodoItem from './TodoItem'

/**
 * Component for list of todo item
 *
 * @component
 * @param {object} props Component props
 * @param {array} props.filteredTodos
 * @param {function} props.setTodos
 * @param {function} props.setItemCompleted
 * @param {function} props.deleteItem
 * @param {function} props.editItem
 */
const TodoList = ({ filteredTodos, setTodos, setItemCompleted, deleteItem, editItem }) => {
    return (
        <Stack gap={4}>
                {filteredTodos.map(todo => (     
                    <TodoItem {...todo} 
                        key={todo.id}
                        setTodos={setTodos}
                        setItemCompleted={setItemCompleted}
                        deleteItem={deleteItem}
                        editItem={editItem}
                        />
                ))
    }
    </Stack>
)  
}

export default TodoList
