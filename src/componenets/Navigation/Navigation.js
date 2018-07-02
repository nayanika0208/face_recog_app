import React from 'react';

const Navigation =({isSignedIn ,onRouteChange }) =>{
	
		if(isSignedIn){
			return (
			<nav style={{display:'flex' , justifyContent:'flex-end'}}>
				<p 
			    onClick={()=>onRouteChange('signout')}
				className='f3 underline pa3 pointer link dim black'>Sign Out</p>
			</nav>
			);
		}else{
			return(
			<nav style={{display:'flex' , justifyContent:'flex-end'}}>
				<p 
			    onClick={()=>onRouteChange('signin')}
				className='f3 underline pa3 pointer link dim black'>Sign In</p>
				<p 
			    onClick={()=>onRouteChange('register')}
				className='f3 underline pa3 pointer link dim black'>Register</p>
			</nav>	
			);		

		}

}

export default Navigation;