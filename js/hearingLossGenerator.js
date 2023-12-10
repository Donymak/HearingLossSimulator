//************* Sound Engine Class ***************

function SoundEngine() {

    // constructor of class SoundEngine

    // constants

    // global audio path to the audio files
    this.audioPathForeground = "./audio/simulatorSounds/foreground/";
    this.audioPathBackground = "./audio/simulatorSounds/background/";

    // q factor for the filters
    this.qFactor = 4;

    //internal audio api variables
    this.audioCtx;
    this.gainNodeForeground;
    this.gainNodeBackground;
    this.bufferForeground;
    this.bufferBackground;
    this.sourceForeground;
    this.sourceBackground;
    this.pannerNodeL;
    this.pannerNodeR;
    this.filterR0;
    this.filterR1;
    this.filterR2;
    this.filterR3;
    this.filterR4;
    this.filterR5;
    this.filterR6;
    this.filterR7;
    this.filterR8;
    this.filterR9;
    this.filterL0;
    this.filterL1;
    this.filterL2;
    this.filterL3;
    this.filterL4;
    this.filterL5;
    this.filterL6;
    this.filterL7;
    this.filterL8;
    this.filterL9;

    //internal variables
    this.audioCtxCreated = false;
    this.foregroundLoadBlocker = false;
    this.backgroundLoadBlocker = false;
    this.foregroundLoaded = false;
    this.backgroundLoaded = false;
    this.foregroundPlaying = false;
    this.backgroundPlaying = false;

    this.foregroundID = "0";
    this.backgroundID = "0";

    this.gainForeground = 0.5;
    this.gainBackground = 0.5;

    this.eqL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.eqR = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.avg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.playAVG = false;

    // presets
    this.presetNormal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.presetMildHearingLoss = [0, 0, 0, 0, 5, 10, 10, 20, 10, 0];
    this.presetModerate = [0, 0, 10, 20, 25, 30, 30, 40, 30, 20];
    this.presetSevere = [10, 10, 20, 20, 30, 40, 60, 70, 80, 80];
    this.presetVitalyRiabokonL = [30, 40, 45, 50, 60, 75, 75, 65, 65, 65];
    this.presetVitalyRiabokonR = [30, 30, 37, 35, 50, 50, 50, 45, 60, 45];

}

