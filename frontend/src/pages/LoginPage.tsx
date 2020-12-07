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
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
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
import {useApiGet, apiPost} from '../utils/api'
import {setEmailInCookie, setApiKeyInCookie} from '../utils/cookies'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: '100%',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 700px;
  padding-top: 100px;

  .MuiFormControl-root {
    width: 100%;
  }
`

function LoginPage() {
  const classes = useStyles()

  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showFailure, setShowFailure] = React.useState(false)
  const [email, setEmail] = React.useState<any>('admin@example.com')
  const [password, setPassword] = React.useState('secret')

  const onSave = () => {
    setShowSuccess(false)
    setShowFailure(false)

    apiPost(`${process.env.REACT_APP_API_URL}/users/api-token-auth/`, {
      email,
      password,
    })
      .then(res => {
        console.log('res', res)
        setShowSuccess(true)
        setApiKeyInCookie(res.data.token)
        setEmailInCookie(email)
      })
      .catch(err => {
        console.log('err', err)
        setShowFailure(true)
      })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Iksde Bank
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ContentWrapper>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                id="filled-helperText"
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                // defaultValue="Default Value"
                // helperText="Some important text"
                fullWidth
                variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                id="filled-helperText"
                label="Hasło"
                value={password}
                onChange={e => setPassword(e.target.value)}
                // defaultValue="Default Value"
                // helperText="Some important text"
                type="password"
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
              >
                Zaloguj
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
                  Zalogowano.
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
                  Dane są niepoprawne.
                </Alert>
              </Collapse>
            </Grid>
          </Grid>
        </ContentWrapper>
      </main>
    </div>
  )
}

export default LoginPage
