import { useSelector } from "react-redux"
import NotFound from '../Components/NotFound';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from "../redux/Slices/CartSlice"
import { useDispatch } from 'react-redux';
import { FaTimes } from "react-icons/fa";



const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart)




  const dispatch = useDispatch()

  const updateQty = (item, qty) => {

    const payload = {
      name: item.name,
      image: item.image,
      qty: Number(qty),
      price: item.price,
      countInStock: item.countInStock,
      product: item.product,
    }

    // update item to cart.
    dispatch(addToCart(payload))

  }

  // remove from cart
  const removeItem = (productID) => {

    dispatch(removeFromCart(productID))

  }

  // roundNumbers

  const roundNumbers = (value) => {
    return +Math.round(value).toFixed(2)
  }

  // subtotal

  const subtotal = roundNumbers(
    cartItems.reduce((pre, cur) => {
      return (pre += cur.price * cur.qty)
    }, 0)
  )
  // saleTax

  const saleTax = roundNumbers((subtotal / 100) * 16)

  // total price 
  const totalPrice = roundNumbers(subtotal + saleTax);

  return (
    <>

      <div>
        {
          cartItems.length > 0 ? (
            <div className='pt-3'>
              <div className="row">
                <div className="col">
                  <h3>Shooping Cart</h3>
                  <hr />
                  <Link to="/" >Continue Shooping</Link>
                </div>
              </div>

              <div className="row">
                <ul className="list-group list-group-flush">

                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Product</div>
                      <div className="col">Price</div>
                      <div className="col">Quantity</div>
                      <div className="col text-end">Total</div>
                    </div>
                  </li>

                  {
                    cartItems.map((p) => (

                      <li className="list-group-item" key={p.product}>
                        <div className="row">
                          <div className="col">
                            <img src={p.image} alt="produst image" className='shadow-md' style={{ width: "50px" }} />
                            <span className='px-2'>{p.name}</span>
                          </div>
                          <div className="col">
                            <span>{p.price}</span>
                          </div>
                          <div className="col">
                            <div className="input-group">
                              <select className='form-select'>
                                disabled={p.countInStock === 0}
                                value={p.qty}
                                onChange={(e) => updateQty(p, e.target.value)}
                                {[...Array(p.countInStock).keys()].map(
                                  (value) =>
                                    value < 5 && (
                                      <option key={value} value={value + 1}>
                                        {value + 1}
                                      </option>
                                    )
                                )}
                              </select>
                            </div>
                          </div>

                          <div className="col text-end">
                            {p.price * p.qty}/-{" "}
                            <FaTimes
                              className='text-danger ps-2 cursor-pointer'
                              onClick={() => removeItem(p.product)}
                            />
                          </div>
                        </div>

                      </li>
                    ))
                  }

                </ul>
              </div>


              <div className="row justify-content-end fs-5">
                <div className="col">

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item ">
                      <div className="row">
                        <div className="col">Subtotal:</div>
                        <div className="col text-end">{subtotal}/-</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col">Tax (16%):</div>
                        <div className="col text-end">
                          {saleTax}
                          /-</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col fs-3">Grand Total:</div>
                        <div className="col text-end"> {totalPrice}/- </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className='vstack py-3'>
                        <Link to="/checkout"> <button className='grid btn btn-success '> CheckOut </button></Link>
                      </div>
                    </li>
                  </ul>

                </div>

              </div>

            </div>
          ) : (
            <NotFound />
          )
        }
      </div>

    </>
  )
}

export default Cart
