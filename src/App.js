
import SearchbarPresenter from './SearchbarPresenter';
import NavbarPresenter from './navbarPresenter';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./signInPresenter.js";
import CreateAccount from './createAccountPresenter';
import Profile from './profilePresenter';


export default function App(props) {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarPresenter model={props.model}/>}>
          <Route index element={<SearchbarPresenter model={props.model}/>}/>
          <Route path="signIn" element={<SignIn model={props.model}/>}/>
          <Route path="createAccount" element={<CreateAccount model={props.model}/>}></Route>
          <Route path="profile" element={<Profile model={props.model}/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


