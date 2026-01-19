/** @format */

import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>

      <main className="grow pt-24 md:pt-28">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
