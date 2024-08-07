import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"; 
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaCartShopping } from "react-icons/fa6";
import { removeUserInfo } from "../redux/Slices/AuthSlice";
import {emptyCart} from "../redux/Slices/CartSlice"
import { toast } from "react-toastify";
import Logo from "../assets/Logo.png"
const Header = () => {

  const {cartItems} = useSelector((state)=>state.cart)
  const { userInfo } = useSelector((state) => state.auth);
 const dispatch = useDispatch()
 const navigate = useNavigate()
  

 const handleLogout = ()=>{
  dispatch(removeUserInfo())
 dispatch(emptyCart())
 toast.info("User logout.")
 navigate("/auth.login")
 
 }
  
  return (
    <header>
      <Navbar expand='lg' className='bg-primary' variant='dark'>
        <Container>
          <Navbar.Brand as={NavLink} to="/" className='d-flex align-items-center'> <img src={Logo} alt="Logo" className='Header-Logo' /> Shooping Buzz</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link as={NavLink} to='/cart'>

                <FaCartShopping /> Cart
               {cartItems.length > 0 && (
                <div className='badge bg-light ms-2'>
                    {cartItems.length}
                </div>
               )}

              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                <NavDropdown.Item as={NavLink} to='/profile'>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/orders'>
                  Orders
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              ) : (

              <Nav.Link as={NavLink} to='/auth/login'>
                <FaUser /> Login
              </Nav.Link>
              )}

             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