// creates web audio api context
SoundEngine.prototype.createAudioCtx = function () {
    // Fix up for prefixing
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        this.audioCtxCreated = true;
    } catch (e) {
        alert('Web Audio API is not supported in this browser');
    }

    this.gainNodeForeground = this.audioCtx.createGain();
    this.gainNodeForeground.gain.value = this.gainForeground;
    this.gainNodeForeground.connect(this.audioCtx.destination);

    this.pannerNodeL = this.audioCtx.createPanner();
    this.pannerNodeL.setPosition(-1, 0, 0);

    this.filterL0 = this.audioCtx.createBiquadFilter();
    this.filterL0.type = 'lowshelf';
    this.filterL0.frequency.value = 125;
    this.filterL1 = this.audioCtx.createBiquadFilter();
    this.filterL1.type = 'peaking';
    this.filterL1.frequency.value = 250;
    this.filterL1.Q.value = this.qFactor;
    this.filterL2 = this.audioCtx.createBiquadFilter();
    this.filterL2.type = 'peaking';
    this.filterL2.frequency.value = 500;
    this.filterL2.Q.value = this.qFactor;
    this.filterL3 = this.audioCtx.createBiquadFilter();
    this.filterL3.type = 'peaking';
    this.filterL3.frequency.value = 1000;
    this.filterL3.Q.value = this.qFactor;
    this.filterL4 = this.audioCtx.createBiquadFilter();
    this.filterL4.type = 'peaking';
    this.filterL4.frequency.value = 1500;
    this.filterL4.Q.value = this.qFactor;
    this.filterL5 = this.audioCtx.createBiquadFilter();
    this.filterL5.type = 'peaking';
    this.filterL5.frequency.value = 2000;
    this.filterL5.Q.value = this.qFactor;
    this.filterL6 = this.audioCtx.createBiquadFilter();
    this.filterL6.type = 'peaking';
    this.filterL6.frequency.value = 3000;
    this.filterL6.Q.value = this.qFactor;
    this.filterL7 = this.audioCtx.createBiquadFilter();
    this.filterL7.type = 'peaking';
    this.filterL7.frequency.value = 4000;
    this.filterL7.Q.value = this.qFactor;
    this.filterL8 = this.audioCtx.createBiquadFilter();
    this.filterL8.type = 'peaking';
    this.filterL8.frequency.value = 6000;
    this.filterL8.Q.value = this.qFactor;
    this.filterL9 = this.audioCtx.createBiquadFilter();
    this.filterL9.type = 'highshelf';
    this.filterL9.frequency.value = 8000;
    this.filterL9.Q.value = this.qFactor;
    this.pannerNodeL.connect(this.filterL0).connect(this.filterL1).connect(this.filterL2).connect(this.filterL3).connect(this.filterL4).connect(this.filterL5).connect(this.filterL6).connect(this.filterL7).connect(this.filterL8).connect(this.filterL9).connect(this.audioCtx.destination);

    this.pannerNodeR = this.audioCtx.createPanner();
    this.pannerNodeR.setPosition(1, 0, 0);

    this.filterR0 = this.audioCtx.createBiquadFilter();
    this.filterR0.type = 'lowshelf';
    this.filterR0.frequency.value = 125;
    this.filterR1 = this.audioCtx.createBiquadFilter();
    this.filterR1.type = 'peaking';
    this.filterR1.frequency.value = 250;
    this.filterR1.Q.value = this.qFactor;
    this.filterR2 = this.audioCtx.createBiquadFilter();
    this.filterR2.type = 'peaking';
    this.filterR2.frequency.value = 500;
    this.filterR2.Q.value = this.qFactor;
    this.filterR3 = this.audioCtx.createBiquadFilter();
    this.filterR3.type = 'peaking';
    this.filterR3.frequency.value = 1000;
    this.filterR3.Q.value = this.qFactor;
    this.filterR4 = this.audioCtx.createBiquadFilter();
    this.filterR4.type = 'peaking';
    this.filterR4.frequency.value = 1500;
    this.filterR4.Q.value = this.qFactor;
    this.filterR5 = this.audioCtx.createBiquadFilter();
    this.filterR5.type = 'peaking';
    this.filterR5.frequency.value = 2000;
    this.filterR5.Q.value = this.qFactor;
    this.filterR6 = this.audioCtx.createBiquadFilter();
    this.filterR6.type = 'peaking';
    this.filterR6.frequency.value = 3000;
    this.filterR6.Q.value = this.qFactor;
    this.filterR7 = this.audioCtx.createBiquadFilter();
    this.filterR7.type = 'peaking';
    this.filterR7.frequency.value = 4000;
    this.filterR7.Q.value = this.qFactor;
    this.filterR8 = this.audioCtx.createBiquadFilter();
    this.filterR8.type = 'peaking';
    this.filterR8.frequency.value = 6000;
    this.filterR8.Q.value = this.qFactor;
    this.filterR9 = this.audioCtx.createBiquadFilter();
    this.filterR9.type = 'highshelf';
    this.filterR9.frequency.value = 8000;
    this.filterR9.Q.value = this.qFactor;
    this.pannerNodeR.connect(this.filterR0).connect(this.filterR1).connect(this.filterR2).connect(this.filterR3).connect(this.filterR4).connect(this.filterR5).connect(this.filterR6).connect(this.filterR7).connect(this.filterR8).connect(this.filterR9).connect(this.audioCtx.destination);

};

// loads a foreground sound
SoundEngine.prototype.loadSoundForeground = function () {
    if (!this.foregroundLoaded) {
        var audioName;

        switch (this.foregroundID) {
            case "0":
                audioName = "Female.mp3";
                break;
            case "1":
                audioName = "Male.mp3";
                break;

            default:
        }


        var request0 = new XMLHttpRequest();
        request0.open('GET', this.audioPathForeground + audioName, true);
        request0.responseType = 'arraybuffer';
        // Decode asynchronously
        request0.onload = function () {
            mySoundEngine.audioCtx.decodeAudioData(request0.response, function (buffer0) {
                mySoundEngine.bufferForeground = buffer0;
                mySoundEngine.foregroundLoaded = true;
                mySoundEngine.sourceForeground = mySoundEngine.audioCtx.createBufferSource(), mySoundEngine.gainNodeForeground = mySoundEngine.audioCtx.createGain();
                mySoundEngine.sourceForeground.buffer = mySoundEngine.bufferForeground;
                mySoundEngine.sourceForeground.loop = true;
                mySoundEngine.gainNodeForeground.gain.value = mySoundEngine.gainForeground;
                mySoundEngine.sourceForeground.connect(mySoundEngine.gainNodeForeground);
                mySoundEngine.gainNodeForeground.connect(mySoundEngine.pannerNodeL);
                mySoundEngine.gainNodeForeground.connect(mySoundEngine.pannerNodeR);
                mySoundEngine.sourceForeground.start(0);
                mySoundEngine.foregroundPlaying = true;
            },);
            mySoundEngine.foregroundLoadBlocker = false;
        };
        request0.send();
    }
};

