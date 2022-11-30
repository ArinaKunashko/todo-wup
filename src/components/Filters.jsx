import React from 'react'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Grid } from '@mui/material'


/**
 * Component with filter button for filter list of todo item
 * 
 * @component
 * @param {object} props Component props
 * @param {string} props.status Is a current status of filter
 * @param {function} props.setStatus Set state for fiter status function
 */
const Filters = ({ status, setStatus }) => {

  /**
   * Sets the status of todo items
   * 
   * @function statusHandler
   * @param {Event} e - toggle button change event
   */
  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  return (

    <Stack justifyContent='center' justifyItems='center' >
      <Grid contaiter direction='row' alignSelf='center' >
      <ToggleButtonGroup exclusive  value={status} onChange={statusHandler} sx={{backgroundColor: 'white', width:'380px'}} >
        <ToggleButton value='uncompleted' sx={{width:'120px'}}>
          Uncompleted 
        </ToggleButton>
        <ToggleButton value='overdue' sx={{width:'75px'}}>
          Overdue
        </ToggleButton>
        <ToggleButton value='current' sx={{width:'75px'}}>
          Current
        </ToggleButton>
        <ToggleButton value='completed' sx={{width:'90px'}}>
          Done
        </ToggleButton>
        <ToggleButton value='all'>
          All
        </ToggleButton>
      </ToggleButtonGroup>
      </Grid>
    </Stack>
  )
}

export default Filters
