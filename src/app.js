import React from 'react';

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            showtext: false
        };
    }

    buttonHandler  = () => {
        var showtext = this.state.showtext ? false : true;
        console.log(showtext)
        this.setState({
            showtext
        })
    }

    componentDidMount = () => {
    }

    render(){
        return (
            <div>
                <h1>Heading One</h1>
                <button onClick={this.buttonHandler} id='uniqueButton'> display text </button>
                {this.state.showtext ? <h2>Second Heading</h2> : ''}
            </div>
        )
    }
}