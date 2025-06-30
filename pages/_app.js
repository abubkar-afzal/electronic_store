import "@/styles/globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HelpCenter from "./components/helpcenter";
import { useRouter } from "next/router";
import AdminNavbar from "./admin/components/navbar";
import AdminHelpCenter from "./admin/components/helpcenter";
import AdminFooter from "./admin/components/footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return(<>
  {
    router.route.includes("admin") ? 
  <AdminNavbar />
  :
  <Navbar className=""/>
  }

   <Component {...pageProps} />
  {
    router.route.includes("admin") ? 
    <AdminHelpCenter/>
  :
    <HelpCenter/>
  }
    
  {
    router.route.includes("admin") ? 
    <AdminFooter/>
  :
    <Footer/>
  }


</>)
}
