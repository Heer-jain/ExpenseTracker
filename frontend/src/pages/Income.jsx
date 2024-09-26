import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Format1 from "../components/Format1";
import { AuthProvider } from "../context/AuthContext";
import Totals from "../components/Totals";
import Footer from "../components/Footer";

const Income = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <div className="flex">
        <Format1 />
        <Totals/>
        </div>
        <Cards />
      </div>
      <Footer/>
    </AuthProvider>
  );
};

export default Income;
