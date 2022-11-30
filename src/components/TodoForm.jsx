import React, { useState, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import UploadIcon from '@mui/icons-material/Upload'
import DeleteIcon from '@mui/icons-material/Delete'
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import dayjs from 'dayjs'

/**
 * Dialog with form for creating or updating todo item
 *
 * @component
 * @param {object} props Component props
 * @param {object} props.cand
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @param {function} props.saveItem
 */
const TodoForm = ({ cand, open, onClose, saveItem }) => {

    const [item, setItem] = useState(cand)

    useEffect(() => {
        if (!cand.duedate) {
            cand.duedate = null
        } else if (cand.duedate.seconds) {
            cand.duedate = dayjs.unix(cand.duedate.seconds)
        }
        setItem(cand)
    }, [cand])

    /**
     * Save item and close todo form
     * 
     * @function saveTodoHandler
     * @param {Event} e - form submit event
     */
    const saveTodoHandler = (e) => {
        e.preventDefault()
        saveItem(item)
        onClose()
    }

    /**
     * Select a file and upload it to storage
     * 
     * @function selectFileHandler
     * @param {Event} e - file input change event
     */
    const selectFileHandler = (e) => {
        e.preventDefault()
        if (e.target.files.length) {
            const file = e.target.files[0]
            const storageRef = ref(storage, file.name)
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    successFileUploadHandler(url)
                })
            })
        }
    }

    /**
     * Add file into todo item's files
     * 
     * @function successFileUploadHandler
     * @param {string} url - url of the file
     */
    const successFileUploadHandler = (url) => {
        const files = item.files ? item.files : []
        files.push(url)
        setItem({ ...item, files: files })
    }

    /**
     * Remove file from todo item's files
     * 
     * @function deleteFileHandler
     * @param {string} url - url of the file
     */
    const deleteFileHandler = (url) => {
        if (!item.files) {
            return
        }
        const files = item.files.filter(v => v !== url)
        setItem({ ...item, files: files })
    }

    return (

        <Dialog onClose={onClose} open={open} fullWidth maxWidth='md' >
            <DialogTitle>{item.id ? 'Edit Todo' : 'Create New Todo'}</DialogTitle>
            <Card sx={{ minWidth: '300px' }}>
                <form onSubmit={saveTodoHandler}>
                    <CardContent>
                        <Stack 
                            sx={{
                                '& .MuiTextField-root': { m: 2,  width: '100%'},
                            }}
                            noValidate
                            autoComplete='off'
                            justifyContent='center'
                            alignItems='center'
                            direction='column' 
                        >

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label='Deadline date'
                                    inputFormat='DD/MM/YYYY'
                                    value={item.duedate}
                                    onChange={(v) => setItem({ ...item, duedate: v })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField
                                label='Title'
                                required
                                value={item.title}
                                onChange={(e) => setItem({ ...item, title: e.target.value })}
                            />
                            <TextField
                                label='Description'
                                multiline
                                rows={5}
                                placeholder='Describtion'
                                value={item.description}
                                onChange={(e) => setItem({ ...item, description: e.target.value })}

                            />
                            {item.files &&
                                <Box>
                                    {item.files.map(f => {
                                        return (
                                            <ButtonGroup key={f} variant='text'>
                                                <Button href={f} target='_blank'>{decodeURI(new URL(f).pathname.split('/').pop())}</Button>
                                                <Button startIcon={<DeleteIcon />} onClick={() => deleteFileHandler(f)} />
                                            </ButtonGroup>)
                                    })}
                                </Box>
                            }
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Stack
                            flex={1}
                            fullWidth
                            direction='row'
                            justifyContent='space-between'
                            spacing={2}
                        >
                            <Button variant='outlined' startIcon={<UploadIcon />} component='label'>
                                <input hidden accept='.*' type='file' onChange={selectFileHandler} />
                                Upload
                            </Button>
                            <Box>
                                <Button variant='contained' size='large' type='submit'>Save</Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </Box>
                        </Stack>
                    </CardActions>
                </form>
            </Card>
        </Dialog>
    )
}

export default TodoForm
