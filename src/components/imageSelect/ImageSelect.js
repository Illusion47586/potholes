import React, { Fragment, useRef, useState } from "react";
import styles from "./ImageSelect.module.css";
import Button from "../button/Button";
import Webcam from "react-webcam";
import galleryIcon from "../../images/gallery.png";
import { ArrowUp, Camera, ArrowCircleRight, X, Aperture } from "phosphor-react";

const ImageSelect = () => {
  const inputRef = useRef();
  const webRef = useRef(null);

  const [imgSrc, setImgSrc] = useState(galleryIcon);
  const [webCamOn, setWebCamOn] = useState(false);
  const [newImg, setNewImg] = useState("");

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

  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  console.log(devices);
  return (
    <div className={styles.outerContainer}>
      {webCamOn ? (
        <Fragment>
          <Webcam
            ref={webRef}
            videoConstraints={{ deviceId: devices[0].deviceId }}
          />
        </Fragment>
      ) : (
        <Fragment>
          <h1 className={styles.heading}>Upload your Images</h1>
          <p className={styles.paraText}>PNG, JPG are allowed</p>
          <img className={styles.image} src={imgSrc} alt="image"></img>
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
          <Button text="Capture" icon={Aperture} iconWt="bold" />
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
