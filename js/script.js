let Paint = function () {

    this.click = false;

    this.tabCo = [];

    this.canvas = document.getElementById('canvas');
    this.overlay = document.getElementById('overlay');
    this.red = document.getElementById('red');
    this.black = document.getElementById('black');
    this.gomme = document.getElementById('gomme');
    this.pinceau = document.getElementById('pinceau');
    this.checkbox = document.getElementById('checkbox');
    this.reset = document.getElementById('reset');
    this.rgb = document.getElementById('rgb');
    this.symetrieX = document.getElementById('symetrieX');
    this.symetrieY = document.getElementById('symetrieY');
    this.doSymX = document.getElementById('doSymX');
    this.doSymY = document.getElementById('doSymY');

    this.r = document.getElementById('r');
    this.g = document.getElementById('g');
    this.b = document.getElementById('b');

    this.checkbox.checked = false;
    this.symetrieX.checked = false;
    this.symetrieY.checked = false;
    
    this.doSymX.checked = false;
    this.doSymY.checked = false;

    this.item = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext('2d');
    this.ctxO = this.overlay.getContext('2d');

    this.ctxO.fillRect(0, 0, 1200, 700);
    this.ctxO.fillStyle = "darkgray";

    for (let linePos = 10; linePos < this.overlay.height; linePos += 10) {
        this.ctxO.fillStyle = "white";
        this.ctxO.fillRect(this.overlay.width / 2 - 3, linePos, 3, 6);
    }

    for (let linePos = 10; linePos < this.overlay.width; linePos += 10) {
        this.ctxO.fillStyle = "white";
        this.ctxO.fillRect(linePos, this.overlay.height / 2 - 3, 6, 3);
    }

    this.color = "black";

    this.initEvents();
}

Paint.prototype.initEvents = function () {

    this.canvas.addEventListener('mousedown', this.down.bind(this));
    this.canvas.addEventListener('mouseup', this.up.bind(this));
    this.canvas.addEventListener('mousemove', this.move.bind(this));
    this.red.addEventListener('click', this.changeColorRed.bind(this));
    this.black.addEventListener('click', this.changeColorBlack.bind(this));
    this.gomme.addEventListener('click', this.gommer.bind(this));
    this.checkbox.addEventListener('click', this.griller.bind(this));
    this.reset.addEventListener('click', this.reload.bind(this));
    this.r.addEventListener('input', this.changeColor.bind(this));
    this.g.addEventListener('input', this.changeColor.bind(this));
    this.b.addEventListener('input', this.changeColor.bind(this));
    this.rgb.addEventListener('click', this.getPinceauCol.bind(this));
    this.doSymX.addEventListener('click', this.doSymetrieX.bind(this));
    this.doSymY.addEventListener('click', this.doSymetrieY.bind(this));
}

Paint.prototype.down = function () {
    this.click = true;
}

Paint.prototype.up = function () {
    this.click = false;
}

Paint.prototype.move = function (e) {

    let mousePos = this.getMousePos(e);
    let x = mousePos.x;
    let y = mousePos.y;

    if (this.click) {
        this.tabCo.push({
            x: x,
            y: y
        });

        this.draw(x, y);

        if (this.symetrieX.checked) {
            this.draw(this.canvas.width - x, y);
        }

        if (this.symetrieY.checked) {
            this.draw(x, this.canvas.height - y);
        }

        if (this.symetrieY.checked && this.symetrieX.checked) {
            this.draw(this.canvas.width - x, this.canvas.height - y);
        }
    }
}

Paint.prototype.draw = function (x, y) {
    const r = this.pinceau.value;

    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    /* return;
     if (this.symetrieX.checked === true && this.symetrieY.checked === true) {
         alert ('Sélectionnez la symétrie X ou Y');
         window.location.reload();
     }

     let nY = this.canvas.height - y;

     if (this.symetrieX.checked) {
         this.ctx.beginPath();
         this.ctx.arc(x, nY, r, 0, 2 * Math.PI);
         this.ctx.fillStyle = this.color;
         this.ctx.fill();
     }

     let nX = this.canvas.width - x;

     if (this.symetrieY.checked) {
         this.ctx.beginPath();
         this.ctx.arc(nX, y, r, 0, 2 * Math.PI);
         this.ctx.fillStyle = this.color;
         this.ctx.fill();
     }*/
}

Paint.prototype.getMousePos = function (e) {
    return {
        x: e.clientX - this.item.left,
        y: e.clientY - this.item.top
    }
}

Paint.prototype.changeColorRed = function () {

    this.color = "red";
}

Paint.prototype.changeColorBlack = function () {

    this.color = "black";
}

Paint.prototype.gommer = function () {

    this.color = "white";
}

Paint.prototype.griller = function () {
    if (this.checkbox.checked == true) {
        this.overlay.style.display = 'block';

    } else {
        this.overlay.style.display = 'none';
    }
}

Paint.prototype.reload = function () {
    window.location.reload();

    this.r.value = '';
    this.g.value = '';
    this.b.value = '';
}

Paint.prototype.changeColor = function () {
    this.rgb.style.backgroundColor = "rgb(" + this.r.value + ", " + this.g.value + ", " + this.b.value + ")";
}

Paint.prototype.getPinceauCol = function () {
    this.color = this.rgb.style.backgroundColor;
}

Paint.prototype.doSymetrieX = function () {
    if (this.doSymX.checked) {
        for (let i in this.tabCo) {
            let element = this.tabCo[i];
            this.draw(element.x, this.canvas.height - element.y)
        }
    }
}

Paint.prototype.doSymetrieY = function () {
    if (this.doSymY.checked) {
        for (let i in this.tabCo) {
            let element = this.tabCo[i];
            this.draw(this.canvas.width - element.x, element.y)
        }
    }
}

let paint = new Paint();
