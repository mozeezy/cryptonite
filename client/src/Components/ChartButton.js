import { makeStyles } from '@material-ui/core'
import React from 'react'

const ChartButton = ({children, selected, onClick}) => {

  const useStyles = makeStyles({
    Select: { 
    border: "1px solid red", 
    borderRadius: 5, 
    padding: 10, 
    paddingLeft: 20,
    paddingRight: 20, 
    cursor: "pointer", 
    backgroundColor: selected ? "red" : " ",
    color: selected ? "black" : " ", 
    fontWeight: selected ? 700 : 500, 
    "&:hover": { backgroundColor: "red", color: "black"}, 
    width: "22%", 
    }
  })

  const classes = useStyles();
  
  return (
    <span className={classes.Select}
    onClick={onClick}
    >{children}
    </span>
  )
}

export default ChartButton