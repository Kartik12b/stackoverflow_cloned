import './App.css';

import Navbar from './component/navbar/Navbar';
import AppRoutes from './routes/Route';
import * as React from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUser} from './actions/currentUser'
import {getAllQuestion} from "./actions/AskQuestion";
import Button from "./component/button/Button";
import {clrError, showMessage} from "./actions/Error";
import MobileMenu from "./component/mobile-menu/mobileMenu";
import ChatBox from "./component/chat-box/ChatBox";

function App() {
  const dispatch=useDispatch()
  const {error,message}=useSelector((state)=>state.answer)

  React.useEffect(() => {
    return () => {
      dispatch(getAllQuestion())
      dispatch(showMessage("Loading..."))
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    };
  }, [dispatch])

  const clearMessage=()=>{
    dispatch(clrError())
  }
  
  return (
    <div className="App">
    <Router>
      <Navbar />
      <MobileMenu/>
      {(error || message)  &&
          <div className={"error-message"}>
            <div style={{flexGrow:1}}/>
                {error || message ?
                    <p id={error?"err":"msg"}>{error || message}</p> : null}

            <div style={{flexGrow:1}}/>
            <div className={"btn-cls"}>
            <Button className={"btn"} onClick={clearMessage}>
              <i className='fa fa-close'></i>
            </Button>
            </div>
          </div>}
      {<AppRoutes />}
      <ChatBox className={'chat-box-container'}/>
    </Router>
    
    </div>
  );
}

export default App;