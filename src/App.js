import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicCounter from "./pages/basic/Counter/classComponent";
import BasicReact from "./pages/basic/React";
import BasicLogin from "./pages/basic/Login";
import BasicHome from "./pages/home";
import BasicDetail from "./pages/basic/Detail";
import BasicOrder from "./pages/basic/Order";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Booking from "./pages/order";
import Payment from "./pages/payment";
import Bookingstatus from "./pages/bookingstatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="basic/counter" element={<BasicCounter />} />
        <Route path="basic/react" element={<BasicReact />} />
        <Route path="basic/login" element={<BasicLogin />} />
        <Route path="basic/home" element={<BasicHome />} />
        <Route path="basic/detail/:id" element={<BasicDetail />} />
        <Route path="basic/order" element={<BasicOrder />} />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="order" element={<Booking />} />
        <Route path="payment" element={<Payment />} />
        <Route path="bookingstatus" element={<Bookingstatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
