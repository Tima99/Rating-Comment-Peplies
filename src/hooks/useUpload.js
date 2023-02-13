
import axios from "axios"
import { useState } from "react"

export default function useUpload({validity}){
    const [file, setFile] = useState()
    const [res, setRes] = useState()

    const Upload = async () => {
        try {
            validity && validity()

            const formData = new FormData()
            formData.append("video", file)
    
          const res = await axios.post('/api/video', formData)
          setRes(res.data)
        } catch (error) {
          console.log(error);
          setRes(error)
        }
    }

    return {file, setFile, Upload, res, setRes}

}