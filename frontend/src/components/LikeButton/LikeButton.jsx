import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import useSingleRecommendation from "../../hooks/useSingleRecommendation";
import {
  likeRecommendation,
  dislikeRecommendation,
} from "../../services/backend";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

function LikeButton() {
  const { token, user } = useContext(AuthContext);
  const { recommendation, error, loading } = useSingleRecommendation();
  const [userHasLiked, setUserHasLiked] = useState(
    recommendation?.recommendation?.isLikedByCurrentUser || false
  );
  const [likeCount, setLikeCount] = useState(
    recommendation?.recommendation?.likeCount || 0
  );

  useEffect(() => {
    setUserHasLiked(
      recommendation?.recommendation?.isLikedByCurrentUser || false
    );
    setLikeCount(recommendation?.recommendation?.likeCount || 0);
  }, [recommendation]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleLike = async () => {
    try {
      await likeRecommendation(
        token,
        user.id,
        recommendation.recommendation.id
      );
      setUserHasLiked(true);
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeRecommendation(
        token,
        user.id,
        recommendation.recommendation.id
      );
      setUserHasLiked(false);
      setLikeCount(likeCount - 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <Button
            variant="primary"
            onClick={handleLike}
            style={{ marginRight: "10px" }}>
            Like ({likeCount})
          </Button>
          <Button
            variant="danger"
            onClick={handleDislike}>
            Dislike
          </Button>
        </div>
      ) : (
        <Link to="/login">
          <Button
            variant="primary"
            onClick={() => Navigate("/login")}>
            Like
          </Button>
        </Link>
      )}
    </div>
  );
}

export default LikeButton;

