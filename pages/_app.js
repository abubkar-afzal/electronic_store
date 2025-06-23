import "@/styles/globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HelpCenter from "./components/helpcenter";

export default function App({ Component, pageProps }) {
  return(<>
  <Navbar/>
   <Component {...pageProps} />
    <HelpCenter/>
    <Footer/>

</>)
}
