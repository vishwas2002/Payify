import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Signup  from "./components/Signup";
import  Signin  from "./components/Signin";
import  Dashboard  from "./components/Dashboard";
import  SendMoney  from "./components/SendMoney";
import  PaymentStatus  from "./components/PaymentStatus";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmoney/:userId" element={<SendMoney />} />
          <Route path="/paymentstatus" element={<PaymentStatus />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;