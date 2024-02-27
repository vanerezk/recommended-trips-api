import { useState, useEffect } from "react";
import { getCommentsService } from "../services/backend";


const useComments = () => {
    const [commentsData, setCommentsData] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const loadingComments = async () => {
            
            try {
                setLoading(true);
                const data = await getCommentsService();
                setCommentsData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadingComments();
        }, []);
        return { commentsData, error, loading };
    };

export default useComments;