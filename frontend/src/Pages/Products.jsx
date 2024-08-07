import { useState } from 'react';
import GetAllProducts from "../Hooks/GetAllProducts"
import { useNavigate, useParams } from 'react-router-dom'
import Rating from '../Components/Rating';
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/Slices/CartSlice.js"
import Loader from "../Components/Loader/Loading.jsx"


const Products = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams();
  const { data, error, loading } = GetAllProducts("/products/" + id, [id])


  const AdditemTOCart = () => {
    const payload = {
      name: data?.name,
      image: data?.image,
      qty: Number(qty),
      price: data?.price,
      countInStock: data?.countInStock,
      product: data?._id
    }

    dispatch(addToCart(payload))
    navigate("/cart")
  }

  return (
    <>

      <div className="container py-3">
        {error && <p>error</p>}
        {loading && <Loader/>}
        <div className="row">
          <div className="col-md-5 mb-3">
            <img src={data.image} alt="image" className='img-fluid' />
          </div>

          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item fs-4 fw-bold">{data.name}</li>
              <li className="list-group-item">Cetagory  <span className='float-end'>{data?.cetagory}</span> </li>
              <li className="list-group-item">Fabric  <span className='float-end'>{data?.fabric}</span></li>
              <li className="list-group-item">Rating  <span className='float-end'> <Rating value={data?.rating} text={data?.numReviews} /> </span> </li>
              <li className="list-group-item">Color  <span className='float-end'> {data?.color} </span> </li>
              <li className="list-group-item"> {data.description} </li>
            </ul>
          </div>

          <div className="col-md-3">

            <ul className="list-group list-group-flush ">
              <li className="list-group-item"> <span className='fs-2 fw-bold'> Rs.{data.price}/- </span> </li>
              <li className="list-group-item"> Stock
                <span className='float-end'> {data.countInStock > 0 ? (
                  <span className='badge bg-success'>Available</span>
                ) : (
                  <span className='badge bg-danger'>Out of stock</span>
                )}  </span>
              </li>

              <li className="list-group-item">
                <select className="form-select text-center" disabled={data.countInStock < 1} onChange={(e) => setQty(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </li>

              <li className="list-group-item d-grid">
                <button className='btn btn-success' onClick={AdditemTOCart}> Add to Cart </button>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </>
  )
}

export default Products;
