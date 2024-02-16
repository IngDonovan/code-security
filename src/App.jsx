import { useState } from 'react';
import { UseState } from './UseState.jsx';
import { ClassState } from './ClassState.jsx';
import './App.scss'

function App() {

  return (
    <>
      <UseState name="UseState"/>
      <ClassState name="ClassState"/>
    </>
  )
}

export default App
