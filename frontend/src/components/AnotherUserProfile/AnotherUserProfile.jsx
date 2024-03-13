import { useEffect, useState } from "react";

import {
  getRecommendationsCountService,
  getLikesCountService,
  getUserProfileService,
} from "../../services/backend";

import useRecommendation from "../../hooks/useRecommendation";
import Carousel from "react-bootstrap/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function AnotherUserProfile() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const { loading, error } = useRecommendation();
  const [recommendationsCount, setRecommendationsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const { recommendationsData } = useRecommendation();
  const [userProfile, setUserProfile] = useState();

  console.log(recommendationsData);

  const userIdNumber = parseInt(id, 10);

  const userRecommendations = recommendationsData
    ? recommendationsData.filter((recommendation) => {
        return recommendation.user.id === userIdNumber;
      })
    : [];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        if (id) {
          const count = await getLikesCountService(id);
          setLikesCount(count);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikesCount();
  }, [id]);

  useEffect(() => {
    const fetchRecommendationsCount = async () => {
      try {
        if (id) {
          const count = await getRecommendationsCountService(id);
          setRecommendationsCount(count);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecommendationsCount();
  }, [id]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (id) {
          const userProfile = await getUserProfileService(id, token);
          console.log(userProfile);
          setUserProfile(userProfile);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, [id, token]);

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="fondo">
        <div className="bg-white shadow rounded overflow-hidden mt-5 mb-5 w-50 mx-auto">
          <div className="px-4 pt-0 pb-4 bg-secondary text-center ">
            <div className="media align-items-end profile-header ">
              <div className="profile mr-3 ">
                {userProfile.user.photo ? (
                  <img
                    src={
                      import.meta.env.VITE_BACKEND +
                      `/photos/${id}/${userProfile.user.photo}`
                    }
                    alt="..."
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                    className="rounded mb-2 img-thumbnail img-responsive d-block mx-auto shadow mt-3"
                  />
                ) : (
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="..."
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                    className="rounded mb-2 img-thumbnail img-responsive d-block mx-auto shadow mt-3"
                  />
                )}
              </div>

              <div className="mb-5 p-4 text-white ">
                <h4 className="mb-0">
                  <b>{userProfile.user.nickName}</b>
                </h4>
              </div>
            </div>
          </div>

          <div className="bg-light p-4 d-flex justify-content-end text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">
                  {recommendationsCount}
                </h5>
                <small className="text-muted">
                  <i className="fa fa-picture-o mr-1"></i>Recommendations
                </small>
              </li>
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">{likesCount}</h5>
                <small className="text-muted">
                  {" "}
                  <i className="fa fa-user-circle-o mr-1"></i>Likes
                </small>
              </li>
            </ul>
          </div>

          <div className="py-4 px-4">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Recent recommendations</h5>
            </div>
            <div className="row">
              <div className="recommendation-cards mt-3">
                {userRecommendations.map((recommendation) => (
                  <div
                    key={recommendation.userId}
                    className="card mx-2 my-2 text-center shadow p-3 mb-5 bg-white rounded"
                    style={{ width: 400 }}>
                    {recommendation.photo.length > 1 ? (
                      <Carousel slide={false}>
                        {recommendation.photo.map((photo) => (
                          <Carousel.Item key={photo}>
                            <img
                              className="img-thumbnail "
                              src={
                                import.meta.env.VITE_BACKEND +
                                `/photos/${photo}`
                              }
                              style={{
                                width: 300,
                                height: 300,
                                objectFit: "cover",
                              }}
                              alt={photo}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    ) : (
                      <img
                        src={
                          import.meta.env.VITE_BACKEND +
                          `/photos/${recommendation.photo[0]}`
                        }
                        alt={recommendation.photo[0]}
                        style={{
                          width: 300,
                          height: 300,
                          objectFit: "cover",
                        }}
                        className="img-thumbnail mx-auto d-block"
                      />
                    )}

                    <h5
                      className="card-title  text-center  font-weight-bold text-primary "
                      style={{ marginTop: "10px" }}
                      onClick={() =>
                        navigate(`/recommendations/${recommendation.id}`)
                      }>
                      {recommendation.title}
                    </h5>
                    <p className="card-text text-center ">
                      {recommendation.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnotherUserProfile;
