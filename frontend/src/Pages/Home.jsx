import GetAllProducts from "../Hooks/GetAllProducts"
import Alert from '../Components/Alert'
import Loading from '../Components/Loader/Loading'
import { Link } from "react-router-dom"
import Rating from '../Components/Rating'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { sliderImages } from "../Constants/constant"
const Home = () => {
  const { data, error, loading } = GetAllProducts("/products", [])
  


  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>

    <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
          <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >

              {
                sliderImages.map((item,index)=>(
                  <SwiperSlide key={index}>
                    <img src={item?.image} alt="product image" className="slider-image" />
                  </SwiperSlide>
                ))
              }
            
              <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20" stroke="#78c2ad"></circle>
              </svg>
                <span ref={progressContent} className="slider-count"></span>
              </div>
            </Swiper>
          </div>
        </div>
    </div>

      <div className="container py-4">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center ">
            {error && <Alert />}
            {loading && <Loading />}
          </div>

          {data?.map((product, index) => (
            <div className="col-lg-3 col-md-6 mb-3" key={index}>
              <Card className="">
               <Card.Img variant="top" src={product?.image} className="product-image" />
                <Card.Body className="card-body">
                  <Card.Title className="product-title">{product?.name}</Card.Title>
                  <Card.Text>
                    {product?.price}
                  </Card.Text>
                  <Card.Text>
                    {product?.fabric}
                  </Card.Text>
                
                  <Rating value={product?.rating} text={product?.numReviews} />

                  <Link to={`/products/${product._id}`} className='float-end'>
                   <button className='btn btn-warning'>view</button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;
