import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ShippingInfo from '../Components/ShippingInfo'
import CartInfo from './CartInfo'
import PaymentInfo from '../Components/PaymentInfo'
import StripeContainer from '../Components/StripeContainer'

const CheckOut = () => {
  return (
    <>

      <div className='pt-3'>

        <Row>
          <Col md={6}>
            <ShippingInfo />
            <CartInfo />
          </Col>

          <Col md={6}>
            <PaymentInfo />
            <StripeContainer />

          </Col>
        </Row>

      </div>

    </>
  )
}

export default CheckOut
