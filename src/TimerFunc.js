isTimerRunning() {
        return this.state.intervalId ? true : false;
    }

    stopTimer(force = false) {
        if (this.isTimerRunning() || force) {
            console.log("stopping timer");
            clearInterval(this.state.intervalId)
            this.setState({
                intervalId: undefined,
            })
        }
    }

    startTimer(force = false) {
        if (!this.isTimerRunning() || force) {
            console.log("starting timer");
            const newIntervalId = setInterval(this.updateScore, this.state.timeInterval);
            this.setState({
                intervalId: newIntervalId,
            })
        }
    }

    pause() {
        if (this.state.intervalId) {
            console.log("pausing...");
            console.log(this.state);
            this.stopTimer();
            this.setState({
                pauseText: "Resume"
            })
        } else {
            console.log("trying to unpause...")
            this.startTimer();
            this.setState({
                pauseText: "Pause",
            })
        }
    }

    updateInterval(interval) {
        this.setState({
            timeInterval: interval,
        })
        if (this.isTimerRunning()) {
            this.stopTimer({ force: true });
            this.startTimer({ force: true });
        }
    }

    freqUp() {
        const testVal = this.state.timeInterval + 50;
        const newFreq = testVal <= 5000 ? testVal : 5000;
        this.updateInterval(newFreq);
    }

    freqDown() {
        const testVal = this.state.timeInterval - 50;
        const newFreq = testVal >= 50 ? testVal : 50;
        this.updateInterval(newFreq);
    }
