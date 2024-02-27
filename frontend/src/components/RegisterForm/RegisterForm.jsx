import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormText } from "react-bootstrap";
import { registerNewUser } from "../../services/backend";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  const [nickName, setNickName] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerNewUser({ email, password: pass1, nickName });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Form
        className="w-75 mx-auto mt-5"
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
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="nickName"
            name="nickName"
            value={nickName}
            required
            onChange={(e) => setNickName(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="pass1"
            name="pass1"
            value={pass1}
            required
            onChange={(e) => setPass1(e.target.value)}
          />
          <Form.Text className="text-muted">
            Your password must be at least 8 characters long and contain a
            number.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            id="pass2"
            name="pass2"
            value={pass2}
            required
            onChange={(e) => setPass2(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          {error ? <p className="text-danger">{error}</p> : null}
        </Form.Group>
        <Button
          variant="primary"
          className="w-100"
          type="submit">
          Register
        </Button>
      </Form>

      <FormText className="text-center">
        Already have an account?{" "}
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
      </FormText>
    </>
  );
};

export default RegisterForm;
