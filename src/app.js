import React from 'react';

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {};
    }

    componentDidMount = () => {
        console.log('component mounted')
    }

    render(){
        return (
            <h1>Travis!</h1>
        )
    }
}