import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { today } from '../utils/date-time';
//Dashboard with its Components
import Dashboard from '../dashboard/Dashboard';
import NotFound from './NotFound';
import NewReservationForm from '../dashboard/NewReservationForm';
import TablesForm from '../dashboard/TablesForm';
import SeatReservation from '../dashboard/SeatReservation';
import EditReservation from '../dashboard/EditReservation';
import SearchReservation from '../dashboard/SearchReservation';

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/reservations'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route path='/dashboard'>
        <Dashboard currentDate={today()} />
      </Route>
      <Route exact={true} path='/search'>
        <SearchReservation />
      </Route>
      <Route path='/reservations/new'>
        <NewReservationForm />
      </Route>
      <Route path='/tables/new'>
        <TablesForm />
      </Route>
      <Route exact={true} path='/reservations/:reservation_id/seat'>
        <SeatReservation />
      </Route>
      <Route path='/reservations/:reservation_id/edit'>
        <EditReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
