export class Result {
    constructor(x=window.innerWidth/2, y=window.innerHeight/2) {
        this.x = x;
        this.y = y;

        this.isDragging = false;

        this.element = document.createElement('div');
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        
        this.element.style.left = `${(document.body.getBoundingClientRect().width/2) / rem || this.x}rem`;
        this.element.style.top = `${(document.body.getBoundingClientRect().height/2) / rem || this.y}rem`;
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
        this.x = x; 
        this.element.style.left = `${this.x}rem`;
    }

    setYPos(y) {         
        this.y = y;
        this.element.style.top = `${this.y}rem`; 
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