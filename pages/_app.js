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
import Head from "next/head";
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
      const filteredCart = parsedCart.filter((item) => item?.item_id);
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
  }, [router.isReady, router.route, pageProps.session]);
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
            item_color: product.color,
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
    router.push(`/`);
  };
  const removeFromCart = (item_id) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.item_id === item_id
      );
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

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/getallorders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {}
    };
    fetchProducts();
  }, [router.route]);
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const imageUrl = `${siteUrl}logo.png`;
  
  return (
    <ErrorBoundary>
      <SessionProvider session={pageProps.session}>
  
      <Head>
        <title>AR Codes - Affordable & Trendy Online Shopping</title>
        <meta
          name="description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes. Fast delivery and exclusive deals!"
        />
        <meta name="author" content="Hafiz Abubakar Afzal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="online shopping, best prices, electronics, AR Codes, sale, deals, e-commerce, mobile, laptop, lcd, tablet, drone, camera, headphone, mobiles, laptops, lcds, tablets, drones, cameras, headphones"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:title"
          content="AR Codes - Affordable & Trendy Online Shopping"
        />
        <meta
          property="og:description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes."
        />
        <meta property="og:image" content={`${siteUrl}logo.png`} />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href={imageUrl} />
      </Head>

        <LoadingBar
          color="#7002ff"
          progress={progress}
          waitingTime={300}
          onLoaderFinished={() => {
            setProgress(0);
          }}
        />
        {router.route.includes("admin/components") ? (
          <AdminNavbar orders={orders} />
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
        {router.route.includes("admin/components") ? (
          <AdminHelpCenter />
        ) : (
          <HelpCenter />
        )}
        {router.route.includes("admin/components") ? (
          <AdminFooter />
        ) : (
          <Footer />
        )}
      </SessionProvider>
    </ErrorBoundary>
  );
}
