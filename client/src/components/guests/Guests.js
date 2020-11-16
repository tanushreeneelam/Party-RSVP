import React, { useContext } from 'react'
import GuestContext from '../../context/guestContext/guestContext';
import Guest from './Guest'

const Guests = () => {

  const {guests,filterGuest,search} = useContext(GuestContext);
  return (
    <div className="guests">
      {/* if search condition exists => map on search else map on all guests */}
      { search !== null ? search.map(guest => <Guest key={guest.id} guest={guest} />) : 
              guests.filter(guest => !filterGuest || guest.isconfirmed )
                      .map(guest => <Guest key={guest.id} guest={guest} />) }
    </div>
  )
}
export default Guests