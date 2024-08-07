import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";


const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div className="main">
        <Container fluid>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
