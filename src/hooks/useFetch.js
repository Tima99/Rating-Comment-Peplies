import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../store/authSlice";

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogle = async (response) => {
        try {
            setLoading(true);

            const res = await axios.post(url, { credential: response.credential }, {withCredentials: true});
            dispatch(setAuthUser(res.data))

            navigate('/videos', {replace: true})
        } catch (err) {
            setError(err?.response?.data?.message);
        }
        finally{
            setLoading(false);
        }
       
    };
    return { loading, error, handleGoogle };
};

export default useFetch;
