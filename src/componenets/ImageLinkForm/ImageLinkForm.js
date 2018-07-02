import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm =({onInputChange , onButtonSubmit}) =>{
	return (
		<div >
	      <p className='f3'>
	        {'This magic Brain will detect Your faces in Your pictures'}
	      </p>
	       <div className='center'>
	          <div className='br3 pa4 center shadow-5 form'>
	          <input className='fa4 w-70 pa2 'type="text" onChange={onInputChange}/>
	          <button 
	          className='w-30 grow f4 link ph3 pv2 dib bg-light-purple white'
	           onClick={onButtonSubmit}
	           >Detect</button>
	          </div>
	       </div>
        </div>

	);

}

export default ImageLinkForm;