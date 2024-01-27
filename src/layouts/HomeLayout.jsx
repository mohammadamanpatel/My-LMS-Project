import { Link, useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { logout } from '../redux/slices/authSlice';
export const HomeLayout = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
    const role = useSelector((state) => state?.auth?.role);
    console.log("isLoggedIn",isLoggedIn);
    console.log("role",role);
    const navigate = useNavigate();
    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }
    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }
    function onLogout(e) {
        e.preventDefault();
        if (dispatch(logout())) {
            navigate('/login')
        }
    }
    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-full">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer">
                        <FiMenu onClick={changeWidth} size={"32px"} className='font-bold text-white m-4' />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className='menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative'>
                        <li className='w-fit absolute right-2 z-50'>
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {isLoggedIn && role === "ADMIN" && (
                            <li>
                                <Link to="/Admin/Dashboard">Admin Dashboard</Link>
                            </li>
                        )
                         }
                        {isLoggedIn && role === "ADMIN" && (
                            <li>
                                <Link to="/course/create">Create Course</Link>
                            </li>
                        )
                         }
                        <li>
                            <Link to="/about"> About us </Link>
                        </li>
                        <li>
                            <Link to="/contact"> Contact us </Link>
                        </li>
                        <li>
                            <Link to="/courses"> All courses </Link>
                        </li>
                        {isLoggedIn == false  ? (
                            <li className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn btn-active btn-primary ">
                                        <Link to="/login">Log In</Link>
                                    </button>
                                    <button className="btn btn-active btn-primary">
                                        <Link to="/signup">Signup</Link>
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn btn-outline btn-accent py-1 font-semibold rounded-md w-[40%]">
                                        <Link to="/user/profile">Profile</Link>
                                    </button>
                                    <button className="btn btn-outline btn-accent px-4 py-1 font-semibold rounded-md w-[40%]">
                                        <Link onClick={onLogout}>Logout</Link>
                                    </button>
                                </div>
                            </li>
                        )

                        }
                    </ul>
                </div>
            </div>
            {children}
            <Footer></Footer>
        </div>
    )
}
