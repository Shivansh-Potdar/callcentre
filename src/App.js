import React ,{ Component } from 'react';
import './App.css';

const io = require("socket.io")();

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

CamUse();

class App extends Component {
  constructor() {
    super();
    this.state = { 
      messages: [
        {id: 1, text: "Todo 1"},
        {id: 2, text: "Todo 2"},
        {id: 3, text: "Todo 3"}
      ],
      chatState: false
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.showChat = this.showChat.bind(this);
  }

  handleMessage(e) {
    e.preventDefault();
    this.state.messages.push({
      id: 5,
      message: e
    });
  }

  showChat(e) {
    e.preventDefault();
    console.log("Chat on!");
    this.setState({
      chatState: !this.state.chatState
    })
    document.getElementById("chatlist").style.display = this.state.chatState ? "block": "none";
  }

  render(){
    return (
      <body>
        <code>
          <h1>
            Shivansh Call Centre
          </h1>
        </code>
        <div className="main-content">
          <div className="videos">
            <div className="client">
              <video id="client-video"/>
            </div>
            <div className='user'>
              <video id="user-video"/>
            </div>
          </div>
          <div className="chat">
          <i id="gg-comment" className="dot" onClick={this.showChat}/>
            <ul id="chatlist">
              {
                this.state.messages.map(message => {
                  return (
                    <li key={message.id}>{message.text}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </body>
    );
  }
}

export default App;
