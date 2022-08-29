import React from "react";
import { Routes, Route } from "react-router-dom";

export default (
    <Routes>
        <Route exact path="/" />
        <Route exact path="/about" />
        <Route exact path="/skills" />
        <Route exact path="/projects" />
        <Route exact path="/contact" />
        <Route path="/" />
    </Routes>
)