import Login from "./pages/Login/Login";
import Landing from "./pages/landing/Landing";
import Welcome from "./pages/welcome/Welcome";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Guidance from "./pages/Guidance/Guidance";
import Video from "./pages/Video/Video";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/home/HomePage";
import PatientEvaluation from "./pages/case presentation/Patient Evaluation/PatientEvaluation";
import RadiologicalExamination from "./pages/case presentation/Radiological Examination/RadiologicalExamination";
import PatientPositioning from "./pages/case presentation/Patient Positioning/PatientPositioning";
import { useState } from "react";
import CasePreParationLayout from "./pages/case preparation layout/CasePreParationLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AppStateContext from "./context/AppStateContext";

function App() {
  return (
    <AppStateContext>
      <Router>
        <div className="App">
          <Routes>
            {/* Define routes for various pages */}

            <Route exact path="/" element={<Landing />}></Route>

            <Route exact path="/welcome" element={<Welcome />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/guidance" element={<Guidance />}></Route>
            <Route exact path="/video" element={<Video />}></Route>

            {/* Nested routes  using home Layout */}
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route
                path="/casePreparation"
                element={<CasePreParationLayout />}
              >
                <Route
                  path="patientEvaluation"
                  element={<PatientEvaluation />}
                />
                <Route
                  path="RadiologicalExamination"
                  element={<RadiologicalExamination />}
                />
                <Route
                  path="PatientPositioning"
                  element={<PatientPositioning />}
                />
              </Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </AppStateContext>
  );
}

export default App;
