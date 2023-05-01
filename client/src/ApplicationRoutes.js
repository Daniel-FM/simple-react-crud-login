import { Routes, Route } from "react-router";
import { Home } from "src/views/Home";
import { Login } from "src/views/Login";
import { Signup } from "src/views/Signup";

export const ApplicationRoutes = () => (
    <>
        <Routes>
            <Route 
                exact path="/" 
                element={ <Home /> }
            />
            <Route 
                path="/login" 
                element={ <Login /> }
            />
            <Route 
                path="/signup" 
                element={ <Signup /> }
            />
        </Routes>
    </>
);
