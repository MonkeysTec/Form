import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../screens/Login";
import { Home } from "../screens/Home";
import { PersonalData } from "../screens/PersonalData";
import { Documents } from "../screens/Documents";
import { Declarations } from "../screens/Declarations";
import { Residential } from "../screens/Residential";
import { Bankers } from "../screens/Bankers";
import { Patrimony } from "../screens/Patrimony";
import { Answer } from "../screens/Answer";
import { Finish } from "../screens/Finish";
import { AtachDoc } from "../screens/AtachDoc";
import { Profile } from "../screens/Profile";

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/personal" element={<PersonalData />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/declarations" element={<Declarations />} />
      <Route path="/residential" element={<Residential />} />
      <Route path="/bankers" element={<Bankers />} />
      <Route path="/patrimony" element={<Patrimony />} />
      <Route path="/answer" element={<Answer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/finish" element={<Finish />} />
      <Route path="/atach" element={<AtachDoc />} />
    </Routes>
  );
};
