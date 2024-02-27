export const registerNewUser = async ({ email, password, nickName }) => {
  const response = await fetch(import.meta.env.VITE_BACKEND + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, nickName }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(import.meta.env.VITE_BACKEND + "/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.token;
};

export const getMyUserDataService = async ({ token }) => {
  const response = await fetch(import.meta.env.VITE_BACKEND + "/user", {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.user;
};

export const getRecommendationsService = async () => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND + "/recommendations"
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.recommendations;
};

export const getRecommendationByCountryIdService = async () => {
  const id = window.location.search.split("/?location=").pop();
  const response = await fetch(
    import.meta.env.VITE_BACKEND + `/recommendations/${id}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const getRecommendationsByCategoryService = async () => {
  const id = window.location.search.split("/?category=").pop();
  const response = await fetch(
    import.meta.env.VITE_BACKEND + `/recommendations/${id}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const getRecommendationByIdService = async () => {
  const id = window.location.pathname.split("/").pop();
  const response = await fetch(
    import.meta.env.VITE_BACKEND + `/recommendations/${id}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const editRecommendationService = async (formData, token) => {
  const recommendationId = window.location.pathname.split("/").pop();
  const url =
    import.meta.env.VITE_BACKEND +
    "/edit-recommendations/" +
    `${recommendationId}`;
  const options = {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: formData,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

export const editProfileService = async (formData, token) => {
  const id = window.location.pathname.split("/").pop();
  const url = import.meta.env.VITE_BACKEND + "/user/" + `${id}`;
  const options = {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: formData,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

export const postCommentsService = async (
  token,
  message,
  userId,
  recommendationId
) => {
  const id = window.location.pathname.split("/").pop();
  const response = await fetch(
    import.meta.env.VITE_BACKEND + `/recommendations/${id}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        userId,
        recommendationId,
      }),
    }
  );
  return response.json();
};

export const deleteCommentService = async (token, commentId) => {
  const id = window.location.pathname.split("/").pop();

  const response = await fetch(
    import.meta.env.VITE_BACKEND +
      `/recommendations/${id}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const postCreateRecommendationService = async (formData, token) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND + "/create-recommendation",
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const deleteRecommendationService = async (token) => {
  const id = window.location.pathname.split("/").pop();
  const response = await fetch(
    import.meta.env.VITE_BACKEND + `/delete-recommendations/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const getLocationsService = async () => {
  const response = await fetch(import.meta.env.VITE_BACKEND + "/locations");

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};

export const getCategoriesService = async () => {
  const response = await fetch(import.meta.env.VITE_BACKEND + "/categories");

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};

export async function getRecommendationsCountService(userId) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/users/${userId}/posts-count`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recommendations count");
    }
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching recommendations count:", error);
    throw error;
  }
}

export async function likeRecommendation(token) {
  const id = window.location.pathname.split("/").pop();
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}/recommendations/${id}/like`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to like recommendation");
  }

  const data = await response.json();

  return data;
}

export async function dislikeRecommendation(token) {
  const id = window.location.pathname.split("/").pop();
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}/recommendations/${id}/like`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to dislike recommendation");
  }

  const data = await response.json();

  return data;
}

export async function getLikesCountService(userId) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/users/${userId}/likes-count`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recommendations likes");
    }
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching recommendations likes:", error);
    throw error;
  }
}

export const fetchAllRecommendationsService = async () => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND + "/recommendations"
  );

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message);
  }

  const json = await response.json();
  return json;
};

export const searchRecommendationsByCountryService = async (country) => {
  const allRecommendations = await fetchAllRecommendationsService();

  const filteredRecommendations = allRecommendations.recommendations.filter(
    (recommendation) => recommendation.locationId === country
  );

  return filteredRecommendations;
};

export const postImagesRecommendationService = async (formData, token) => {
  const id = window.location.pathname.split("/").pop();
  const response = await fetch(
    import.meta.env.VITE_BACKEND + `/recommendations/${id}/image`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};
