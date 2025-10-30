export class Result {
    constructor(x=window.innerWidth/2, y=window.innerHeight/2) {
        this.x = x;
        this.y = y;

        this.isDragging = false;

        this.element = document.createElement('div');
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        
        this.element.style.left = `${this.x / rem}rem`;
        this.element.style.top = `${this.y / rem}rem`;
        this.element.classList.add('result');

        document.body.appendChild(this.element);
    }

    add(text) {
        this.element.innerHTML += ` ${text} `;
    }

    clear() {
        this.element.innerHTML = '';
    }

    getXPos() { return this.x; }

    getYPos() { return this.y; }

    setXPos(x) { 
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

        this.x = x; 
        this.element.style.left = `${this.x / rem}rem`;
    }

    setYPos(y) { 
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

        this.y = y;
        this.element.style.top = `${this.y / rem}rem`; 
    }

    setPosition(x, y) {
        this.setXPos(x);
        this.setYPos(y);
    }

    remove() {
        if(this.element && this.element.parentNode)
            this.element.parentNode.removeChild(this.element);
    }
}