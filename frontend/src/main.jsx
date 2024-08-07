import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import routes from './routes.jsx'
import "./bootstrap.min.css"
import './index.css'
import store from "./redux/Store.js"

ReactDOM.createRoot(document.getElementById('root')).render(

   <Provider store={store}>
    <RouterProvider router={routes} />
    <ToastContainer />
   </Provider>
  
)
