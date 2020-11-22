import React, {useState} from 'react'
import axios from 'axios'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import Appbar from './components/Appbar'
import {useAsync} from 'react-async'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import styled from 'styled-components'
import NavigationLinks from './components/NavigationLinks'
import PageRoutes from './components/PageRoutes'

const PING_URL = `${process.env.REACT_APP_API_URL}/ping`
const pingAPI = () =>
  axios.get(PING_URL).then(response => {
    return response
  })

const BrandName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    font-size: 1.6rem;
    font-weight: 700;

    color: rgb(88, 85, 116);
  }
`

export const SIDEBAR_WIDTH = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    marginLeft: SIDEBAR_WIDTH,
  },
  drawer: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))

function App() {
  const {data: response, isPending} = useAsync({promiseFn: pingAPI})

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <BrandName className={classes.toolbar}>
          <Link to="/home">Iksde Bank</Link>
        </BrandName>
        <Divider />
        <NavigationLinks />
      </Drawer>
      <Appbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <PageRoutes />
      </main>
    </div>
  )
}

export default App
