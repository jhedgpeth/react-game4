
export class CounterFunc {

    static showNumber(num, numformat) {
        return numformat.format(num);
    }

    static prestigeMultiplier(prestige) {
        return prestige.num.times(prestige.mult);
    }

    static getRevenue(counter, prestige) {
        const Decimal = require('decimal.js');
        const multiplier = Math.floor(counter.owned / 25);
        const prestigeMultiplier = prestige.num.times(prestige.val).div(100).plus(1);
        // console.log("multiplier:" + multiplier.toFixed() + " pmult:" + prestigeMultiplier.toFixed());
        return new Decimal(
            counter.revenue
                .times(Math.pow(2, multiplier))
                .times(counter.owned)
                .times(prestigeMultiplier)
        );
    }

    static sumCounters(counters, revenueFunc, prestige) {
        const Decimal = require('decimal.js');
        let sum = new Decimal(0.00);
        counters.forEach((o) => {
            sum = sum.plus(revenueFunc(o, prestige));
        })
        return sum;
    }

    static getRevenuePerTick(revenue, timeInterval) {
        return revenue.times(timeInterval / 1000);
    }

    static getRevenuePct(revenue, counterSum) {
        return revenue.div(counterSum).times(100).toFixed(2);
    }


    static getCost(counter, purchaseAmt, score) {
        // const Decimal = require('decimal.js');
        const maxbuys = this.maxBuy(counter, score);
        // console.log(maxbuys);
        let numBuy = 0;
        // if (typeof(numBuy) !== "number") {
        //     console.log("numBuy not a number:" + typeof(numBuy));
        // }

        // if (purchaseAmt === "PrimeTime") {
        //     console.log(maxbuys["PrimeTime"]);
        // }

        switch (purchaseAmt) {
            
            case "Max OCD":
                // console.log(maxbuys);
                for (const key of ["max100", "max25"]) {
                    // console.log("maxbuys[" + key + "] = " + maxbuys[key]);
                    if (maxbuys[key] > 0 && numBuy < maxbuys[key]) { numBuy = maxbuys[key]; }
                };
                if (numBuy === 0) {
                    numBuy = 25;
                }
                // console.log("numBuy = " + numBuy);
                break;
            default:
                if (maxbuys[purchaseAmt] !== undefined) {
                    numBuy = maxbuys[purchaseAmt];
                } else {
                    numBuy = purchaseAmt;
                }
                break;
        }

        return ({
            num: numBuy,
            cost: counter.initialCost.times(
                Math.pow(counter.costGrowth, counter.owned)
                * (Math.pow(counter.costGrowth, numBuy) - 1)).div(counter.costGrowth - 1),
        });
    }

    static maxBuy(counter, score) {
        const Decimal = require('decimal.js');
        const max = new Decimal(
            score
                .times(counter.costGrowth - 1)
                .div(
                    counter.initialCost.times(
                        Math.pow(counter.costGrowth, counter.owned))
                )
        ).plus(1).log(counter.costGrowth).floor();
        const max100 = max.div(100).floor().times(100).minus(counter.owned % 100).toFixed(0);
        const max25 = max.div(25).floor().times(25).minus(counter.owned % 25).toFixed(0);
        // const max10 = max.div(10).floor().times(10).minus(counter.owned % 10).toFixed(0);

        // const primes = (this.primeFactorsTo(counter.owned,max).slice(-1)[0] || 0);
        const primes = this.primeFactorsTo(counter.owned + max);
        let primeTime = 0;

        for (const prime in primes) {
            if ((primes[prime] - counter.owned) < max && primes[prime] > primeTime) {
                primeTime = primes[prime] - counter.owned;
                // console.log(primes);
                // console.log("counter: " + counter.name + "  owned: " + counter.owned + "  prime: " + primes[prime] + "  primeTime: " + primeTime + "  max: " + max);
            }
        }
        // if (primes.length > 0 && (primes.slice(-1)[0] - counter.owned) < max) {
        //     primeTime = (primes.slice(-1)[0] - counter.owned);
        //     console.log(primes);
        //     console.log("primeTime: "+primeTime);
        // }
        return ({
            1: 1,
            10: 10,
            25: 25,
            100: 100,
            Max: parseInt(max.toFixed(0), 10),
            PrimeTime: primeTime,
            // max10: parseInt(max10, 10),
            max25: parseInt(max25, 10),
            max100: parseInt(max100, 10),
        });
    }

    static primeFactorsTo(max) {
        var store = [], i, j, primes = [];
        for (i = 2; i <= max; ++i) {
            if (!store[i]) {
                primes.push(i);
                for (j = i << 1; j <= max; j += i) {
                    store[j] = true;
                }
            }
        }
        // console.log(primes);
        return primes;
    }

}

