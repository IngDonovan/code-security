import { useState } from 'react';
import { UseState } from './UseState.jsx';
import { ClassState } from './ClassState.jsx';
import { UseReducer } from './UseReducer.jsx';
import './App.scss'

function App() {

  return (
    <>
      <UseState name="UseState"/>
      <UseReducer name="UseReducer"/>
      <ClassState name="ClassState"/>
    </>
  )
}

export default App