// loads a background sound
SoundEngine.prototype.loadSoundBackground = function () {
    if (!this.backgroundLoaded) {
        var audioName;

        switch (this.backgroundID) {
            case "0":
                audioName = "AirTrackDrill.mp3";
                break;
            case "1":
                audioName = "Babble-Female.mp3";
                break;
            case "2":
                audioName = "Babble-Male.mp3";
                break;
            case "3":
                audioName = "Babble-Male-Female.mp3";
                break;
            case "4":
                audioName = "Blower.mp3";
                break;
            case "5":
                audioName = "Brake Press.mp3";
                break;
            case "6":
                audioName = "Bulldozer.mp3";
                break;
            case "7":
                audioName = "Chisel.mp3";
                break;
            case "8":
                audioName = "Continuous Haulage.mp3";
                break;
            case "9":
                audioName = "Continuous Miner.mp3";
                break;
            case "10":
                audioName = "Generic-High.mp3";
                break;
            case "11":
                audioName = "Generic-Low.mp3";
                break;
            case "12":
                audioName = "Grinder.mp3";
                break;
            case "13":
                audioName = "Jet Landing.mp3";
                break;
            case "14":
                audioName = "Jet Takeoff.mp3";
                break;
            case "15":
                audioName = "Knife.mp3";
                break;
            case "16":
                audioName = "Music-Classical.mp3";
                break;
            case "17":
                audioName = "Music-Pop.mp3";
                break;
            case "18":
                audioName = "Riveting.mp3";
                break;
            case "19":
                audioName = "Silica Mill.mp3";
                break;
            case "20":
                audioName = "Silica Screening Tower.mp3";
                break;
            case "21":
                audioName = "Tinnitus-4K-Square.mp3";
                break;
            case "22":
                audioName = "Turret.mp3";
                break;

            default:
        }


        var request0 = new XMLHttpRequest();
        request0.open('GET', this.audioPathBackground + audioName, true);
        request0.responseType = 'arraybuffer';
        // Decode asynchronously
        request0.onload = function () {
            mySoundEngine.audioCtx.decodeAudioData(request0.response, function (buffer0) {
                mySoundEngine.bufferBackground = buffer0;
                mySoundEngine.backgroundLoaded = true;
                mySoundEngine.sourceBackground = mySoundEngine.audioCtx.createBufferSource(), mySoundEngine.gainNodeBackground = mySoundEngine.audioCtx.createGain();
                mySoundEngine.sourceBackground.buffer = mySoundEngine.bufferBackground;
                mySoundEngine.sourceBackground.loop = true;
                mySoundEngine.gainNodeBackground.gain.value = mySoundEngine.gainBackground;
                mySoundEngine.sourceBackground.connect(mySoundEngine.gainNodeBackground);
                mySoundEngine.gainNodeBackground.connect(mySoundEngine.pannerNodeL);
                mySoundEngine.gainNodeBackground.connect(mySoundEngine.pannerNodeR);
                mySoundEngine.sourceBackground.start(0);
                mySoundEngine.backgroundPlaying = true;
                mySoundEngine.backgroundLoadBlocker = false;
            },);
        };
        request0.send();
    }
};

// starts a foreground sound
SoundEngine.prototype.playForeground = function () {
    if (!this.audioCtxCreated) {
        this.createAudioCtx();
    }

    if (this.audioCtxCreated && !this.foregroundLoaded) {
        if (!this.foregroundLoadBlocker) {
            this.foregroundLoadBlocker = true;
            this.loadSoundForeground();
        }

    } else {
        if (this.foregroundLoaded && !this.foregroundPlaying) {
            this.sourceForeground = this.audioCtx.createBufferSource(), this.gainNodeForeground = this.audioCtx.createGain();
            this.sourceForeground.buffer = this.bufferForeground;
            this.sourceForeground.loop = true;
            this.gainNodeForeground.gain.value = this.gainForeground;
            this.sourceForeground.connect(this.gainNodeForeground);
            this.gainNodeForeground.connect(this.pannerNodeL);
            this.gainNodeForeground.connect(this.pannerNodeR);
            this.sourceForeground.start(0);
            this.foregroundPlaying = true;
        }
    }
};

