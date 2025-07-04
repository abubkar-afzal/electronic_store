import React from "react";
import "@/styles/globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HelpCenter from "./components/helpcenter";
import { useRouter } from "next/router";
import AdminNavbar from "./admin/components/navbar";
import AdminHelpCenter from "./admin/components/helpcenter";
import AdminFooter from "./admin/components/footer";

// ErrorBoundary component to catch errors and reload page
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Optional: log error
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      window.location.reload();
    }
  }
  render() {
    if (this.state.hasError) {
      // Optionally render fallback UI before reload
      return null;
    }
    return this.props.children;
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ErrorBoundary>
      {router.route.includes("admin") ? <AdminNavbar /> : <Navbar className="" />}
      <Component {...pageProps} />
      {router.route.includes("admin") ? <AdminHelpCenter /> : <HelpCenter />}
      {router.route.includes("admin") ? <AdminFooter /> : <Footer />}
    </ErrorBoundary>
  );
}