import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/" class="nav-link" >Home</Link>
            </li>
            <li class="nav-item">
                <Link to="/todos" class="nav-link" >Todos</Link>
            </li>
            <li class="nav-item">
                <Link to="/users" class="nav-link" >Users</Link>
            </li>
            <li class="nav-item">
                <Link to="/acc" class="nav-link" >Login or Registation</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
