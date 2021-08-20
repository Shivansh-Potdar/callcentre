import React ,{ Component } from 'react';
import Websocket from 'react-websocket';
import './App.css';
import './login.css'

function CamUse(){
  // Defualt Camera options
  var constraints = { 
    audio: false, 
    video: {
        width: 648,
        hieght: 648
    } 
  };

  navigator.mediaDevices.getUserMedia(constraints)
  .then( (mediaStream) => {
    var video = document.getElementById("user-video");
    video.srcObject = mediaStream;

    video.onloadedmetadata = () => video.play();

    var cl = document.getElementById("client-video");
    cl.srcObject = mediaStream;

    cl.onloadedmetadata = () => cl.play();

    cl.onloadedmetadata = () => cl.play();
  })
  .catch((err) => { 
    console.log(err.name + ": " + err.message); 
  });
};

class App extends Component {
  constructor() {
    super();
    this.state = { 
      name: "",
      messages: [
        {name: "Shubham", text: "Hello!", key: 1},
      ],
      currentKey: 1,
      signedIn: false
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  signIn(){
    this.setState({
      signedIn: true
    })
  }

  updateName(e){
    this.setState({
      name: e.target.value
    });
  }

  sendMessage(e){
    this.refWebSocket.sendMessage(JSON.stringify({
      name: this.state.name,
      text: "message",
    }));
  }

  handleMessage(e) {
    this.setState({
      key: this.state.key++
    })

    this.state.messages.push({
      name: JSON.parse(e).name,
      text: JSON.parse(e).text,
      key: this.state.key
    });
    console.log(this.state.messages);
  }

  render(){
    if(this.state.signedIn){
      return (
        <div className="body">
          {CamUse()}
          <code>
            <h1>
              Shivansh Call Centre
            </h1>
            <h2>
              Logged in as {this.state.name}
            </h2>
          </code>
          <div className="main-content">
            <div className="videos">
              <div className="client">
                <video id="client-video"/>
              </div>
              <div className='user'>
                <video id="user-video" onClick={this.sendMessage.bind(this)}/>
              </div>
            </div>
            <div className="chat">
            <Websocket url="ws://localhost:8080" onMessage={this.handleMessage} reconnect={true}
            ref={Websocket => {
                    this.refWebSocket = Websocket;
                  }
                }/>
              <ul id="chatlist">
                {
                  this.state.messages.map(message => {
                    return (
                      <>
                        <li key={message.key}><div className="message-name">{message.name}</div>{message.text}</li>
                      </>
                      
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <><div className="login-body">
          
          <form className="login" >
            <input type="text" placeholder="Username" onChange={this.updateName}/>
            <button onClick={this.signIn.bind(this)}>Login</button><br/>
            <code style={{color: 'rgb(85, 82, 82)'}}>
              Name: {this.state.name}
            </code>
          </form>
        </div></>
      );
    }
  }
}

export default App;
