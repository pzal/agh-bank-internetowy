import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import CircularProgress from '@material-ui/core/CircularProgress'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import styled from 'styled-components'
import { useApiGet } from '../utils/api'

const Spacing = styled.div`
  height: 20px;
`

interface Contact {
  id: any
  name: string
  account_number: string
}

interface Transfer {
  id: any
  recipient: Contact
  amount: string
  pending: boolean
}

export default function AllTransfersPage() {
  const {data: data, isPending} = useApiGet(`${process.env.REACT_APP_API_URL}/transfers/?full_serializer=true`)

  let pendingTransfers = null
  let finishedTransfers = null

  if (isPending) {
    return <CircularProgress/>
  }

  if (data) {
    pendingTransfers = data.filter(
      (transfer: Transfer) => transfer.pending,
    )
    finishedTransfers = data.filter(
      (transfer: Transfer) => !transfer.pending,
    )
  }

  return (
    <Fragment>
      <Grid container alignItems="center" spacing={5}>
        <Grid item>
          <Link to="/transfers/new">
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PersonAddIcon />}
            >
              Nowy przelew
            </Button>
          </Link>
        </Grid>
      </Grid>
      {pendingTransfers && pendingTransfers.length > 0 && (
        <Fragment>
          <Spacing />
          <Typography variant="h5">Oczekujące przelewy</Typography>
          <List>
            {pendingTransfers &&
              pendingTransfers.length > 0 &&
              pendingTransfers.map((transfer: Transfer) => (
                <ListItem key={transfer.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <DoubleArrowIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Przelew wychodzący: ${transfer.recipient.name}`}
                    secondary={transfer.amount}
                  />
                </ListItem>
              ))}
          </List>
        </Fragment>
      )}
      <Spacing />
      <Typography variant="h5">Zrealizowane przelewy</Typography>
      <List>
        {finishedTransfers && finishedTransfers.length === 0 && (
          <div>Brak przelewów.</div>
        )}
        {finishedTransfers &&
          finishedTransfers.length > 0 &&
          finishedTransfers.map((transfer: Transfer) => (
            <ListItem key={transfer.id}>
              <ListItemAvatar>
                <Avatar>
                  <DoubleArrowIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Przelew wychodzący: ${transfer.recipient.name}`}
                secondary={transfer.amount}
              />
            </ListItem>
          ))}
      </List>
    </Fragment>
  )
}
