import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CfgCounters } from './CfgCounters.js';
import Counters from './Counters.js';
// import Decimal from 'decimal.js';
// import * as numberformat from 'swarm-numberformat';


// =====================================================

class Game extends React.Component {

    constructor(props) {
        super(props);

        const Decimal = require('decimal.js');
        const numberformat = require('swarm-numberformat');
        this.numberformat = new numberformat.Formatter({ backend: 'decimal.js', sigfigs: 3, format: 'engineering', Decimal: Decimal });

        this.state = {
            counters: CfgCounters,
            timeInterval: 1000,
            score: new Decimal(0),
            purchaseOpts: [1, 10, 25, 100],
            purchaseAmt: 1,
        }

        this.updateGame = this.updateGame.bind(this);
        this.showNumber = this.showNumber.bind(this);


        this.income = new Decimal(0);
        this.tickIntervalId = setInterval(this.updateGame, 1000);
    }

    showNumber(num) {
        return this.numberformat.format(num);
    }

    updateGame() {
        this.setState({
            score: this.state.score.plus(this.income),
        })
    }

    setIncome(income) {
        // console.log("Game got callback:" + income);
        this.income = income;
    }

    render() {

        return (
            <div className="main-window">
                <div className="counters">
                    <Counters
                        counters={this.state.counters}
                        timeInterval={this.state.timeInterval}
                        numberformat={this.numberformat}
                        purchaseAmt={this.state.purchaseAmt}
                        callbackIncome={this.setIncome.bind(this)}
                    />
                </div>
                <div className="score-panel">
                    <h1>{this.showNumber(this.state.score)}</h1>
                </div>
                <div className="control-panel">

                </div>
            </div>
        )
    }


}


// =====================================================

ReactDOM.render(<Game />, document.getElementById("root"));

