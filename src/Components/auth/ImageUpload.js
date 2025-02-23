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
            folder: 'users',
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                console.log(result);
                setImageUrl(result.info.secure_url);
            }
        });
    }, []);

    return (
        <div className="custom-upload-container">
            <Toast ref={toast} />
            <img
                src={imageUrl || "https://res.cloudinary.com/dha1tbwhv/image/upload/v1740330135/default_user_icon_mjrlr2.jpg"}
                alt="Profile"
                className="border-circle mb-3"
                style={{ width: "150px", height: "150px" }} onClick={() => cloudinaryRef.current.open()}
            />
            {/* <Button
                className="p-button-rounded p-button-outlined p-button-success"
                onClick={() => cloudinaryRef.current.open()}
            >
                {imageUrl ? "Re-upload Image" : "Upload Image"}
            </Button> */}
        </div>
    );
};

export default ImageUpload;  