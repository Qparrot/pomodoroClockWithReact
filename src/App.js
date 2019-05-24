import React from 'react';
import './App.css';

var accurateInterval = require('accurate-interval');

class BreakLength extends React.Component
{
	render()
	{
		return(
			<div className="BreakLength">
				<h2 id="break-label">Break Length</h2>
				<button id="break-increment" data-value='1' data-div="breakLength" data-timer="timerBreak" onClick={this.props.handleClick}>One minute more</button>
				<div id="break-length">{(this.props.breakLength).toString()}</div>
				<button id="break-decrement" data-value='-1' data-div="breakLength"  data-timer="timerBreak" onClick={this.props.handleClick}>One minute less</button>
			</div>
		);
	}
}

class SessionLength extends React.Component
{
	render()
	{
		return(
			<div className="SessionLength">
				<h2 id="session-label">Session Length</h2>
				<button id="session-increment" data-value='1' data-div="sessionLength" data-timer="timerSession" onClick={this.props.handleClick}>One minute more</button>
				<div id="session-length">{(this.props.sessionLength).toString()}</div>
				<button id="session-decrement" data-value='-1' data-div="sessionLength" data-timer="timerSession" onClick={this.props.handleClick}>One minute less</button>
			</div>
		);
	}
}

class Display extends React.Component
{
	constructor(props)
	{
		super(props);
		this.prettyClock = this.prettyClock.bind(this);
	}

	prettyClock(second)
	{
		let minutes = '';
		let seconds = '';
		second / 60 >= 10 ? minutes = (Math.floor(second / 60)).toString() : minutes = '0' + (Math.floor(second / 60)).toString();
		second % 60 >= 10 ? seconds = (Math.floor(second % 60)).toString() : seconds = '0' + (Math.floor(second % 60)).toString();
		return('' + minutes + ' : ' + seconds);
	}

	text(bolean)
	{
		if(bolean)
			return('Session');
		else
			return('Break');
	}
	render()
	{
		return(
			<div>
				<h2 id="timer-label">{this.text(this.props.isSession)}</h2>
				<div id="time-left">{this.prettyClock(this.props.timer)}</div>
				<button id="start_stop" onClick={this.props.trigger}>Run/Pause</button>
				<button id="reset" onClick={(event) => { this.props.reset()} }>Reset</button>
			</div>
		);
	}

}

class App extends React.Component 
{
	constructor(props)
	{
		super(props);
		this.state = {
			'breakLength': 5,
			'sessionLength': 25,
			'timerSession': 1500,
			'timerBreak': 300,
			'runningTimer': 1500,
			'timerState': 'reset',
			'storedIntervalFunction': '',
			'isThisTimerATimerSession': true
		};
		this.handleClick = this.handleClick.bind(this);
		this.trigger = this.trigger.bind(this);
		this.decrementTimer = this.decrementTimer.bind(this);
		this.reset = this.reset.bind(this);
	}

	handleClick(e)
	{
		let newValue = this.state[e.currentTarget.dataset.div] + parseInt(e.currentTarget.dataset.value);
		if(newValue > 0 && newValue <= 60)
			this.setState({[e.currentTarget.dataset.div]: newValue});
		if(this.state.timerState === 'reset')
		{
			this.setState({[e.currentTarget.dataset.timer]: newValue * 60});
		}
	}

	trigger()
{
		if(this.state.timerState !== 'running')
		{
			this.setState({storedIntervalFunction : accurateInterval(() => this.decrementTimer(), 1000)});
			this.setState({timerState: 'running'});
		}
		if(this.state.timerState === 'running')
		{
			this.state.storedIntervalFunction.clear();
			this.setState({timerState: 'stopped'});

		}
	}

	decrementTimer()
	{
		if(this.state.runningTimer > 0)
			this.setState({runningTimer: this.state.runningTimer - 1});
		if(this.state.runningTimer === 0 && this.state.isThisTimerATimerSession)
		{
			this.setState({ runningTimer: this.state.timerBreak, isThisTimerATimerSession: false});
			this.audioBeep.play();
		}
		if(this.state.runningTimer === 0 && !this.state.isThisTimerATimerSession)
		{
			this.setState({ runningTimer: this.state.timerSession, isThisTimerATimerSession: true});
		}
	}

	reset()
{
		this.setState({timerState: 'reset', runningTimer: this.state.sessionLength * 60, timerSession: this.state.sessionLength * 60, timerBreak: this.state.breakLength * 60});
	if(this.state.timerState !== 'reset')
		this.state.storedIntervalFunction.clear();
}

	render()
	{
		return (
			<div className="App">
				<BreakLength breakLength={this.state.breakLength} handleClick={this.handleClick}/>
				<SessionLength sessionLength={this.state.sessionLength} handleClick={this.handleClick}/>
				<Display trigger={this.trigger} timer={this.state.runningTimer} isSession={this.state.isThisTimerATimerSession} reset={this.reset}/>
			<audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
			</div>
		);
	}
}

export default App;
