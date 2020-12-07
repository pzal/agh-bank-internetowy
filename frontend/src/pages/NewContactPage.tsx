import React, {Fragment, useState} from 'react'
import axios from 'axios'
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
import TextField from '@material-ui/core/TextField'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import SaveIcon from '@material-ui/icons/Save'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import { apiPost, useApiGet } from '../utils/api'

const ContentWrapper = styled.div`
  max-width: 700px;
`

export default function NewContactPage() {
  const {data: response, isPending} = useApiGet(`${process.env.REACT_APP_API_URL}/users/contacts/`)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showFailure, setShowFailure] = React.useState(false)
  const [name, setName] = React.useState('')
  const [accountNumber, setAccountNumber] = React.useState('')

  const onSave = () => {
    setShowSuccess(false)
    setShowFailure(false)

    apiPost(`${process.env.REACT_APP_API_URL}/users/contacts/`, {name, account_number: accountNumber})
      .then(res => {
        console.log('res', res)
        setShowSuccess(true)
      })
      .catch(err => {
        console.log('err', err)
        setShowFailure(true)
      })
  }

  return (
    <Fragment>
      {/* <Typography variant="h5" gutterBottom>Nowy kontakt</Typography> */}
      <ContentWrapper>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              id="filled-helperText"
              label="Nazwa"
              value={name}
              onChange={e => setName(e.target.value)}
              // defaultValue="Default Value"
              // helperText="Some important text"
              fullWidth
              variant="filled"
            />
          </Grid>
          <Grid item>
            <TextField
              id="filled-helperText"
              label="Numer konta"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              // defaultValue="Default Value"
              // helperText="Some important text"
              fullWidth
              variant="filled"
            />
          </Grid>
          <Grid item>
            <Button
              onClick={onSave}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Zapisz
            </Button>
          </Grid>
          <Grid item>
            <Collapse in={showSuccess}>
              <Alert
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowSuccess(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Kontakt dodany.
              </Alert>
            </Collapse>
            <Collapse in={showFailure}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowFailure(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Nie udało się dodać kontaktu.
              </Alert>
            </Collapse>
          </Grid>
        </Grid>
      </ContentWrapper>
    </Fragment>
  )
}
