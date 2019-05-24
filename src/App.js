import React from 'react';
import './App.css';

var accurateInterval = require('accurate-interval');

class BreakLength extends React.Component
{
	render()
	{
		return(
			<div className="BreakLength">
				<h2>Break Length</h2>
				<button id="addBreakLength" data-value='1' data-div="breakLength" data-timer="timerBreak" onClick={this.props.handleClick}>One minute more</button>
				<div id="displayBreakLength">{(this.props.breakLength).toString()}</div>
				<button id="reduceBreakLength" data-value='-1' data-div="breakLength"  data-timer="timerBreak" onClick={this.props.handleClick}>One minute less</button>
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
				<h2>Session Length</h2>
				<button id="addSessionLength" data-value='1' data-div="sessionLength" data-timer="timerSession" onClick={this.props.handleClick}>One minute more</button>
				<div id="displaySessionLength">{(this.props.sessionLength).toString()}</div>
				<button id="reduceSessionLength" data-value='-1' data-div="sessionLength" data-timer="timerSession" onClick={this.props.handleClick}>One minute less</button>
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

	render()
	{
		return(
			<div>
				<div>{this.prettyClock(this.props.timer)}</div>
				<button onClick={this.props.trigger}>Go</button>
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
			'timerState': 'stopped',
			'storedIntervalFunction': ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.trigger = this.trigger.bind(this);
		this.decrementTimer = this.decrementTimer.bind(this);
	}

	handleClick(e)
	{
		let newValue = this.state[e.currentTarget.dataset.div] + parseInt(e.currentTarget.dataset.value);
		this.setState({[e.currentTarget.dataset.div]: newValue, [e.currentTarget.dataset.timer]: newValue * 60});
	}

	trigger()
	{
		if(this.state.timerState === 'stopped')
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
		if(this.state.timerSession > 0)
		this.setState({timerSession: this.state.timerSession - 1});
	}
	render()
	{
		return (
			<div className="App">
				<BreakLength breakLength={this.state.breakLength} handleClick={this.handleClick}/>
				<SessionLength sessionLength={this.state.sessionLength} handleClick={this.handleClick}/>
				<Display trigger={this.trigger} timer={this.state.timerSession}/>
			</div>
		);
	}
}

export default App;
