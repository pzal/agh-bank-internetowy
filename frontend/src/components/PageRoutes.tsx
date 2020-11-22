import React, {Fragment, useState} from 'react'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import NewTransferPage from '../pages/NewTransferPage'
import AllTransfersPage from '../pages/AllTransfersPage'
import ContactsPage from '../pages/ContactsPage'

export default function NavigationLinks() {
  return (
    <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/transfers/new">
            <NewTransferPage />
          </Route>
          <Route path="/transfers/all">
            <AllTransfersPage />
          </Route>
          <Route path="/contacts">
            <ContactsPage />
          </Route>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
  )
}


