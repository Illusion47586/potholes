import React, { Fragment, useRef, useState } from "react";
import styles from "./ImageSelect.module.css";
import Button from "../button/Button";
import Webcam from "react-webcam";
import galleryIcon from "../../images/gallery.png";
import { ArrowUp, Camera, ArrowCircleRight, X, Aperture } from "phosphor-react";

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const ImageSelect = () => {
  const inputRef = useRef();
  const webRef = useRef(null);

  const [imgSrc, setImgSrc] = useState(galleryIcon);
  const [webCamOn, setWebCamOn] = useState(false);
  const [newImg, setNewImg] = useState(null);

  const changeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImgSrc(URL.createObjectURL(file));
      setNewImg(file);
    }
  };

  const webImageHandler = () => {
    setWebCamOn(true);
  };

  const uploadHandler = () => {
    inputRef.current.click();
  };

  const cancelHandler = () => {
    setWebCamOn(false);
  };

  const captureHandler = () => {
    const img = webRef.current.getScreenshot();
    setImgSrc(img);
    setNewImg(dataURLtoFile(img, "clicked.jpeg"));
    setWebCamOn(false);
  };

  return (
    <div className={styles.outerContainer}>
      {webCamOn ? (
        <Webcam ref={webRef} screenshotFormat="image/jpeg" />
      ) : (
        <Fragment>
          <h1 className={styles.heading}>
            Upload your<span className={styles.pinkColor}> Images</span>
          </h1>
          <p className={styles.paraText}>PNG, JPG are allowed</p>
          <img className={styles.image} src={imgSrc} alt="pothole"></img>
          <div className={styles.inputImage}>
            <input
              ref={inputRef}
              className={styles.input}
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              onChange={changeHandler}
            />
            <Button
              text="Upload"
              icon={ArrowUp}
              iconWt="bold"
              onClick={uploadHandler}
            />
            <Button
              onClick={webImageHandler}
              text="Click"
              icon={Camera}
              iconWt="bold"
            />
          </div>
        </Fragment>
      )}
      {webCamOn && (
        <div className={styles.webOn}>
          <Button
            text="Cancel"
            onClick={cancelHandler}
            icon={X}
            iconWt="bold"
          />
          <Button
            text="Capture"
            onClick={captureHandler}
            icon={Aperture}
            iconWt="bold"
          />
        </div>
      )}
      {!webCamOn && (
        <div className={styles.submit}>
          <Button text="Submit" icon={ArrowCircleRight} iconWt="bold" />
        </div>
      )}
    </div>
  );
};

export default ImageSelect;
