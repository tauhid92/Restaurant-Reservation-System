import React, { useEffect, useState } from 'react';
import { listReservations, listTables } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';
import { today, next, previous } from '../utils/date-time';
// Components
import ListDashboard from './ListDashboard';
import Seat from './Seat';
import NoReservation from './NoReservation';

function Dashboard() {
  let query = useQuery();
  const [date, setDate] = useState(query.get('date') || today());
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables().then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main>
      <div className='text-center pt-4'>
        <button
          className='btn btn-info mr-2 text-dark'
          onClick={() => setDate(previous(date))}
        >
          Previous Day
        </button>
        <button
          className='btn btn-info mr-2 text-dark'
          onClick={() => setDate(today())}
        >
          Today
        </button>
        <button
          className='btn btn-info text-dark'
          onClick={() => setDate(next(date))}
        >
          Next Day
        </button>
      </div>
      <div className='text-center m-3'>
        <h4 className='mb-0 text-light'>Reservations for {date}</h4>
      </div>
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={reservationsError} />
      <div className='ml-5 mr-5'>
        <div className='row mb-4 d-flex justify-content-center'>
          {tables.map((table) => (
            <Seat key={table.table_id} table={table} />
          ))}
        </div>
      </div>
      {reservations.length === 0 && <NoReservation />}
      <div className='mr-5 ml-5 pb-5'>
        <div className='row d-flex justify-content-center'>
          {reservations.map((reservation) => (
            <ListDashboard
              key={reservation.reservation_id}
              reservation={reservation}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;