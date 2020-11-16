import React , { useReducer } from 'react'
import GuestContext from './guestContext';
import guestReducer from './guestReducer';
import {
    TOGGLE_FILTER,
    SEARCH_GUEST,
    CLEAR_SEARCH,
    ADD_GUEST,
    REMOVE_GUEST,
    UPDATE_GUEST,
    EDIT_GUEST,
    CLEAR_EDIT
} from '../types';

const GuestState= (props) => {
    
    const initialState= {
        filterGuest:false,
        search:null,
        edit:null,
        guests:[
            {
                id:1,
                name:"Tanushree",
                phone:"8398429",
                diet:"veg",
                isconfirmed:false
            },
            {
                id:2,
                name:"Abhi",
                phone:"8398429",
                diet:"non-veg",
                isconfirmed:true
            },
            {
                id:3,
                name:"Kirti",
                phone:"8338429",
                diet:"veg",
                isconfirmed:true
            }
        ]
    }

    const [state,dispatch] = useReducer(guestReducer,initialState);

    const addGuest = (guest) => {
        guest.id=Date.now();
        guest.isconfirmed=false;
        dispatch({
            type:ADD_GUEST,
            payload:guest
        })
    }

    const removeGuest = (id) => {
        dispatch({
            type:REMOVE_GUEST,
            payload:id
        })
    }

    //isconfirmed 
    const updateGuest = (guest) => {
        dispatch({
            type:UPDATE_GUEST,
            payload:guest
        })
    }

    //editing name and ph etc
    const editGuest = (guest) => {
        dispatch({
            type:EDIT_GUEST,
            payload:guest
        })
    }

    const clearEdit = () => {
        dispatch({
            type:CLEAR_EDIT
        })
    }

    const toggleFilter = () => {
        dispatch({
            type:TOGGLE_FILTER
        })
    }
    // console.log(state.filterGuest);

    const searchGuest = (guest) => {
        dispatch({
            type:SEARCH_GUEST,
            payload: guest
        })
    }

    const clearSearch = () => {
        dispatch({
            type:CLEAR_SEARCH
        })
    }

    return (
        <GuestContext.Provider 
            value={{
                guests: state.guests,
                filterGuest: state.filterGuest,
                toggleFilter,
                search: state.search,
                searchGuest,
                clearSearch,
                addGuest,
                removeGuest,
                updateGuest,
                editGuest,
                clearEdit,
                edit: state.edit
                }}>
            {props.children}
        </GuestContext.Provider>
    )
}

export default GuestState;
