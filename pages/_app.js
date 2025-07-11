import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HelpCenter from "./components/helpcenter";
import { useRouter } from "next/router";
import AdminNavbar from "./admin/components/navbar";
import AdminHelpCenter from "./admin/components/helpcenter";
import AdminFooter from "./admin/components/footer";
import LoadingBar from "react-top-loading-bar";
import { SessionProvider } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
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
  const [progress, setProgress] = useState(0);
  const [account, setAccount] = useState([]);
    const [cartshow, setcartshow] = useState(true);
  
  const [cart, setCart] = useState([]);


  useEffect(() => {
  const existingCart = localStorage.getItem("user_cart");
  if (existingCart) {
    const parsedCart = JSON.parse(existingCart);
    const filteredCart = parsedCart.filter((item) => item?.item_id); // keep only valid items
    setCart(filteredCart);
  }
}, []);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(30);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    router.events.on("routeChangeError", () => {
      setProgress(0);
    });
  }, [router.events]);

  useEffect(() => {
    const token = localStorage.getItem("custom_jwt");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded) {
          fetchAccount(decoded.email);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("An error occurred:", error.message);
        } else {
          console.error("JWT verification failed:", error);
        }
      }
    }
  }, [router.isReady, router.query, pageProps.session]);
  const fetchAccount = async (email) => {
    try {
      const response = await fetch("/api/getaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch account");
      }

      const data = await response.json();
      if (data.account) {
        setAccount(data.account);
      } else {
        console.error("No account data found");
      }
    } catch (error) {
      console.error("Error fetching account:", error.message || error);
    }
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Store current path before changing route
      sessionStorage.setItem("previousPage", window.location.pathname);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router]);
  const addToCart = (product) => {
    setcartshow(false);
  setCart((prevCart) => {
    const existingIndex = prevCart.findIndex(
      (item) => item.item_id === product.id
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...prevCart];
      updatedCart[existingIndex].item_quantity += 1;
    } else {
      updatedCart = [
        ...prevCart,
        {
          item_id: product.id,
          item_image: product.image,
          item_name: product.name,
          item_specification: product.specification,
          item_quantity: 1,
          item_color:product.color,
          item_price: product.price,
          item_sale_price: product.sale_price,
          item_on_sale: product.onsale === 1 || product.onsale === true,
        },
      ];
    }

    localStorage.setItem("user_cart", JSON.stringify(updatedCart));
    return updatedCart;
  });
};


  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("user_cart");
    router.push(`/`)
  };
  const removeFromCart = (item_id) => {
  setCart((prevCart) => {
    const existingIndex = prevCart.findIndex((item) => item.item_id === item_id);
    if (existingIndex === -1) return prevCart;

    const updatedCart = [...prevCart];

    if (updatedCart[existingIndex].item_quantity > 1) {
      updatedCart[existingIndex].item_quantity -= 1;
    } else {
      updatedCart.splice(existingIndex, 1);
    }

    localStorage.setItem("user_cart", JSON.stringify(updatedCart));
    return updatedCart;
  });
};


  return (
    <ErrorBoundary>
      <SessionProvider session={pageProps.session}>
        <LoadingBar
          color="#7002ff"
          progress={progress}
          waitingTime={300}
          onLoaderFinished={() => {
            setProgress(0);
          }}
        />
        {router.route.includes("admin/components") ? (
          <AdminNavbar />
        ) : (
          <Navbar
            account={account}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
            clearCart={clearCart}
            removeFromCart={removeFromCart}
            cartshow={cartshow}
            setcartshow={setcartshow}
          />
        )}
        <Component
          {...pageProps}
          account={account}
          setAccount={setAccount}
          cart={cart}
          setCart={setCart}
          setcartshow={setcartshow}
          addToCart={addToCart}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
        />
        {router.route.includes("admin") ? <AdminHelpCenter /> : <HelpCenter />}
        {router.route.includes("admin") ? <AdminFooter /> : <Footer />}
      </SessionProvider>
    </ErrorBoundary>
  );
}
