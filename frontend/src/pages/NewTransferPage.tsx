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

const ContentWrapper = styled.div`
  max-width: 700px;

  .MuiFormControl-root {
    width: 100%;
  }
`

interface Contact {
  id: any
  name: string
}

export default function NewTransferPage() {
  const {data: contactsResponse} = useApiGet(
    `${process.env.REACT_APP_API_URL}/users/contacts/`,
  )
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showFailure, setShowFailure] = React.useState(false)
  const [recipientId, setRecipientId] = React.useState('')
  const [amount, setAmount] = React.useState('')

  const onSave = () => {
    setShowSuccess(false)
    setShowFailure(false)

    apiPost(`${process.env.REACT_APP_API_URL}/transfers/`, {recipient: recipientId, amount})
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
            <FormControl variant="filled">
              <InputLabel id="demo-simple-select-filled-label">
                Adresat
              </InputLabel>
              <Select
                value={recipientId}
                onChange={e => {
                  const recipientId = e.target.value as string
                  setRecipientId(recipientId )}
                }
              >
                {contactsResponse?.map((contact: Contact) => (
                  <MenuItem key={contact.id} value={contact.id}>
                    {contact.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              id="filled-helperText"
              label="Kwota"
              value={amount}
              onChange={e => setAmount(e.target.value)}
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
                Przelew dodany.
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
                Nie udało się dodać przelewu.
              </Alert>
            </Collapse>
          </Grid>
        </Grid>
      </ContentWrapper>
    </Fragment>
  )
}
