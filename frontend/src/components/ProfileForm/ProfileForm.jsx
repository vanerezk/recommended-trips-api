import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { editProfileService } from "../../services/backend";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [error, setError] = useState("");

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      return;
    }
    let formData = new FormData();
    formData.append("photo", imageFile);
    formData.append("email", email);
    formData.append("nickName", nickName);
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    try {
      await editProfileService(formData, token);
      navigate(`/user`);
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <section>
      <h1
        className="text-primary mt-5 text-center "
        style={{ fontSize: "2rem" }}>
        Edit your profile!
      </h1>

      <Form
        className="w-75 mx-auto mt-5"
        onSubmit={handleEditProfile}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            placeholder="New email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>New Nickname</Form.Label>
          <Form.Control
            type="text"
            value={nickName}
            autoComplete="nickName"
            placeholder="New Nickname"
            name="nickName"
            id="nickName"
            onChange={(e) => setNickName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            name="currentPassword"
            id="currentPassword"
            placeholder="Current Password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Form.Group>
        <i>
          To upload a profile photo, you only need to type your current
          password!
        </i>
        <div className="mt-3 ">
          <Button
            variant="primary"
            type="submit">
            Edit
          </Button>
        </div>
      </Form>

      {error ? <p>{error.message}</p> : null}
    </section>
  );
}

export default ProfileForm;
