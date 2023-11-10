import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import ErrorPage from "./components/errorPage";

function App(){
    return(
<Router>

    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  </Router>
  );
}
export default App;