// starts a background sound
SoundEngine.prototype.playBackground = function () {
    if (!this.audioCtxCreated) {
        this.createAudioCtx();
    }

    if (this.audioCtxCreated && !this.backgroundLoaded) {
        if (!this.backgroundLoadBlocker) {
            this.backgroundLoadBlocker = true;
            this.loadSoundBackground();
        }

    } else {
        if (this.backgroundLoaded && !this.backgroundPlaying) {
            this.sourceBackground = this.audioCtx.createBufferSource(), this.gainNodeBackground = this.audioCtx.createGain();
            this.sourceBackground.buffer = this.bufferBackground;
            this.sourceBackground.loop = true;
            this.gainNodeBackground.gain.value = this.gainBackground;
            this.sourceBackground.connect(this.gainNodeBackground);
            this.gainNodeBackground.connect(this.pannerNodeL);
            this.gainNodeBackground.connect(this.pannerNodeR);
            this.sourceBackground.start(0);
            this.backgroundPlaying = true;
        }
    }
};

// pauses foreground sound
SoundEngine.prototype.pauseForeground = function () {
    if (this.foregroundPlaying) {
        this.sourceForeground.stop();
        this.foregroundPlaying = false;
    }

};

// pauses background sound
SoundEngine.prototype.pauseBackground = function () {
    if (this.backgroundPlaying) {
        this.sourceBackground.stop();
        this.backgroundPlaying = false;
    }
};

// set id for foreground sound
SoundEngine.prototype.setForegroundId = function (value) {
    if (value !== this.foregroundID) {
        this.pauseForeground();
        this.foregroundID = value;
        this.foregroundLoaded = false;
    }

};

// set id for background sound
SoundEngine.prototype.setBackgroundId = function (value) {
    if (value !== this.backgroundID) {
        this.pauseBackground();
        this.backgroundID = value;
        this.backgroundLoaded = false;
    }

};

// set volume
SoundEngine.prototype.setVolume = function (value) {
    valueFloat = parseFloat(value);
    if (valueFloat < 0) {
        this.gainForeground = 0.5;
    } else {
        this.gainForeground = -(valueFloat - 1) / 2;
    }

    if (this.foregroundPlaying) {
        this.gainNodeForeground.gain.value = this.gainForeground;
    }
    if (valueFloat > 0) {
        this.gainBackground = 0.5;
    } else {
        this.gainBackground = (valueFloat + 1) / 2;
    }

    if (this.backgroundPlaying) {
        this.gainNodeBackground.gain.value = this.gainBackground;
    }
};

// get value for filter
SoundEngine.prototype.getValueForFilter = function (leftRight, number) {
    var value;
    if (leftRight === "right") {
        if (this.playAVG) {
            value = this.avg[number];
        } else {
            value = this.eqR[number];
        }

    } else {
        if (this.playAVG) {
            value = this.avg[number];
        } else {
            value = this.eqL[number];
        }

    }

    if (value > 0) {
        value = -value
    }
    return value;
};

// update filter
SoundEngine.prototype.updateFilter = function (leftRight, number) {
    if (this.audioCtxCreated) {
        if (leftRight === "left") {
            switch (number) {
                case 0:
                    this.filterL0.gain.value = this.getValueForFilter("left", number);
                    break;
                case 1:
                    this.filterL1.gain.value = this.getValueForFilter("left", number);

                    break;
                case 2:
                    this.filterL2.gain.value = this.getValueForFilter("left", number);

                    break;
                case 3:
                    this.filterL3.gain.value = this.getValueForFilter("left", number);

                    break;
                case 4:
                    this.filterL4.gain.value = this.getValueForFilter("left", number);

                    break;
                case 5:
                    this.filterL5.gain.value = this.getValueForFilter("left", number);

                    break;
                case 6:
                    this.filterL6.gain.value = this.getValueForFilter("left", number);

                    break;
                case 7:
                    this.filterL7.gain.value = this.getValueForFilter("left", number);

                    break;
                case 8:
                    this.filterL8.gain.value = this.getValueForFilter("left", number);

                    break;
                case 9:
                    this.filterL9.gain.value = this.getValueForFilter("left", number);

                    break;

                default:

            }
        } else {
            switch (number) {
                case 0:
                    this.filterR0.gain.value = this.getValueForFilter("right", number);
                    break;
                case 1:
                    this.filterR1.gain.value = this.getValueForFilter("right", number);

                    break;
                case 2:
                    this.filterR2.gain.value = this.getValueForFilter("right", number);

                    break;
                case 3:
                    this.filterR3.gain.value = this.getValueForFilter("right", number);

                    break;
                case 4:
                    this.filterR4.gain.value = this.getValueForFilter("right", number);

                    break;
                case 5:
                    this.filterR5.gain.value = this.getValueForFilter("right", number);

                    break;
                case 6:
                    this.filterR6.gain.value = this.getValueForFilter("right", number);

                    break;
                case 7:
                    this.filterR7.gain.value = this.getValueForFilter("right", number);

                    break;
                case 8:
                    this.filterR8.gain.value = this.getValueForFilter("right", number);

                    break;
                case 9:
                    this.filterR9.gain.value = this.getValueForFilter("right", number);

                    break;

                default:

            }
        }
    }
};

