import { useState, useEffect } from "react";
import { getRecommendationByIdService } from "../services/backend";

const useSingleRecommendation = (recommendationId) => {
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingRecommendation = async () => {
      try {
        setLoading(true);
        const data = await getRecommendationByIdService(recommendationId);
        setRecommendation(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadingRecommendation();
  }, [recommendationId]);

  return { recommendation, error, loading };
};

export default useSingleRecommendation;
