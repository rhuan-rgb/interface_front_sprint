import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import ListaSalas from "./pages/ListaSalas";
import Login from "./pages/Login";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />       
        <Route path="/organizadores" element={<ListaSalas/>} /> 
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
