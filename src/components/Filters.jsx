import React from 'react'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

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

    <Stack justifyContent='center' direction='row'>
      <ToggleButtonGroup exclusive  value={status} onChange={statusHandler}>
        <ToggleButton value='uncompleted'>
          Uncompleted
        </ToggleButton>
        <ToggleButton value='overdue'>
          Overdue
        </ToggleButton>
        <ToggleButton value='current'>
          Current
        </ToggleButton>
        <ToggleButton value='completed'>
          Completed
        </ToggleButton>
        <ToggleButton value='all'>
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )
}

export default Filters
