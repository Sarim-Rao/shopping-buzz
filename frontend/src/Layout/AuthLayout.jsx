import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='auth-layout d-flex align-items-center'>
        <Container>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Outlet />                   
                </Col>
            </Row>
        </Container>
      
    </div>
  )
}

export default AuthLayout
