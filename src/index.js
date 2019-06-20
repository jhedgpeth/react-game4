import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Counters from './Counters.js';
// import Decimal from 'decimal.js';
// import * as numberformat from 'swarm-numberformat';


// =====================================================

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            junk: true,
        }

        this.state.MyCounters = new Counters();

        var Decimal = require('decimal.js');
        var numberformat = require('swarm-numberformat');
        this.numberformat = new numberformat.Formatter({ backend: 'decimal.js', sigfigs: 3, format: 'engineering', Decimal: Decimal })

        this.tickIntervalId = setInterval(this.updateGame, 1000);
    }

    componentDidMount() {
    }

    updateGame() {

    }





    render() {

        return (
            <div className="main-window">
                <div className="counters">
                    <Counters />
                </div>
                <div className="score-panel">

                </div>
                <div className="control-panel">

                </div>
            </div>
        )
    }


}


// =====================================================

ReactDOM.render(<Game />, document.getElementById("root"));

