import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from "./Components/Navbar";
import Note from './Components/Note';
import SignUp from './Components/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/NoteStates';

function App() {
  return (
    <div>
      <NoteState>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/LogIn" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Note" element={<Note/>}/>
      </Routes>
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
