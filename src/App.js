import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Booking from "./pages/order";
import Payment from "./pages/payment";
import Bookingstatus from "./pages/bookingstatus";
import Profile from "./pages/profile";
import ViewAll from "./pages/viewall";
import Managemovie from "./pages/managemovie";
import Manageschedule from "./pages/manageschedule";
import Dashboard from "./pages/dashboard";

import PrivateRoute from "./helpers/route/privateRoute";
import PublicRoute from "./helpers/route/publicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute restricted={false} />}>
          <Route path="/" element={<Home />} />
          <Route path="viewall" element={<ViewAll />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="order" element={<Booking />} />
        </Route>

        <Route element={<PublicRoute restricted={true} />}>
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={false} />}>
          <Route path="payment" element={<Payment />} />
          <Route path="bookingstatus" element={<Bookingstatus />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="managemovie" element={<Managemovie />} />
          <Route path="manageschedule" element={<Manageschedule />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
