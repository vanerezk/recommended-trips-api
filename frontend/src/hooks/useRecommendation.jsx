import { useState, useEffect } from "react";
import { getRecommendationsService } from "../services/backend";
import {
  getRecommendationByCountryIdService,
  getRecommendationsByCategoryService,
} from "../services/backend";

const useRecommendation = () => {
  const [recommendationsData, setRecommendationsData] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingRecommendations = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const locationParam = params.get("location");
        const categoryParam = params.get("category");

        if (window.location.pathname === "/recommendations/" && locationParam) {
          const data = await getRecommendationByCountryIdService(locationParam);
          setRecommendationsData(data.recommendations);
        } else {
          const data = await getRecommendationsService();
          setRecommendationsData(data);

          if (
            window.location.pathname === "/recommendations/" &&
            categoryParam
          ) {
            const data = await getRecommendationsByCategoryService(
              categoryParam
            );
            setRecommendationsData(data.recommendations);
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadingRecommendations();
  }, []);

  return { recommendationsData, error, loading };
};

export default useRecommendation;
