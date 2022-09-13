import { async } from "@firebase/util";

const useGeneratePhotoURL = () => {
    const formData = new FormData();
    const key = process.env.REACT_APP_KEY;

    const generatePhotoURL = async (photo) => {
        formData.append("image", photo)
        return await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
            method: 'post',
            body: formData
        })
            .then(res => res.json())
            .then(data => data?.data?.url)

    }


    return { generatePhotoURL };
};

export default useGeneratePhotoURL;