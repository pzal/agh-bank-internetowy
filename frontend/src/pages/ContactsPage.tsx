import React, {Fragment, useState} from 'react'
import axios from 'axios'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import {SIDEBAR_WIDTH} from '../App'
import {useAsync} from 'react-async'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { useApiGet } from '../utils/api'

export default function ContactsPage() {
  const {data: response, isPending} = useApiGet(`${process.env.REACT_APP_API_URL}/users/contacts/`)

  return (
    <Fragment>
      <Grid container alignItems="center" spacing={5}>
        {/* <Grid item>
          <Typography variant="h5">Lista kontaktów</Typography>
        </Grid> */}
        <Grid item>
          <Link to='/contacts/new'>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PersonAddIcon />}
          >
            Nowy kontakt
          </Button>
          </Link>
        </Grid>
      </Grid>
      <List>
        {response?.map(
          (contact: {name: string; id: string; account_number: string}) => (
            <ListItem key={contact.id}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={contact.account_number}
              />
            </ListItem>
          ),
        )}
      </List>
    </Fragment>
  )
}
