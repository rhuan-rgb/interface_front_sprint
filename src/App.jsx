import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import ListaSalas from "./pages/ListaSalas";
import Login from "./pages/Login";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />       
        <Route path="/login" element={<Login/>}/>
        <Route path="/organizadores" element={<ListaSalas/>} /> 
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