// set eq values by left/right, number
SoundEngine.prototype.setEq = function (leftRight, number, value) {
    if (leftRight === "left") {
        this.eqL[number] = value;
        this.avg[number] = (parseFloat(this.eqL[number]) + parseFloat(this.eqR[number])) / 2;
        this.updateFilter("left", number);
    }

    if (leftRight === "right") {
        this.eqR[number] = value;
        this.avg[number] = (parseFloat(this.eqL[number]) + parseFloat(this.eqR[number])) / 2;
        this.updateFilter("right", number);
    }
    showAVGValue(number);
};

// set playAVG
SoundEngine.prototype.setPlayAVG = function (play) {
    this.playAVG = play;
    this.updateFilter("left", 0);
    this.updateFilter("left", 1);
    this.updateFilter("left", 2);
    this.updateFilter("left", 3);
    this.updateFilter("left", 4);
    this.updateFilter("left", 5);
    this.updateFilter("left", 6);
    this.updateFilter("left", 7);
    this.updateFilter("left", 8);
    this.updateFilter("left", 9);
    this.updateFilter("right", 0);
    this.updateFilter("right", 1);
    this.updateFilter("right", 2);
    this.updateFilter("right", 3);
    this.updateFilter("right", 4);
    this.updateFilter("right", 5);
    this.updateFilter("right", 6);
    this.updateFilter("right", 7);
    this.updateFilter("right", 8);
    this.updateFilter("right", 9);

};

// set preset
SoundEngine.prototype.setPreset = function (number) {
    var preset, secondPreset;
    switch (number) {
        case 0:
            preset = this.presetNormal;
            break;
        case 1:
            preset = this.presetMildHearingLoss;
            break;
        case 2:
            preset = this.presetModerate;
            break;
        case 3:
            preset = this.presetSevere;
            break;
        case 4:
            preset = this.presetVitalyRiabokonL;
            secondPreset = this.presetVitalyRiabokonR;
            break;

        default:
    }

    this.setEq("left", 0, preset[0]);
    this.setEq("left", 1, preset[1]);
    this.setEq("left", 2, preset[2]);
    this.setEq("left", 3, preset[3]);
    this.setEq("left", 4, preset[4]);
    this.setEq("left", 5, preset[5]);
    this.setEq("left", 6, preset[6]);
    this.setEq("left", 7, preset[7]);
    this.setEq("left", 8, preset[8]);
    this.setEq("left", 9, preset[9]);
    if (secondPreset) {
        this.setEq("right", 0, secondPreset[0]);
        this.setEq("right", 1, secondPreset[1]);
        this.setEq("right", 2, secondPreset[2]);
        this.setEq("right", 3, secondPreset[3]);
        this.setEq("right", 4, secondPreset[4]);
        this.setEq("right", 5, secondPreset[5]);
        this.setEq("right", 6, secondPreset[6]);
        this.setEq("right", 7, secondPreset[7]);
        this.setEq("right", 8, secondPreset[8]);
        this.setEq("right", 9, secondPreset[9]);
    } else {
        this.setEq("right", 0, preset[0]);
        this.setEq("right", 1, preset[1]);
        this.setEq("right", 2, preset[2]);
        this.setEq("right", 3, preset[3]);
        this.setEq("right", 4, preset[4]);
        this.setEq("right", 5, preset[5]);
        this.setEq("right", 6, preset[6]);
        this.setEq("right", 7, preset[7]);
        this.setEq("right", 8, preset[8]);
        this.setEq("right", 9, preset[9]);
    }
    inputEqRight125.value = this.eqR[0];
    inputEqRight250.value = this.eqR[1];
    inputEqRight500.value = this.eqR[2];
    inputEqRight1000.value = this.eqR[3];
    inputEqRight1500.value = this.eqR[4];
    inputEqRight2000.value = this.eqR[5];
    inputEqRight3000.value = this.eqR[6];
    inputEqRight4000.value = this.eqR[7];
    inputEqRight6000.value = this.eqR[8];
    inputEqRight8000.value = this.eqR[9];
    inputEqLeft125.value = this.eqL[0];
    inputEqLeft250.value = this.eqL[1];
    inputEqLeft500.value = this.eqL[2];
    inputEqLeft1000.value = this.eqL[3];
    inputEqLeft1500.value = this.eqL[4];
    inputEqLeft2000.value = this.eqL[5];
    inputEqLeft3000.value = this.eqL[6];
    inputEqLeft4000.value = this.eqL[7];
    inputEqLeft6000.value = this.eqL[8];
    inputEqLeft8000.value = this.eqL[9];
    showAVGValue(0);
    showAVGValue(1);
    showAVGValue(2);
    showAVGValue(3);
    showAVGValue(4);
    showAVGValue(5);
    showAVGValue(6);
    showAVGValue(7);
    showAVGValue(8);
    showAVGValue(9);
};

