import Navbar from '../components/Navbar'
import Cards from "../components/Cards";
import Format1 from "../components/Format1";
import Totals from "../components/Totals";
import { AuthProvider } from "../context/AuthContext";
import Footer from '../components/Footer';

const Budget = () => {
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
  )
}

export default Budget
