import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./Auth/index";
import { CryptoListDetail, CryptoForm, CryptoUpdatePage } from "./Crypto/index";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<CryptoListDetail />} />
        <Route path="/create-crypto" element={<CryptoForm />} />
        <Route path="/update/:id" element={<CryptoUpdatePage />} />


      </Routes>
    </div>
  );
}

export default App;