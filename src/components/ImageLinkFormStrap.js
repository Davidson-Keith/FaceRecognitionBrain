import React from "react";
// import './ImageLinkFormTach.css'

const ImageLinkFormTach = ({ onImageInputChange, onImageInputSubmit, input }) => {
  // -----
  // Props
  // -----
  // onImageInputChange: PropTypes.func.isRequired
  // onImageInputSubmit: PropTypes.func.isRequired
  // input: PropTypes.string.isRequired

  return (
    <div>
      <p className="f3 tc">
        This app will detect faces in your pictures.
        <br />
        Enter an image URL:
      </p>
      {/* <div className="center form pa3 br3 shadow-5"> */}
      <div className="center w-80 flex">
        <input
          className="f4 pa2 w-70"
          type="text"
          onChange={onImageInputChange}
          value={input}
        />
        {/* <button className="w-30 grow f4 ph3 pv2 dib white bg-light-purple"> */}
        <button
          className="w-30 grow f4 white bg-green"
          type="submit"
          onClick={onImageInputSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkFormTach;