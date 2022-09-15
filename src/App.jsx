import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import './App.css'
import Home from "./Home";
import Header from "./Header";
import Patients from "./Patients";
import Planning from "./Planning";
import Messages from "./Messages";
import FormulairePatient from './FormulairePatient'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/patients' element={<Patients/>} />
        <Route path='/planning' element={<Planning/>} />
        <Route path='/messages' element={<Messages/>} />
        <Route path='/formulairepatient' element={<FormulairePatient/>}/>
      </Routes>
    </>
  )
}

export default App
