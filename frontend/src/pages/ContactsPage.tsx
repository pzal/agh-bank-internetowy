import React, {Fragment, useState} from 'react'
import axios from 'axios'
import {SIDEBAR_WIDTH} from '../App'
import {useAsync} from 'react-async'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

export default function ContactsPage() {
  return (
    <Fragment>
      <Typography paragraph>contacts</Typography>
    </Fragment>
  )
}
