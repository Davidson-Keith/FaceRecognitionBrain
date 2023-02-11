import React from "react";
// import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit, input }) => {
  return (
    <div>
      <p className="f3 tc">
        This Magic Brain will detect faces in your pictures. Give it a try.
      </p>
      {/* <div className="center form pa3 br3 shadow-5"> */}
      <div className="center w-80 flex">
        <input
          className="f4 pa2 w-70"
          type="text"
          onChange={onInputChange}
          value={input}
        />
        {/* <button className="w-30 grow f4 ph3 pv2 dib white bg-light-purple"> */}
        <button
          className="w-30 grow f4 white bg-green"
          type="submit"
          onClick={onSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
