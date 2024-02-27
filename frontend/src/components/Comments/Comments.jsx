import { useState } from "react";
import {
  postCommentsService,
  deleteCommentService,
} from "../../services/backend";
import useSingleRecommendation from "../../hooks/useSingleRecommendation";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Comments.css";

const Comments = ({ recommendationId }) => {
  const { recommendation, error, loading } =
    useSingleRecommendation(recommendationId);
  const [message, setMessage] = useState("");
  const { user, token } = useContext(AuthContext);

  const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleComment = async (message) => {
    try {
      await postCommentsService(
        token,
        message,
        user.id,
        recommendation.recommendation.id
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/recommendations/${recommendation.recommendation.id}`);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteCommentService(token, commentId);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  const comments = recommendation.recommendation.comments;
  return (
    <>
      <section>
        <div className="container mb-5">
          <div className="row ">
            <h4 className="text-primary">Comments</h4>

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="comments">
                <div className="d-flex align-items-center">
                  <img
                    src={
                      !comment.photo
                        ? "https://i.imgur.com/vgqbOTn.jpeg"
                        : `http://localhost:3000/photos/${comment.userId}/${comment.photo}`
                    }
                    alt=""
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />

                  <p className="m-0 ms-2 ">
                    {comment.nickName}: {comment.message}
                  </p>
                </div>

                {user.nickName === comment.nickName && (
                  <button
                    className="btn btn-danger btn-sm rounded-pill ms-auto"
                    type="button"
                    onClick={() => handleDelete(comment.id)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
            <div className="w-100">
              <form id="algin-form">
                <div className="form-group">
                  <h4>Leave a comment</h4>
                  <label>Message</label>
                  <textarea
                    name="msg"
                    cols="30"
                    rows="5"
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    id="post"
                    className="btn btn-primary"
                    onClick={() => handleComment(message)}>
                    Post a comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Comments;
