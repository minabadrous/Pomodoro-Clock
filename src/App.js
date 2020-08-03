import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    session: 5,
    break: 1,
    count: 5 * 60,
    switch: 'session',
    reset: true
  }

  modifySession = (e) => {
    if(this.state.reset){
    if(e.target.id === 'add') this.setState({ session: this.state.session += 1 });
    else if(this.state.session >= 2 && e.target.id !== 'add') this.setState({ session: this.state.session -= 1 });
    this.setState({ count: this.state.session * 60 })}
  }

  modifyBreak = (e) => {
    if(this.state.reset){
    if(e.target.id === 'add') this.setState({ break: this.state.break += 1 });
    else if(this.state.break >= 2 && e.target.id !== 'add') this.setState({ break: this.state.break -= 1 });}
  }

  startCountdown = () => {
    this.setState({ reset: false })
    var coundown = setInterval(() => {
      if(this.state.reset) clearInterval(coundown);

      else{
        this.setState({ count: this.state.count - 1 });
      if(this.state.count < 1) {
        if(this.state.switch === 'session'){
        this.setState({ count: this.state.break * 60 , switch: 'break' });}
        else this.setState({ count: this.state.session * 60, switch: 'session' });
      }
      }
      
    } ,1000);
  }

  handleReset = () => {
    this.setState({ 
      reset: true, 
      count: this.state.session * 60,
      switch: 'session'
    });
  }
  
  render(){
      var minutes = parseInt(this.state.count / 60 , 10) ;
      var seconds = parseInt(this.state.count % 60 , 10) ;

      minutes = minutes > 9 ? minutes : '0' + minutes;
      seconds = seconds > 9 ? seconds : '0' + seconds;

  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>
      <div className="headers">
        <span>Session Length</span>
        <span>Break Length</span>
      </div>
      <div className="modify">
        <div className="session">
          <button onClick={this.modifySession}><i id="add" className="fa fa-arrow-up" aria-hidden="true"></i></button>
            <span>{this.state.session}</span>
          <button onClick={this.modifySession}><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
        </div>

        <div className="break">
          <button onClick={this.modifyBreak}><i id="add" className="fa fa-arrow-up" aria-hidden="true"></i></button>
            <span>{this.state.break}</span>
          <button onClick={this.modifyBreak}><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
        </div>
      </div>

      <div className="clock">
        <p>{this.state.switch === 'session' ? 'Session' : 'Break'}</p>
        <p >{minutes + ':' + seconds}</p>
      </div>

      <div className="set">
        <button onClick={this.startCountdown}>
          <i className="fa fa-play" aria-hidden="true"></i>
          <i className="fa fa-pause" aria-hidden="true"></i>
        </button>
        <button onClick={this.handleReset}><i className="fa fa-refresh" aria-hidden="true"></i></button>
      </div>

      <footer>
        <p id="by">Designed and Coded by</p>
        <p id="name">Mina Badrous</p>
      </footer>
      
    </div>

  );

}

}

export default App;