// Method to load custom audio file
SoundEngine.prototype.loadCustomAudioForeground = function (audioFile) {
    if (!this.audioCtxCreated) {
        this.createAudioCtx();
    }

    var reader = new FileReader();
    reader.onload = (event) => {
        this.audioCtx.decodeAudioData(event.target.result, (buffer) => {
            this.bufferForeground = buffer;
            this.foregroundLoaded = true;
        }, (error) => {
            console.error('Error decoding audio data: ' + error);
        });
    };
    reader.readAsArrayBuffer(audioFile);
    this.setForegroundId(2)

};

//************ Sound Engine Class - End ***************


// useful references
var inputEqRight125 = document.getElementById("inputEqRight125");
var inputEqRight250 = document.getElementById("inputEqRight250");
var inputEqRight500 = document.getElementById("inputEqRight500");
var inputEqRight1000 = document.getElementById("inputEqRight1000");
var inputEqRight1500 = document.getElementById("inputEqRight1500");
var inputEqRight2000 = document.getElementById("inputEqRight2000");
var inputEqRight3000 = document.getElementById("inputEqRight3000");
var inputEqRight4000 = document.getElementById("inputEqRight4000");
var inputEqRight6000 = document.getElementById("inputEqRight6000");
var inputEqRight8000 = document.getElementById("inputEqRight8000");

var inputEqLeft125 = document.getElementById("inputEqLeft125");
var inputEqLeft250 = document.getElementById("inputEqLeft250");
var inputEqLeft500 = document.getElementById("inputEqLeft500");
var inputEqLeft1000 = document.getElementById("inputEqLeft1000");
var inputEqLeft1500 = document.getElementById("inputEqLeft1500");
var inputEqLeft2000 = document.getElementById("inputEqLeft2000");
var inputEqLeft3000 = document.getElementById("inputEqLeft3000");
var inputEqLeft4000 = document.getElementById("inputEqLeft4000");
var inputEqLeft6000 = document.getElementById("inputEqLeft6000");
var inputEqLeft8000 = document.getElementById("inputEqLeft8000");

var outputAVG125 = document.getElementById("outputAVG125");
var outputAVG250 = document.getElementById("outputAVG250");
var outputAVG500 = document.getElementById("outputAVG500");
var outputAVG1000 = document.getElementById("outputAVG1000");
var outputAVG1500 = document.getElementById("outputAVG1500");
var outputAVG2000 = document.getElementById("outputAVG2000");
var outputAVG3000 = document.getElementById("outputAVG3000");
var outputAVG4000 = document.getElementById("outputAVG4000");
var outputAVG6000 = document.getElementById("outputAVG6000");
var outputAVG8000 = document.getElementById("outputAVG8000");


//instance of class SoundEngine
var mySoundEngine = new SoundEngine();


// help functions

