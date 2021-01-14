import React,{useContext, useState , useEffect} from 'react';
import {UserContext} from '../../UserContext';
import {Redirect} from 'react-router-dom';
import RoomList from './RoomList';
import io from 'socket.io-client';
let socket;  

const Home = () => {
    
    const ENDPT = 'localhost:5000';
    
    const {user,setUser}= useContext(UserContext)
    const [room , setRoom ]= useState('')
    const [rooms, setRooms]= useState([])

    useEffect(()=>{
        socket = io(ENDPT);
        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPT])

    useEffect(()=>{
        socket.on('room-created',room=>{
            setRooms([...rooms,room])
        })
    },[rooms])


    // useEffect(()=>{
    //    console.log(rooms);
    // },[rooms])

    useEffect(()=>{
       socket.on('output-rooms',rooms=>{
           setRooms(rooms)
       })
     },[])

    const handleSubmit = e =>{
        e.preventDefault();
        socket.emit('create-room',room);
        //console.log(room);
        setRoom('');
    }

    if(!user){
        return <Redirect to="/login"/>
    }

    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                <div className="card">
                    <div className="card-content">
                    <span className="card-title">Welcome {user? user.name:''}</span>
                    
                    <form onSubmit={handleSubmit} >
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="room" type="text" placeholder="Enter Room Name" value={room} onChange={e=>setRoom(e.target.value)}  className="validate"/>
                                <label htmlFor="room">Room</label>
                            </div>
                        </div>
                        <button className="btn" >Create Room</button>
                    </form>
                    </div>
                    
                </div>
                </div>
                <div className="col s12 m6 ">
                    <RoomList rooms={rooms} />
                </div>
            </div>
        </div>
    )
}

export default Home
