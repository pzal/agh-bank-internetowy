import React, {useState} from 'react'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {SIDEBAR_WIDTH} from '../App'

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    marginLeft: SIDEBAR_WIDTH,
  },
}))

export default function Appbar() {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          <Switch>
            <Route path="/home">
              Start
            </Route>
            <Route path="/transfers/new">
              Nowy przelew
            </Route>
            <Route path="/transfers/all">
              Wszystkie przelewy
            </Route>
            <Route path="/contacts/all">
              Kontakty
            </Route>
            <Route path="/contacts/new">
              Nowy kontakt
            </Route>
          </Switch>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