// shows AVG value by number
function showAVGValue(number) {
    switch (number) {
        case 0:
            outputAVG125.innerHTML = mySoundEngine.avg[0];
            break;
        case 1:
            outputAVG250.innerHTML = mySoundEngine.avg[1];
            break;
        case 2:
            outputAVG500.innerHTML = mySoundEngine.avg[2];
            break;
        case 3:
            outputAVG1000.innerHTML = mySoundEngine.avg[3];
            break;
        case 4:
            outputAVG1500.innerHTML = mySoundEngine.avg[4];
            break;
        case 5:
            outputAVG2000.innerHTML = mySoundEngine.avg[5];
            break;
        case 6:
            outputAVG3000.innerHTML = mySoundEngine.avg[6];
            break;
        case 7:
            outputAVG4000.innerHTML = mySoundEngine.avg[7];
            break;
        case 8:
            outputAVG6000.innerHTML = mySoundEngine.avg[8];
            break;
        case 9:
            outputAVG8000.innerHTML = mySoundEngine.avg[9];
            break;

        default:
    }
}

// GUI event handler functions

function handleButtonForegroundPlay() {
    mySoundEngine.playForeground();
}

function handleButtonForegroundPause() {
    mySoundEngine.pauseForeground();
}

function handleButtonBackgroundPlay() {
    mySoundEngine.playBackground();
}

function handleButtonBackgroundPause() {
    mySoundEngine.pauseBackground();
}

function handleButtonPresetNormal() {
    mySoundEngine.setPreset(0);
    plotAllOnAudiogram();
}

function handleButtonPresetMildHearingLoss() {
    mySoundEngine.setPreset(1);
    plotAllOnAudiogram();
}

function handleButtonPresetModerate() {
    mySoundEngine.setPreset(2);
    plotAllOnAudiogram();
}

function handleButtonPresetSevere() {
    mySoundEngine.setPreset(3);
    plotAllOnAudiogram();
}

function handleButtonPresetVitalyRiabokon() {
    mySoundEngine.setPreset(4);
    plotAllOnAudiogram();
}

function handleButtonPlayRightAndLeft() {
    mySoundEngine.setPlayAVG(false);
}

function handleButtonPlayAVG() {
    mySoundEngine.setPlayAVG(true);
}

function handleCustomAudioFile(files) {
    if (files.length > 0) {
        // Assuming SoundEngine has a method to handle custom file
        mySoundEngine.loadCustomAudioForeground(files[0]);
    }
}


