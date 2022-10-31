import React, { useState } from "react";
import { FaCircle, FaRegCircle } from 'react-icons/fa';

export default function Zoom({ src, magnifierHeight = 100, magnifieWidth = 110, zoomLevel = 1.5, photos, click, setClick, setExpand, expandPhoto }){
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div
      className="zoom"
      style={{
        margin:"0px 100px",
        objectFit:"contain",
      }}
    >

      {/* main photo */}
      <img
        className="img-main"
        src={src}
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        style={{
          objectFit:"contain",
          cursor:"none",
          width:'650px'
        }}
        onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}
      />

      {/* icons */}
      <div className="circle-icons">
        {photos.map((photo, i) =>
        <span key={i} className="circle-icon" onClick={e=>{setClick(i); setPhoto(photos[i])}}>
        { i===click? <FaCircle/>: <FaRegCircle/>}
        </span>)}
      </div>

      {/* zoom popup */}
      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${(x - magnifieWidth / 2)+100}px`,
          opacity: "1",
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",

          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
        }}
      ></div>
    </div>
  );
}