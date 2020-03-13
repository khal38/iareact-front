import React from "react";
import './ImageLinkForm.css'

// we pass onInputChange . onButtonSubmit props as an argument in destructuring mode and we add and event on input and button
const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {

    return (
        <div className>
            <p className="f3">
                {'This Magic brain will detect faces in your pictures'}
            </p>

            
            <div className="center">
                <div className='form center pa4 br3 shadow-5'>
                    <input className="f4 pa2 w-70 center" type='tex' onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white  bg-dark-blue" onClick={onButtonSubmit}>Detect</button>
                </div>

            </div>
        </div>

    )

}

export default ImageLinkForm;


