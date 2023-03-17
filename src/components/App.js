import { useEffect, useState } from "react";
// api
import getWordFromApi from "../services/api";
// styles
import "../styles/App.scss";
import "../styles/Dummy.scss";
import "../styles/Letters.scss";
import "../styles/Form.scss";
import "../styles/Header.scss";
import Header from "./Header";
import Dummy from "./Dummy";
import SolutionLetters from './SolutionLetters';
import ErrorLetters from "./ErrorLetters";
import Form from "./Form";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Options from "./Options";
import { Routes, Route } from "react-router-dom";


function App() {
  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState("");

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  return (
    <div className='page'>
      <Header title='juego del ahorcado'></Header>

      <main className='main'>

        <Routes>
          <Route path='/'
            element={<>
              <ErrorLetters  userLetters={userLetters} word={word}/>
              <SolutionLetters  userLetters={userLetters}word={word}/>
              <Form lastLetter={lastLetter} handleLastLetter={handleLastLetter} handleSubmit={handleSubmit}/></>}>
          </Route>
          <Route path="/instructions" element={<Instructions/>}></Route>
          <Route path="/options" element={<Options/>}></Route>
        </Routes>

        <Dummy getNumberOfErrors={getNumberOfErrors}/>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
