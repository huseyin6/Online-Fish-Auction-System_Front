import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import CustomerSignupPage from "./pages/Sign Up/Sign Up Customer/CustomerSignupPage";
import AdminPage from "./pages/Admin/AdminPage";
import AddFishPage from "./components/Navigation/Admin/Add Fish/AddFishPage";
import AddAuctionPage from "./components/Navigation/Admin/Add Auction/AddAuction";
import PreviousAuctionPage from "./components/Navigation/Admin/Display Auction/PreviousAuctionPage";
import UpcomingAuctionPage from "./components/Navigation/Admin/Display Auction/UpcomingAuctionPage";
import FishermanRegisterationPage from "./pages/Sign Up/Fisherman Registeration/FishermanRegisterationPage";
import DisplayFishPage from "./components/Navigation/Admin/Display Fish/DisplayFishPage";
import CustomerPage from "./pages/Customer/CustomerPage";
import CustomerTransactionsPage from "./components/Navigation/Customer/CustomerTransactions/CustomerTransactionsPage";
import CustomerAuctionPage from "./components/Navigation/Customer/CustomerAuctions/CustomerAuctionPage";
import CustomerContactPage from "./components/Navigation/Customer/CustomerContact/CustomerContactPage";
import FishermanPage from "./pages/Fisherman/FishermanPage";
import FishermanAuctionPage from "./components/Navigation/Fisherman/FishermanAuctions/FishermanAuctionPage";
import FishermanContactPage from "./components/Navigation/Fisherman/FishermanContact/FishermanContactPage";
import FishermanFishesPage from "./components/Navigation/Fisherman/FishermanFishes/FishermanFishesPage";
import FishermanSalesPage from "./components/Navigation/Fisherman/FishermanSales/FishermanSalesPage";
import AdminAuctionPage from "./pages/Auction/AdminAuctionPage";
import CustomerJoinAuctionPage from "./pages/Auction/CustomerJoinAuctionPage";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<CustomerSignupPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/customer/transactions" element={<CustomerTransactionsPage />} />
          <Route path="/customer/auctions" element={<CustomerAuctionPage />} />
          <Route path="/customer/contact" element={<CustomerContactPage />} />
          <Route path="/customer/auction-page" element={<CustomerJoinAuctionPage />} />
          <Route path="/admin/add-fish" element={<AddFishPage />} />
          <Route path="/admin/add-auction" element={<AddAuctionPage />} />
          <Route path="/admin/previous-auctions" element={<PreviousAuctionPage />} />
          <Route path="/admin/upcoming-auctions" element={<UpcomingAuctionPage />} />
          <Route path="/admin/register-fisherman" element={<FishermanRegisterationPage />} />
          <Route path="/admin/all-fish" element={<DisplayFishPage />} />
          <Route path="/admin/auction-page" element={<AdminAuctionPage />} />
          <Route path="/fisherman" element={<FishermanPage />} />
          <Route path="/fisherman/auctions" element={<FishermanAuctionPage />} />
          <Route path="/fisherman/sales" element={<FishermanSalesPage />} />
          <Route path="/fisherman/contact" element={<FishermanContactPage />} />
          <Route path="/fisherman/fishes" element={<FishermanFishesPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
