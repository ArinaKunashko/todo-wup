import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import IconButton from '@mui/material/IconButton'
import RemoveDoneIcon from '@mui/icons-material/RemoveDone'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import dayjs from 'dayjs'

/**
 * Container for single todo item with texts and actions
 *
 * @component
 * @param {object} props Component props
 * @param {string} props.id
 * @param {string} props.title
 * @param {string} props.description
 * @param {boolean} props.completed
 * @param {Date} props.duedate
 * @param {Array} props.files
 * @param {function} props.setItemCompleted
 * @param {function} props.deleteItem
 * @param {function} props.editItem
 */
const TodoItem = ({ id, title, description, completed, duedate, files, setItemCompleted, deleteItem, editItem }) => {

  const duedateDayjs = dayjs.isDayjs(duedate) ? duedate : dayjs.unix(duedate.seconds)

  return (

    <Card>
      <CardContent>
        {duedate &&
          <Typography color={!completed && dayjs().isAfter(duedateDayjs) ? 'error' : 'text.secondary'}>
            {duedateDayjs.format('DD/MM/YYYY')}
          </Typography>
        }
        <Typography gutterBottom variant='h5' color={completed ? 'text.disabled' : 'text.primary'}
          sx={{ textDecoration: () => completed ? 'line-through' : 'none' }} >
          {title}
        </Typography>
        <Typography gutterBottom variant='body1' color={completed ? 'text.disabled' : 'text.primary'}>
          {description}
        </Typography>
        {files &&
          <Box>
            {files.map(f => {
              return (
                <Button key={f} href={f} target='_blank'>{decodeURI(new URL(f).pathname.split('/').pop())}</Button>)
            })}
          </Box>
        }
      </CardContent>
      <CardActions>
        {completed
          ? <Button color='secondary' startIcon={<RemoveDoneIcon />} onClick={() => setItemCompleted(id, !completed)}>
            UnComplete
          </Button>
          : <Button startIcon={<DoneAllIcon />} onClick={() => setItemCompleted(id, !completed)}>
            Complete
          </Button>
        }
        <Tooltip title='Edit'>
          <IconButton onClick={() => editItem(id)}>
            <ModeEditOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete'>
          <IconButton onClick={() => deleteItem(id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

export default TodoItem
