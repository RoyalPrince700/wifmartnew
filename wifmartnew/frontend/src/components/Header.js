import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)
  const location = useLocation();

  // Hide search bar on login/signup pages
  const hideSearchBar = location.pathname === '/login' || location.pathname === '/signup';

  // Handle logout functionality
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include',
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-menu') && menuDisplay) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuDisplay]);

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }

  return (
    <header className='h-16 shadow-md bg-white z-40 fixed w-full'>
      {/* desktop */}
      <div className='hidden lg:flex container mx-auto items-center py-4 justify-between'>
        <div className='cursor-pointer'>
          <Link to={"/"}>
            <Logo w="120px" h="40px" />
          </Link>
        </div>

        {/* Search bar */}
        {!hideSearchBar && (
          <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
            <input
              type='text'
              placeholder='Search product here...'
              className='w-full outline-none'
              onChange={handleSearch}
              value={search}
            />
            <div className='text-lg min-w-[50px] flex items-center h-8 bg-yellow-600 justify-center rounded-r-full text-white'>
              <GrSearch />
            </div>
          </div>
        )}

        {/* User and Cart section */}
        <div className='flex items-center gap-7'>
          {/* User profile */}
          <div className='relative flex justify-center'>
            {user?._id && (
              <div
                className='text-3xl cursor-pointer flex justify-center user-menu'
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className='w-10 h-10 rounded-full'
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {/* User menu */}
            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className='whitespace-nowrap hover:bg-slate-100 p-2'
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link to={"/order"} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(false)}>Order</Link>
                </nav>
              </div>
            )}
          </div>

          {/* Like */}
          {user?._id && (
            <Link to={"/likedpage"} className='text-2xl flex relative'>
              <span>
                <AiOutlineLike />
              </span>
              <div className='bg-yellow-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.likedProductCount}</p>
              </div>
            </Link>
          )}

          {/* Shopping Cart */}
          {user?._id && (
            <Link to={"/cart"} className='text-2xl flex relative'>
              <span>
                <BsCart2 />
              </span>
              <div className='bg-yellow-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {/* Login/Logout Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className='px-2 py-1 rounded-full text-white hover:bg-yellow-700 bg-yellow-600 p-3'
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className='px-2 py-1 rounded-full text-white hover:bg-yellow-700 bg-yellow-600 p-3'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* tab */}
      <div className='bg-white hidden md:flex lg:hidden mx-auto px-10  items-center py-4 justify-between w-full'>
        <div className='flex flex-col w-full h-full gap-6'>
          <div className='cursor-pointer flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <RxHamburgerMenu className='text-2xl'/>
              <Link to={"/"}>
                <Logo w="100px" h="25px" />
              </Link>
            </div>

            {/* like and Cart section */}
            <div className='flex items-center gap-5'>
              {user?._id && (
                <Link to={"/likedpage"} className='text-2xl flex relative'>
                  <span>
                    <AiOutlineLike />
                  </span>
                  <div className='bg-yellow-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm'>{context?.likedProductCount}</p>
                  </div>
                </Link>
              )}

              {/* Shopping Cart */}
              {user?._id && (
                <Link to={"/cart"} className='text-2xl flex relative'>
                  <span>
                    <BsCart2 />
                  </span>
                  <div className='bg-yellow-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm'>{context?.cartProductCount}</p>
                  </div>
                </Link>
              )}

              {/* Login/Logout Button */}
              <div>
                {user?._id ? (
                  <button
                    onClick={handleLogout}
                    className='px-2 py-1 text-white rounded-full hover:bg-yellow-700 bg-yellow-600 p-3'
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={"/login"}
                    className='px-4 py-1 text-white hover:bg-yellow-700 bg-yellow-600 p-3'
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          {!hideSearchBar && (
            <div className='flex w-full'>
              <div className='flex lg:hidden items-center w-full justify-between max-w-full pl-2 border rounded-full focus-within:shadow-md'>
                <input
                  type='text'
                  placeholder='Search products, brands and categories here...'
                  className='w-full outline-none'
                  onChange={handleSearch}
                  value={search}
                />
                <div className='text-lg min-w-[40px] flex items-center h-8 bg-yellow-600 justify-center rounded-r-full text-white'>
                  <GrSearch />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

       {/* mobile */}
       <div className='bg-white flex md:hidden mx-auto px-10  items-center py-4 justify-between w-full'>
       
        <div className='flex flex-col w-full h-full gap-6'>
          <div className='cursor-pointer flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <RxHamburgerMenu className='text-2xl'/>
              <Link to={"/"}>
                <Logo w="100px" h="25px" />
              </Link>
            </div>

            {/* like and Cart section */}
            <div className='flex items-center gap-5'>
              {user?._id && (
                <Link to={"/likedpage"} className='text-2xl flex relative'>
                  <span>
                    <AiOutlineLike />
                  </span>
                  <div className='bg-yellow-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm'>{context?.likedProductCount}</p>
                  </div>
                </Link>
              )}

              {/* Shopping Cart */}
              {user?._id && (
                <Link to={"/cart"} className='text-2xl flex relative'>
                  <span>
                    <BsCart2 />
                  </span>
                  <div className='bg-yellow-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm'>{context?.cartProductCount}</p>
                  </div>
                </Link>
              )}

              {/* Login/Logout Button */}
              <div>
                {user?._id ? (
                  <button
                    onClick={handleLogout}
                    className='px-2 py-1 text-white rounded-full hover:bg-yellow-700 bg-yellow-600 p-3'
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={"/login"}
                    className='px-4 py-1 text-white hover:bg-yellow-700 bg-yellow-600 p-3'
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          {!hideSearchBar && (
            <div className='flex w-full'>
              <div className='flex lg:hidden items-center w-full justify-between max-w-full pl-2 border rounded-full focus-within:shadow-md'>
                <input
                  type='text'
                  placeholder='Search products, brands and categories here...'
                  className='w-full outline-none'
                  onChange={handleSearch}
                  value={search}
                />
                <div className='text-lg min-w-[40px] flex items-center h-8 bg-yellow-600 justify-center rounded-r-full text-white'>
                  <GrSearch />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* mobile */}
      {/* <div className='bg-white flex md:hidden mx-auto px-10  items-center py-4 justify-between w-full'>
        <RxHamburgerMenu className='text-2xl'/>
        <Link to={"/"}>
          <Logo w="100px" h="25px" />
        </Link>
        <div className='flex items-center gap-5'>
          {user?._id && (
            <Link to={"/likedpage"} className='text-2xl flex relative'>
              <span>
                <AiOutlineLike />
              </span>
              <div className='bg-yellow-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.likedProductCount}</p>
              </div>
            </Link>
          )}

          {user?._id && (
            <Link to={"/cart"} className='text-2xl flex relative'>
              <span>
                <BsCart2 />
              </span>
              <div className='bg-yellow-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className='px-2 py-1 text-white rounded-full hover:bg-yellow-700 bg-yellow-600 p-3'
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className='px-4 py-1 text-white hover:bg-yellow-700 bg-yellow-600 p-3'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div> */}
    </header>
  )
}

export default Header;


