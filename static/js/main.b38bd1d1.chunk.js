(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,s){e.exports=s(21)},20:function(e,t,s){},21:function(e,t,s){"use strict";s.r(t);var a=s(11),i=s(3),n=s(4),r=s(7),o=s(6),c=s(2),u=s(8),l=s(0),m=s.n(l),h=s(14),p=s.n(h),d=(s(20),s(1)),b=s.n(d);function v(){return[{name:"Lemonade Stand",revenue:new b.a(1.67),initialVisible:1,owned:1,initialCost:new b.a(4),costGrowth:1.07,boostPct:0,boostMult:0,isVisible:!0,disabled:!0},{name:"Newspaper Delivery",revenue:new b.a(20),initialVisible:60,owned:0,initialCost:new b.a(60),costGrowth:1.15,boostPct:0,boostMult:0,isVisible:!1,disabled:!0},{name:"Car Wash",revenue:new b.a(90),initialVisible:540,owned:0,initialCost:new b.a(720),costGrowth:1.14,boostPct:0,boostMult:0,isVisible:!1,disabled:!0},{name:"Pizza Delivery",revenue:new b.a(360),initialVisible:4320,owned:0,initialCost:new b.a(8640),costGrowth:1.13,boostPct:0,boostMult:0,isVisible:!1,disabled:!0},{name:"Donut Shop",revenue:new b.a(2160),initialVisible:51840,owned:0,initialCost:new b.a(103680),costGrowth:1.12,boostPct:0,boostMult:0,isVisible:!1,disabled:!0},{name:"Shrimp Boat",revenue:new b.a(6480),initialVisible:622080,owned:0,initialCost:new b.a(1244160),costGrowth:1.11,boostPct:0,boostMult:0,isVisible:!1,disabled:!0},{name:"Hockey Team",revenue:new b.a(19440),initialVisible:7464960,owned:0,initialCost:new b.a(14929920),costGrowth:1.1,boostPct:0,boostMult:0,isVisible:!1,disabled:!0},{name:"Movie Studio",revenue:new b.a(58320),initialVisible:89579520,owned:0,initialCost:new b.a(179159040),costGrowth:1.9,boostPct:0,boostMult:0,isVisible:!1,disabled:!0},{name:"Bank",revenue:new b.a(174960),initialVisible:1074954240,owned:0,initialCost:new b.a(2149908480),costGrowth:1.8,boostPct:0,boostMult:0,isVisible:!1,disabled:!0},{name:"Oil Company",revenue:new b.a(804816),initialVisible:29668737024,owned:0,initialCost:new b.a(25798901760),costGrowth:1.7,boostPct:0,boostMult:0,isVisible:!1,disabled:!0}]}var f=function(){function e(){Object(i.a)(this,e)}return Object(n.a)(e,null,[{key:"showNumber",value:function(e,t){return t.format(e)}},{key:"prestigeMultiplier",value:function(e){return e.num.times(e.mult)}},{key:"getRevenue",value:function(e,t){var a=s(1),i=Math.floor(e.owned/25),n=t.num.times(t.val).div(100).plus(1);return new a(e.revenue.times(Math.pow(2,i)).times(e.owned).times(n))}},{key:"sumCounters",value:function(e,t,a){var i=new(s(1))(0);return e.forEach(function(e){i=i.plus(t(e,a))}),i}},{key:"getRevenuePerTick",value:function(e,t){return e.times(t/1e3)}},{key:"getRevenuePct",value:function(e,t){return e.div(t).times(100).toFixed(2)}},{key:"getCost",value:function(e,t,s){var a=this.maxBuy(e,s),i=0;switch(t){case"Max":0===i&&(i=1);break;case"Max OCD":for(var n=0,r=["max100","max25"];n<r.length;n++){var o=r[n];a[o]>0&&i<a[o]&&(i=a[o])}0===i&&(i=25);break;default:i=void 0!==a[t]?a[t]:0===i?1:t}return{num:i,cost:e.initialCost.times(Math.pow(e.costGrowth,e.owned)*(Math.pow(e.costGrowth,i)-1)).div(e.costGrowth-1)}}},{key:"maxBuy",value:function(e,t){var a=new(s(1))(t.times(e.costGrowth-1).div(e.initialCost.times(Math.pow(e.costGrowth,e.owned)))).plus(1).log(e.costGrowth).floor(),i=a.div(100).floor().times(100).minus(e.owned%100).toFixed(0),n=a.div(25).floor().times(25).minus(e.owned%25).toFixed(0),r=this.primeFactorsTo(),o=0;for(var c in r)if(r[c]-e.owned<a){o=r[c]-e.owned;break}return{1:1,10:10,25:25,100:100,Max:parseInt(a.toFixed(0),10),PrimeTime:o,max25:parseInt(n,10),max100:parseInt(i,10)}}},{key:"primeFactorsTo",value:function(){if(this.primes)return this.primes;var e=[];console.log("creating primes"),console.time("prime creation");var t,s,a=[];for(t=2;t<=25e3;++t)if(!a[t])for(e.push(t),s=t<<1;s<=25e3;s+=t)a[s]=!0;return this.primes=e.reverse(),console.timeEnd("prime creation"),console.log("primes length: "+this.primes.length),this.primes}}]),e}(),g=function(e){function t(){return Object(i.a)(this,t),Object(r.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this,t=this.props.counter,s=f.getCost(t,this.props.purchaseAmt,this.props.score),a="counter-name "+(s.num>0&&this.props.score.gte(s.cost)?"canAfford":"cannotAfford"),i=[];return i.push(m.a.createElement("button",{className:a,key:t.name+"button",disabled:t.disabled,onClick:function(){return e.props.handlePurchase(t)}},t.name," x ",s.num)),i.push(m.a.createElement("div",{className:"newCounterAnimOverlay",key:t.name+"anim"})),i.push(m.a.createElement("div",{className:"counter-val",key:t.name+"owned"},t.owned)),m.a.createElement(m.a.Fragment,null,i)}}]),t}(m.a.Component);function w(e){var t=e.counter,s=f.getRevenue(e.counter,e.prestige),a=f.sumCounters(e.counters,f.getRevenue,e.prestige),i=f.getCost(t,e.purchaseAmt,e.score),n=f.showNumber(s,e.numberFormat),r=f.showNumber(f.getRevenuePct(s,a),e.numberFormat),o=f.showNumber(i.cost,e.numberFormat),c="counter-stats-price "+(e.score.gte(f.getCost(t,e.purchaseAmt,e.score).cost)?"canAfford":"cannotAfford"),u=[];return u.push(m.a.createElement("div",{className:c,key:t.name+"stats-price"},"$",o)),u.push(m.a.createElement("div",{className:"counter-stats-rate",key:t.name+"stats-rate"},n," /s")),u.push(m.a.createElement("div",{className:"counter-stats-percent",key:t.name+"stats-percent"},r,"%")),m.a.createElement("div",{className:"counter-stats-wrapper"},u)}var k=function(e){function t(){return Object(i.a)(this,t),Object(r.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(n.a)(t,[{key:"renderCounters",value:function(){var e=this,t=this.props.counters.map(function(t){return t.isVisible?m.a.createElement("div",{className:"counter-wrapper",key:t.name},m.a.createElement(g,{counter:t,score:e.props.score,purchaseAmt:e.props.purchaseAmt,handlePurchase:e.props.handlePurchase}),m.a.createElement(w,{counter:t,score:e.props.score,counters:e.props.counters,prestige:e.props.prestige,timeInterval:e.props.timeInterval,numberFormat:e.props.numberformat,purchaseAmt:e.props.purchaseAmt})):m.a.createElement("div",{className:"counter-wrapper",key:t.name})});return m.a.createElement("div",null," ",t)}},{key:"render",value:function(){return this.renderCounters()}}]),t}(m.a.Component),E=function(e){function t(e){var n;Object(i.a)(this,t),n=Object(r.a)(this,Object(o.a)(t).call(this,e));var u=s(1),l=s(22);return n.numberformat=new l.Formatter({backend:"decimal.js",sigfigs:4,format:"engineering",Decimal:u}),n.timeIntervalDefault=100,n.state={counters:v(),score:new u(0),prestige:{num:new u(0),val:5},prestigeNext:new u(0),lifetimeEarnings:new u(0),purchaseOpts:["1","10","25","100","Max","Max OCD","PrimeTime"],purchaseAmt:"1",incomePerSec:new u(0),incomePerTick:new u(0),pause:!1,pauseText:"Pause",timeInterval:n.timeIntervalDefault},n.timeInterval=n.timeIntervalDefault,n.cleanState=Object(a.a)({},n.state),delete n.cleanState.pauseText,delete n.cleanState.purchaseAmt,n.updateGame=n.updateGame.bind(Object(c.a)(n)),n.handlePurchase=n.handlePurchase.bind(Object(c.a)(n)),n.isTimerRunning=n.isTimerRunning.bind(Object(c.a)(n)),n.stopTimer=n.stopTimer.bind(Object(c.a)(n)),n.startTime=n.startTimer.bind(Object(c.a)(n)),n.pause=n.pause.bind(Object(c.a)(n)),n.restart=n.restart.bind(Object(c.a)(n)),n.updateInterval=n.updateInterval.bind(Object(c.a)(n)),n.freqUp=n.freqUp.bind(Object(c.a)(n)),n.freqDown=n.freqDown.bind(Object(c.a)(n)),n.calcPrestigeEarned=n.calcPrestigeEarned.bind(Object(c.a)(n)),n.prestige=n.prestige.bind(Object(c.a)(n)),n.tickIntervalId=setInterval(n.updateGame,n.timeInterval),n.prestigeIntervalId=setInterval(n.calcPrestigeEarned,1e3),n}return Object(u.a)(t,e),Object(n.a)(t,[{key:"restart",value:function(){this.setState(this.cleanState),this.timeInterval=this.timeIntervalDefault,this.setState({counters:v()}),this.stopTimer(),this.startTimer()}},{key:"isTimerRunning",value:function(){return!!this.tickIntervalId}},{key:"stopTimer",value:function(){this.isTimerRunning()&&(console.log("stopping timer"),clearInterval(this.tickIntervalId),this.tickIntervalId=void 0)}},{key:"startTimer",value:function(){if(!this.isTimerRunning()){console.log("starting timer");var e=setInterval(this.updateGame,this.timeInterval);this.tickIntervalId=e}}},{key:"pause",value:function(){this.isTimerRunning()?(console.log("pausing..."),this.stopTimer(),this.setState({pauseText:"Resume"})):(console.log("trying to unpause..."),this.startTimer(),this.setState({pauseText:"Pause"}))}},{key:"updateInterval",value:function(e){this.timeInterval=e,this.setState({timeInterval:e}),this.isTimerRunning()&&(this.stopTimer(),this.startTimer())}},{key:"freqUp",value:function(){var e=this.timeInterval+50,t=e<=5e3?e:5e3;this.updateInterval(t)}},{key:"freqDown",value:function(){var e=this.timeInterval-50,t=e>=10?e:10;this.updateInterval(t)}},{key:"updatePurchaseAmt",value:function(e){-1!==this.state.purchaseOpts.indexOf(e)&&this.state.purchaseAmt!==e&&this.setState({purchaseAmt:e})}},{key:"calcPrestigeEarned",value:function(){var e=s(1).sqrt(this.state.lifetimeEarnings.div(Math.pow(10,9))).times(150).floor();e!==this.state.prestigeNext&&this.setState({prestigeNext:e})}},{key:"prestige",value:function(){this.calcPrestigeEarned();var e=this.state.prestige.num.plus(this.state.prestigeNext);this.restart(),this.setState({prestige:{num:e,val:this.state.prestige.val}})}},{key:"updateGame",value:function(){var e=this,t=!1,s=this.state.counters.map(function(s){var a=f.getCost(s,e.state.purchaseAmt,e.state.score);return!1===s.isVisible&&e.state.score.gte(s.initialVisible)&&(s.isVisible=!0,t=!0),!1!==s.disabled||0!==a.num&&!e.state.score.lt(a.cost)||(s.disabled=!0,t=!0),!0===s.disabled&&a.num>0&&e.state.score.gte(a.cost)&&(s.disabled=!1,t=!0),s});t&&this.setState({counters:s});var a=f.sumCounters(this.state.counters,f.getRevenue,this.state.prestige),i=f.getRevenuePerTick(a,this.timeInterval),n=this.state.lifetimeEarnings.plus(i);this.setState({incomePerSec:a,incomePerTick:i,score:this.state.score.plus(i),lifetimeEarnings:n})}},{key:"handlePurchase",value:function(e){var t=f.getCost(e,this.state.purchaseAmt,this.state.score);if(console.log("handlePurchase cost:"+t.cost.toFixed(0)),this.state.score.gte(t.cost)){console.log("purchasing "+t.num+" x "+e.name+" at $"+t.cost.toFixed(2));var s=Object(a.a)({},e);s.owned=e.owned+t.num;var i=this.state.score.minus(t.cost),n=this.state.counters.map(function(t){return t.name===e.name?s:t});this.setState({counters:n,score:i})}else console.log("not enough money to purchase "+e.name+" at $"+t.cost.toFixed(2)+" < "+this.state.score.toFixed(2))}},{key:"render",value:function(){var e=this,t=this.state.prestige.num.times(this.state.prestige.val),s=this.state.prestigeNext.gt(0)?"prestige prestige-Avail":"prestige prestige-notAvail";return m.a.createElement("div",{className:"main-window"},m.a.createElement("div",{className:"counters"},m.a.createElement(k,{counters:this.state.counters,prestige:this.state.prestige,score:this.state.score,timeInterval:this.timeInterval,numberformat:this.numberformat,purchaseAmt:this.state.purchaseAmt,handlePurchase:this.handlePurchase})),m.a.createElement("div",{className:"score-panel"},m.a.createElement("h1",null,"$",f.showNumber(this.state.score,this.numberformat)),m.a.createElement("h3",null,f.showNumber(this.state.incomePerSec,this.numberformat)," /s"),m.a.createElement("h3",null,f.showNumber(this.state.incomePerTick,this.numberformat)," /tick"),m.a.createElement("h3",null,"tick = ",this.state.timeInterval," ms"),m.a.createElement("h3",null,f.showNumber(this.state.lifetimeEarnings,this.numberformat)," lifetime earnings"),m.a.createElement("h3",null,f.showNumber(this.state.prestige.num,this.numberformat),"\xa0prestige gives\xa0",f.showNumber(t,this.numberformat),"%"),m.a.createElement("h3",null,f.showNumber(this.state.prestigeNext,this.numberformat)," next prestige")),m.a.createElement("div",{className:"control-panel"},m.a.createElement("button",{className:"pause-button",onClick:this.pause},this.state.pauseText),m.a.createElement("button",{className:"pause-button",onClick:this.restart},"Restart"),m.a.createElement("button",{className:"freqUp",onClick:this.freqUp},"Slower"),m.a.createElement("button",{className:"freqDown",onClick:this.freqDown},"Faster"),m.a.createElement("div",{className:"timerRunning"},"timerRunning: ",this.isTimerRunning().toString()),m.a.createElement("br",null),m.a.createElement("div",{className:"purchaseAmts"},this.state.purchaseOpts.map(function(t){var s="purchase-amount";return t===e.state.purchaseAmt&&(s="purchase-amount amt-selected"),m.a.createElement("button",{key:t,className:s,onClick:function(){e.updatePurchaseAmt(t)}},t)})),m.a.createElement("div",null,m.a.createElement("br",null),m.a.createElement("button",{className:s,disabled:!this.state.prestigeNext.gt(0),onClick:this.prestige},"Prestige"))))}}]),t}(m.a.Component);p.a.render(m.a.createElement(E,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b38bd1d1.chunk.js.map