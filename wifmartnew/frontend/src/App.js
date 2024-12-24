import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import ScrollToTop from './components/ScrollTop';



function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [likedProductCount, setLikedProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  const fetchUserLikedProduct = async () => {
    const dataResponse = await fetch(SummaryApi.likedProductCount.url, {
      method: SummaryApi.likedProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    setLikedProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    // Fetch user details
    fetchUserDetails();

    // Fetch user cart product count
    fetchUserAddToCart();

    // Fetch user liked product count
    fetchUserLikedProduct();
  }, []);

  return (
    <>
      {/* Provide the ScrollToTop component here */}
      <ScrollToTop /> {/* This ensures the page scrolls to the top on route change */}

      <Context.Provider
        value={{
          fetchUserDetails, // User details fetch
          cartProductCount, // Current user add-to-cart product count
          fetchUserAddToCart,
          likedProductCount,
          fetchUserLikedProduct,
        }}
      >
        <ToastContainer
          position="top-center"    // Position at the top center
          autoClose={300}         // Close after 0.3 second
          limit={1}                // Only display 1 toast at a time
          closeOnClick             // Close toast on click
          pauseOnHover             // Pause auto-close on hover
          draggable                // Allow dragging of toast
          theme="light"            // Optional: set theme to "light" or "dark"
          newestOnTop={true}       // Show the newest toast on top
        />

        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
