import React, { Component } from 'react';
import Navigation from './componenets/Navigation/Navigation';
import FaceRecog from './componenets/FaceRecog/FaceRecog';
import Logo from './componenets/Logo/Logo';
import ImageLinkForm from './componenets/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import Rank from './componenets/Rank/Rank';
import Signin from './componenets/Signin/Signin';
import Register from './componenets/Register/Register';
import './App.css';



const particleOptions ={
                particles: {
                  number:{
                    value:80,
                    density:{
                      enable:true,
                      value_area:700
                    }

                  }

                }
              };


let initialState={
        input :'',
        imageURL:'',
        box:{},
        route:'signin',
        isSignedIn:false,
        user:{
            id:'',
            name:'',
            email:'',
            password:'',
            entries:0,
            joined: ''
        }
    }

class App extends Component {
    constructor(){
      super();
      this.state=initialState;
  }

  loadUser=(data)=>{
    this.setState({user:{
            id:data.id,
            name:data.name,
            email:data.email,
            password:data.password,
            entries:data.entries,
            joined: data.joined
    } } )
  }

  onRouteChange=(route)=>{
    if(route ==='signout')
    {
      this.setState(initialState)
    }else if(route ==='home'){
      this.setState({isSignedIn:true})

    }
    this.setState({route:route});
  }
  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const height=Number(image.height);
    const width=Number(image.width);
    return{

      leftCol:clarifaiFace.left_col *width,
      topRow :clarifaiFace.top_row *height,
      rightCol:width-(clarifaiFace.right_col *width),
      bottomRow:height-(clarifaiFace.bottom_row *height)
    }
  }

  displayBox=(box)=>{
    this.setState({box: box})
  }

  onInputChange =(event)=>{
    this.setState({input:event.target.value});

  }
 onButtonSubmit = ()=>{
 this.setState({imageURL : this.state.input})
fetch('https://obscure-cove-99791.herokuapp.com/imageUrl',{
        method: 'post',
        headers:{ 'Content-type':'application/json'},
        body:JSON.stringify({
          input:this.state.input,

  })
      }).then(response=>response.json())
    .then(response=> {
if(response){
  fetch('https://obscure-cove-99791.herokuapp.com/image',{
        method: 'put',
        headers:{ 'Content-type':'application/json'},
        body:JSON.stringify({
          id:this.state.user.id,

  })
}).then(response=>response.json())
  .then(count=>{
    this.setState(Object.assign(this.state.user,{entries:count}))

  }).catch(console.log)
 this.displayBox(this.calculateFaceLocation(response))}
})
  .catch(err=>console.log(err));
 }

  render() {
    const {isSignedIn ,route ,box ,imageURL} = this.state;
    return (
      <div className="App">

           <Particles className="particles"
              params={particleOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route=== 'home'
           ?  <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm
                 onInputChange={this.onInputChange}
                 onButtonSubmit={this.onButtonSubmit}
                 />
            <FaceRecog box={box} imageURL={imageURL}/>
            </div>
           :(route=== 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )


      }


      </div>
    );
  }
}

export default App;
