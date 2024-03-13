import { useState, useContext } from "react";
import { FormText } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/backend";
import "./LoginForm.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const token = await loginUser({ email, password });
      login(token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <>
      <div className="fotoFondo">
        <Form
          className="mx-auto form "
          style={{ fontSize: "20px" }}
          onSubmit={handleForm}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <Button
                variant="outline-secondary"
                onClick={toggleShowPassword}>
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Remember me."
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            {error && <FormText className="text-danger">{error}</FormText>}{" "}
          </Form.Group>
          <Button
            variant="primary"
            className="w-100"
            type="submit">
            Login
          </Button>

          <FormText className="text-center">
            Don't have an account yet?{" "}
            <Link to="/register">
              <Button variant="link">Register</Button>
            </Link>
          </FormText>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
