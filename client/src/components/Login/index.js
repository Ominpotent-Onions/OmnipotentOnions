import React from 'react';
import io from 'socket.io-client';
import ChatBox from '../Main/Message/ChatBox.js';
import UsernameForm from '../Main/Message/UsernameForm.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      page: 'userForm',
      user: 'anonymous',
      message: '',
      messages: [{user: 'Jasper', message: 'hello'}, {user: 'Waifu', message: 'baka'}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    
    this.socket.on('chat message', (msg) => {
      console.log(msg);
      this.setState({
        messages: msg
      });
    });
  }

  handleUserChange(e) {
    this.setState({
      user: e.target.value
    });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var that = this;
    this.socket.emit('chat message', {user: that.state.user, message: that.state.message});
    this.setState({
      message: ''
    });
  }

  render () {
    return (
      <div>
        <div>LOGO</div>
        <h1>Welcome to connec</h1>
        <p>Lorem ipsum dolor sit amet, ludus probatus assentior te quo, 
        fierent noluisse democritum et vim. Usu vide summo recusabo eu. 
        Abhorreant scribentur in eum, mel facilisis dignissim ne. Id nonumy 
        impedit duo, vocent perfecto at sit, euismod dissentiet te pro. Discere 
        maiestatis dissentiunt nam ut, autem congue te ius, ius velit epicurei 
        concludaturque te. Dissentiunt philosophia suscipiantur est ex.
        Et mundi exerci nam, an bonorum petentium vel. Qui eu case tota constituto. An facilisi principes vim, te quo habeo perfecto quaestio, an mel senserit disputationi. Nec no ubique posidonium. Quas altera et sit.
        </p>
        <div>
          <input type="text" value={this.state.user} onChange={this.handleUserChange}/>
        </div>
        <div>
          <div id="chatbox">
            {
              this.state.messages.map((message, key) => {
                return <ChatBox message={message} key={key}/>;
              })
            }
          </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.message} onChange={this.handleChange}/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;