function init() {

    // set listeners for GUI 

    var buttonForegroundRun = document.getElementById("buttonForegroundRun"),
        buttonForegroundRunIcon = buttonForegroundRun.parentNode.querySelector('i'),
        buttonForegroundRunWrapper = buttonForegroundRun.parentNode;
    buttonForegroundRun.addEventListener("click", function () {
        if (mySoundEngine.foregroundPlaying) {
            buttonForegroundRunWrapper.classList.remove('red-btn')
            buttonForegroundRunWrapper.classList.add('blue-btn')
            buttonForegroundRunIcon.classList.remove('fa-stop');
            buttonForegroundRunIcon.classList.add('fa-play');
            buttonForegroundRun.value = 'Play';
            handleButtonForegroundPause();
        } else {
            buttonForegroundRunWrapper.classList.remove('blue-btn');
            buttonForegroundRunWrapper.classList.add('red-btn');
            buttonForegroundRunIcon.classList.remove('fa-play');
            buttonForegroundRunIcon.classList.add('fa-stop');
            buttonForegroundRun.value = 'Stop';
            handleButtonForegroundPlay();
        }
    });

    var selectForeground = document.getElementById("selectForeground");
    selectForeground.addEventListener("change", function () {
        if (this.value === "2") {
            document.getElementById("customAudioFile").click(); // Trigger file input
        } else {
            // Handle other options as before
            mySoundEngine.setForegroundId(this.value);
        }
    });

    var customOption = document.getElementById("customOption");
    customOption.addEventListener("click", function () {
        document.getElementById("customAudioFile").click(); // Trigger file input
    });

    // var buttonForegroundPlay = document.getElementById("buttonForegroundPlay");
    // buttonForegroundPlay.addEventListener("click",handleButtonForegroundPlay);
    // var buttonForegroundPause = document.getElementById("buttonForegroundPause");
    // buttonForegroundPause.addEventListener("click",handleButtonForegroundPause);

    var buttonBackgroundRun = document.getElementById("buttonBackgroundRun"),
        buttonBackgroundRunIcon = buttonBackgroundRun.parentNode.querySelector('i'),
        buttonBackgroundRunWrapper = buttonBackgroundRun.parentNode;
    buttonBackgroundRun.addEventListener("click", function () {
        if (mySoundEngine.backgroundPlaying) {
            buttonBackgroundRunWrapper.classList.remove('red-btn')
            buttonBackgroundRunWrapper.classList.add('blue-btn')
            buttonBackgroundRunIcon.classList.remove('fa-stop');
            buttonBackgroundRunIcon.classList.add('fa-play');
            buttonBackgroundRun.value = 'Play';
            handleButtonBackgroundPause();
        } else {
            buttonBackgroundRunWrapper.classList.remove('blue-btn');
            buttonBackgroundRunWrapper.classList.add('red-btn');
            buttonBackgroundRunIcon.classList.remove('fa-play');
            buttonBackgroundRunIcon.classList.add('fa-stop');
            buttonBackgroundRun.value = 'Stop';
            handleButtonBackgroundPlay();
        }
    });

    var selectBackground = document.getElementById("selectBackground");
    selectBackground.addEventListener("input", function () {
        if (mySoundEngine.backgroundPlaying)
            buttonBackgroundRun.click();
        mySoundEngine.setBackgroundId(this.value);
    });
    // var buttonBackgroundPlay = document.getElementById("buttonBackgroundPlay");
    // buttonBackgroundPlay.addEventListener("click",handleButtonBackgroundPlay);
    // var buttonBackgroundPause = document.getElementById("buttonBackgroundPause");
    // buttonBackgroundPause.addEventListener("click",handleButtonBackgroundPause);

    var rangeVolume = document.getElementById("rangeVolume");
    rangeVolume.addEventListener("input", function () {
        mySoundEngine.setVolume(this.value);
    });

    var buttonPresetNormal = document.getElementById("buttonPresetNormal");
    buttonPresetNormal.addEventListener("click", handleButtonPresetNormal);
    var buttonPresetMildHearingLoss = document.getElementById("buttonPresetMildHearingLoss");
    buttonPresetMildHearingLoss.addEventListener("click", handleButtonPresetMildHearingLoss);
    var buttonPresetModerate = document.getElementById("buttonPresetModerate");
    buttonPresetModerate.addEventListener("click", handleButtonPresetModerate);
    var buttonPresetSevere = document.getElementById("buttonPresetSevere");
    buttonPresetSevere.addEventListener("click", handleButtonPresetSevere);
    var buttonPresetVitalyRiabokon = document.getElementById("buttonPresetVitalyRiabokon");
    buttonPresetVitalyRiabokon.addEventListener("click", handleButtonPresetVitalyRiabokon);

    inputEqRight125.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 0, this.value);
    });
    inputEqRight250.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 1, this.value);
    });
    inputEqRight500.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 2, this.value);
    });
    inputEqRight1000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 3, this.value);
    });
    inputEqRight1500.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 4, this.value);
    });
    inputEqRight2000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 5, this.value);
    });
    inputEqRight3000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 6, this.value);
    });
    inputEqRight4000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 7, this.value);
    });
    inputEqRight6000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 8, this.value);
    });
    inputEqRight8000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("right", 9, this.value);
    });

    inputEqLeft125.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 0, this.value);
    });
    inputEqLeft250.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 1, this.value);
    });
    inputEqLeft500.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 2, this.value);
    });
    inputEqLeft1000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 3, this.value);
    });
    inputEqLeft1500.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 4, this.value);
    });
    inputEqLeft2000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 5, this.value);
    });
    inputEqLeft3000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 6, this.value);
    });
    inputEqLeft4000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 7, this.value);
    });
    inputEqLeft6000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 8, this.value);
    });
    inputEqLeft8000.addEventListener("input", function () {
        if (this.value >= 0 && this.value <= 80) mySoundEngine.setEq("left", 9, this.value);
    });

    document.getElementById('buttonCustomAudioUpload').addEventListener('click', function() {
        document.getElementById('customAudioUpload').click();
    });

    var buttonPlayRightAndLeft = document.getElementById("buttonPlayRightAndLeft");
    buttonPlayRightAndLeft.addEventListener("click", handleButtonPlayRightAndLeft);
    var buttonPlayAVG = document.getElementById("buttonPlayAVG");
    buttonPlayAVG.addEventListener("click", handleButtonPlayAVG);

}

window.onload = init;