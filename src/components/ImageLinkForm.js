import React from "react";
// import './ImageLinkForm.css'
import "tachyons"; // Replace all CSS files with tachyons CSS framework.

const ImageLinkForm = ({onImageInputChange, onImageInputSubmit, input}) => {
  // -----
  // Props
  // -----
  // onImageInputChange: PropTypes.func.isRequired
  // onImageInputSubmit: PropTypes.func.isRequired
  // input: PropTypes.string.isRequired

  return (
    <form>
      <p className="f3 tc">
        This app will detect faces in your pictures.
        <br/>
        Enter an image URL:
      </p>
      <div className="center form w-80 flex">
        <input
          className="f4 pa2 w-70"
          type="text"
          onChange={onImageInputChange}
          value={input}
        />
        <button
          className="w-30 grow f4 white bg-green"
          type="submit"
          onClick={onImageInputSubmit}
        >
          Detect
        </button>
      </div>
    </form>
  );
};

export default ImageLinkForm;
