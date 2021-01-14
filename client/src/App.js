import React ,{useState,useEffect} from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import {UserContext} from './UserContext';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import Navbar from './components/layouts/Navbar'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import './App.css';

function App() {

    const [user,setUser]= useState(null)

    useEffect(() => {
        const verifyUser = async()=>{
            try{
                const res = await fetch('http://localhost:5000/verifyuser', {
                credentials:'include',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            setUser(data);
            }catch(error){
                console.log(error);
            }
        }
        verifyUser()
    }, [])

  return (
    <Router>
        <div className="App">
        <UserContext.Provider value={{user , setUser}}>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/chat/:room_id/:room_name">
                    <Chat/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/signup">
                    <Signup/>
                </Route>
            </Switch>
        </UserContext.Provider>
        </div>
    </Router>
  );
}

export default App;
