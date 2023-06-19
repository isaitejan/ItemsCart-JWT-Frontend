import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useUserContext } from '../hooks/useUserContext';

function NavBar() {

  const { logout } = useLogout();
  const { user } = useUserContext();

  const handleClick = ()=>{
    logout()
  }

  return (
    <Navbar className='bg-info'>
      <Container>
        <Navbar.Brand href="/" >Items Cart - JWT Implementation</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
          <Navbar.Text>
            {user && (
              <div>
                <span style={{textDecoration:"none", color:'black'}}>{user.email}</span>&nbsp;&nbsp;
                <Button onClick={handleClick}>Logout</Button> 
              </div>
            )}
          </Navbar.Text>
          <Navbar.Text >
            {!user && (<div>
              <Button><Link to="/login" style={{textDecoration:"none", color:'white'}}>Login</Link></Button> &nbsp;
              <Button><Link to="/signup" style={{textDecoration:"none", color:'white'}}>Sign Up</Link></Button>
            </div>)}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;