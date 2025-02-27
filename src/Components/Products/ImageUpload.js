import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const ImageUpload = ({ imageUrl, setImageUrl }) => {
    const toast = useRef(null);
    const cloudinaryRef = useRef();


    useEffect(() => {
        cloudinaryRef.current = window.cloudinary.createUploadWidget({
            cloudName: 'dha1tbwhv',
            uploadPreset: 'online-tag-ecommerce',
            folder: 'my-folder',
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                setImageUrl(result.info.secure_url);
            }
        });
    }, []);

    return (
        <div className="custom-upload-container">
            <Toast ref={toast} />
            <h3>Upload Your Image</h3>
            <p>Click the button below to upload an image to Cloudinary</p>
            {imageUrl && <img src={imageUrl} alt="Uploaded" className="uploaded-image" style={{ maxWidth: "100%", marginBottom: "10px" }} />}
            <Button
                className="p-button-rounded p-button-outlined p-button-success"
                onClick={() => cloudinaryRef.current.open()}
            >
                {imageUrl ? "Re-upload Image" : "Upload Image"}
            </Button>
        </div>
    );
};

export default ImageUpload;  