/* Audio Gram Class */

function AudioGram() {
    //constants 
    this.X_AXIS = {
        X250: 56,
        X500: 80,
        X1000: 107,
        X2000: 131,
        X3000: 158,
        X4000: 182,
        X5000: 208,
        X6000: 234,
        X7000: 259,
        X8000: 283
    }

    this.Y_AXIS = {
        Y0: [56, 81],
        Y10: [82, 107],
        Y20: [107, 134],
        Y30: [135, 160],
        Y40: [161, 186],
        Y50: [168, 212],
        Y60: [213, 239],
        Y70: [240, 265],
        Y80: [266, 291],
        Y90: [292, 317],
        Y100: [318, 343],
        Y110: [344, 370]
    }

    this.POINTER = {
        LEFT: {
            shape: 'x',
            color: 'blue'
        },
        RIGHT: {
            shape: 'o',
            color: 'red'
        },
        AVG: {
            shape: '+',
            color: 'green'
        }
    }
}
/* AudioGram Class Methods */

// returns Y coord of the pointer on the diagram
AudioGram.prototype.getPointerYCoord = function(y) {

    if (y >= 0 && y < 10) {
        return this.scaleValue(y, this.Y_AXIS.Y0[0], this.Y_AXIS.Y0[1]);
    }
    if (y >= 10 && y < 20) {
        return this.scaleValue(y, this.Y_AXIS.Y10[0], this.Y_AXIS.Y10[1]);
    }
    if (y >= 20 && y < 30) {
        return this.scaleValue(y, this.Y_AXIS.Y20[0], this.Y_AXIS.Y20[1]);
    }
    if (y >= 30 && y < 40) {
        return this.scaleValue(y, this.Y_AXIS.Y30[0], this.Y_AXIS.Y30[1]);
    }
    if (y >= 40 && y < 50) {
        return this.scaleValue(y, this.Y_AXIS.Y40[0], this.Y_AXIS.Y40[1]);
    }
    if (y >= 50 && y < 60) {
        return this.scaleValue(y, this.Y_AXIS.Y50[0], this.Y_AXIS.Y50[1]);
    }
    if (y >= 60 && y < 70) {
        return this.scaleValue(y, this.Y_AXIS.Y60[0], this.Y_AXIS.Y60[1]);
    }
    if (y >= 70 && y < 80) {
        return this.scaleValue(y, this.Y_AXIS.Y70[0], this.Y_AXIS.Y70[1]);
    }
    if (y >= 80 && y < 90) {
        return this.scaleValue(y, this.Y_AXIS.Y80[0], this.Y_AXIS.Y80[1]);
    }
    if (y >= 90 && y < 100) {
        return this.scaleValue(y, this.Y_AXIS.Y90[0], this.Y_AXIS.Y90[1]);
    }
    if (y >= 100 && y < 110) {
        return this.scaleValue(y, this.Y_AXIS.Y100[0], this.Y_AXIS.Y100[1]);
    }
    if (y >= 110 && y < 120) {
        return this.scaleValue(y, this.Y_AXIS.Y110[0], this.Y_AXIS.Y110[1]);
    }
}

// returns info about the pointer that is going to be drawn
AudioGram.prototype.getPointerInfo = function(x, y, right = true) {
    const xCoord = this.X_AXIS[`X${x}`];
    const yCoord = this.getPointerYCoord(y);
    const {
        shape,
        color
    } = (right) ? this.POINTER.RIGHT: this.POINTER.LEFT;

    return {
        x: xCoord,
        y: yCoord,
        shape,
        color,
    }
}


// scales values
AudioGram.prototype.scaleValue = function(value, lowerBound, upperBound) {
    return lowerBound + Math.floor(((upperBound - lowerBound) / 10) * (value % 10 || 1));
}

// draws a single pointer to the diagram 
AudioGram.prototype.drawPointer = function(x, y, right) {
    const {
        x: xCoord,
        y: yCoord,
        shape,
        color
    } = this.getPointerInfo(x, y, right);

    if (y === 0) return;

    const elementId = `X${x}${right?'right':'left'}`;
    let element = document.querySelector(`#${elementId}`);
    const parent = document.querySelector('#audiogramGrid');
    if (element) parent.removeChild(element);

    parent.innerHTML += `<div id="${elementId}" class="resultPointer"></div>`;
    element = document.querySelector(`#${elementId}`);

    if (!element) return;

    element.style.top = `${yCoord}px`;
    element.style.left = `${xCoord}px`;
    element.style.color = color;
    element.innerHTML = shape;
}

// render changes 
AudioGram.prototype.render = function(db, right) {
    this.drawPointer(250, db[0], right);
    this.drawPointer(500, db[1], right);
    this.drawPointer(1000, db[2], right);
    this.drawPointer(2000, db[3], right);
    this.drawPointer(3000, db[4], right);
    this.drawPointer(4000, db[5], right);
    this.drawPointer(5000, db[6], right);
    this.drawPointer(6000, db[7], right);
    this.drawPointer(7000, db[8], right);
    this.drawPointer(8000, db[9], right);
}

AudioGram.prototype.clear = function() {
    const audiogramGrid = document.querySelector('#audiogramGrid');
    const firstChild = audiogramGrid.firstElementChild;
    audiogramGrid.innerHTML = '';
    audiogramGrid.append(firstChild);
}

// global instance of AudioGram class
const audioGram = new AudioGram();

/* AudioGram class end */
/*****************************************************************************************/