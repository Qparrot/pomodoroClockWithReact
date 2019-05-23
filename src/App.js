import React from 'react';
import './App.css';

class BreakLength extends React.Component
{
	render()
	{
		return(
			<div className="BreakLength">
				<h2>Break Length</h2>
				<button id="addBreakLength" data-value='1' onClick={this.props.handleClick}>One minute more</button>
				<div id="displayBreakLength">{(this.props.breakLength).toString()}</div>
				<button id="reduceBreakLength" data-value='-1' onClick={this.props.handleClick}>One minute less</button>
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
				<button id="addSessionLength" data-value='1' onClick={this.props.handleClick}>One minute more</button>
				<div id="displaySessionLength">{(this.props.sessionLength).toString()}</div>
				<button id="reduceSessionLength" data-value='-1' onClick={this.props.handleClick}>One minute less</button>
			</div>
		);
	}
}

class Display extends React.Component
{
	render()
	{
		return(
			<div>
				<div>{this.props.second}</div>
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
			'second': 60,
			'minute': 5
		};
		this.handleClick = this.handleClick.bind(this);
		this.trigger = this.trigger.bind(this);
	}

	handleClick(e)
	{
		console.log(parseInt(e.currentTarget.dataset.div));
		let newValue = this.state.breakLength + parseInt(e.currentTarget.dataset.value);
		this.setState({breakLength: newValue});
	}

	trigger()
	{
		while(this.state.second !== 0 || this.state.second > 70)
		{
			let newValue = setTimeout(() => this.state.second - 1, 1000);
			console.log(newValue);
			this.setState({second: newValue});
		}
	}
	render()
	{
		return (
			<div className="App">
				<BreakLength breakLength={this.state.breakLength} handleClick={this.handleClick}/>
				<SessionLength sessionLength={this.state.sessionLength} handleClick={this.handleClick}/>
				<Display trigger={this.trigger} second={this.state.second}/>
			</div>
		);
	}
}

export default App;
