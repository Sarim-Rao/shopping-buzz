import { useEffect, useState } from "react";
import apiClient from "../../services/api-service";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "../../Components/TextField";
import Alert from "../../Components/Alert";
import * as yup from "yup";
import { useDispatch,useSelector } from "react-redux";
import {addUserInfo} from "../../redux/Slices/AuthSlice"

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("email is required")
    .email("please enter a valid email"),

  password: yup
    .string()
    .required("password is required")
    .min(6, "Password should be atleast 6 charactor long")
    .max(20, "Password should be atmost 20 charactor long")
    .matches(/[a-z]/, "Password should contain atleast one lowercase")
    .matches(/[A-Z]/, "Password should contain atleast one uppercase")
    .matches(/[0-9]/, "Password should contain atleast one numaric"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {userinfo} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    email: "",
    password: "",
  };


  useEffect(()=>{
    if(userinfo){
      navigate("/")
    }    
  },[userinfo,navigate])
  

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await apiClient.post("/auth/login", values);
      dispatch(addUserInfo(data))
      navigate("/")
    } catch (err) {
      const message = err.response.data
        ? err.response.data.message
        : err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title className="text-center">Login</Card.Title>
        </Card.Header>
        <Card.Body>
          {error && <Alert> {error} </Alert>}
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <TextField name="email" label="Email" />
              <TextField name="password" type="password" label="Password" />

              <Button type="submit" variant="primary">
                {loading ? "Loading..." : "Login"}
              </Button>
            </Form>
          </Formik>
        </Card.Body>
        <Card.Footer>
          Dont have an account? <Link to="/auth/register">Register Now!</Link>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Login;
