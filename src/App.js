import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { CssBaseline, createTheme } from '@mui/material/'
import { db } from './firebase'
import { collection, doc, Timestamp, onSnapshot, updateDoc, deleteDoc, addDoc, setDoc } from 'firebase/firestore'
import dayjs from 'dayjs'
import { ThemeProvider } from '@mui/material/styles'
import Filters from './components/Filters'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const theme = createTheme({
  palette: {
    background: {
      default: '#455a64',
    },
    primary: {
      main: '#283593',
    },
    text: {
      white: '#efefef',
    },

    
  },
  typography: {
    h3: {
      fontSize: '5rem',
      lineHeight: 1.06,
    },
  }
})

function App() {

  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('uncompleted')
  const [filteredTodos, setfilteredTodos] = useState([])
  const [open, setOpen] = useState(false)
  const [candidate, setCandidate] = useState({})

  useEffect(() => {
    filterHandler()
  }, [todos, status])

  useEffect(() => {
    onSnapshot(collection(db, 'todos'), (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
  }, [])

  /**
   * Mark todo item as completed or uncompleted in the database
   * 
   * @function setItemCompleted
   * @param {string} id - id of todo item
   * @param {boolean} completed - new completed status of todo item
   */
  const setItemCompleted = (id, completed) => {
    const itemRef = doc(db, 'todos', id)
    updateDoc(itemRef, {
      completed: completed
    })
  }

  /**
   * Create the new item or update the existing item when saving
   * 
   * @function saveItem
   * @param {object} item - todo item
   */
  const saveItem = (item) => {
    item.duedate = item.duedate ? Timestamp.fromDate(item.duedate.$d) : null
    item.completed = item.completed ? item.completed : false
    if (item.id) {
      setDoc(doc(db, 'todos', item.id), item)
    } else {
      addDoc(collection(db, 'todos'), item)
    }
  }

  /**
   * Delete the item from the database
   * 
   * @function deleteItem
   * @param {string} id - id of todo item 
   */
  const deleteItem = (id) => {
    deleteDoc(doc(db, 'todos', id))
  }

  /**
   * Filter todo items array
   * 
   * @function filterHandler
   */
  const filterHandler = () => {
    switch (status) {
      case 'uncompleted':
        setfilteredTodos(todos.filter((todo) => todo.completed === false))
        break
      case 'overdue':
        setfilteredTodos(todos.filter((todo) => todo.completed === false &&
          todo.duedate && dayjs().isAfter(dayjs.isDayjs(todo.duedate) ? todo.duedate : dayjs.unix(todo.duedate.seconds))))
        break
      case 'current':
        setfilteredTodos(todos.filter((todo) => todo.completed === false &&
          todo.duedate && dayjs().isBefore(dayjs.isDayjs(todo.duedate) ? todo.duedate : dayjs.unix(todo.duedate.seconds))))
        break
      case 'completed':
        setfilteredTodos(todos.filter((todo) => todo.completed === true))
        break
      default:
        setfilteredTodos(todos)
        break
    }
  }

  /**
   * Close the todo form
   * @function handleClose
   */
  const handleClose = () => {
    setOpen(false)
  }

  /**
   * Open todo form for creating new item
   * @function handleClickCreate
   */
  const handleClickCreate = () => {
    setCandidate({ title: '', description: '', files: [] })
    setOpen(true)
  }

  /**
   * Open todo form for item editing
   * 
   * @function handleClickEdit
   * @param {string} id - id of todo item 
   */
  const handleClickEdit = (id) => {
    const cand = todos.find(e => id === e.id)
    setCandidate(cand)
    setOpen(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='md'>
        <Stack spacing={5}>
          <Typography variant='h3' align='center' color='white'> Todo List</Typography>
          <Filters status={status}
            setStatus={setStatus}
          />
          <Fab color='primary' sx={{ position: 'fixed', bottom: (theme) => theme.spacing(9) }}
            onClick={handleClickCreate} >
            <AddIcon />
          </Fab>
          <TodoForm
            cand={candidate}
            open={open}
            onClose={handleClose}
            saveItem={saveItem}
          />
          <TodoList
            filteredTodos={filteredTodos}
            setTodos={setTodos}
            setItemCompleted={setItemCompleted}
            deleteItem={deleteItem}
            editItem={handleClickEdit}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default App

