import { Route, Routes } from "react-router-dom";

import React from 'react'
import Dashboard from "./Dashboard";
import { EntryPoint } from "./EntryPoint";

const Routers = () => {
  return (
  <Routes>
    <Route exact path="/" element={<EntryPoint />}/>
    <Route exact path="/dashboard" element={<Dashboard />}/>

  </Routes>
  )
}

export default Routers