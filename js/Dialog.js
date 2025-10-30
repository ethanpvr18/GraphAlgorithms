export class Dialog {
    constructor(x=window.innerWidth/2-100, y=window.innerHeight/2-50) {
        this.isDragging = false;
        this.x = x;
        this.y = y;

        this.element = document.createElement('div');
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        this.element.style.left = `${this.x / rem}rem`;
        this.element.style.top = `${this.y / rem}rem`;
        this.element.classList.add('dialog');

        this.form = document.createElement('form');
        this.form.classList.add('form');

        this.label = document.createElement('label');
        this.label.textContent = 'Enter Source Vertex: ';
        this.label.htmlFor = 'userInput';
        this.label.classList.add('label');

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.id = 'userInput';
        this.input.classList.add('input');

        this.submit = document.createElement('input');
        this.submit.type = 'submit';
        this.submit.value = 'Run';
        this.submit.classList.add('submit');

        this.cancel = document.createElement('input');
        this.cancel.type = 'button';
        this.cancel.value = 'Cancel';
        this.cancel.classList.add('cancel');
        this.cancel.classList.add('submit');

        this.promise = new Promise((resolve, reject) => {

            this.submitDialog = (event) => {
                event.preventDefault();
                this.remove();
                resolve(this.input.value.trim());
            };
            this.form.addEventListener('submit', this.submitDialog);

            this.cancelDialog = () => {
                this.remove();
                reject();
            };
            this.cancel.addEventListener('click', this.cancelDialog);
            
        });

        this.form.appendChild(this.label);
        this.form.appendChild(this.input);
        this.form.appendChild(this.submit);
        this.form.appendChild(this.cancel);
        this.element.appendChild(this.form);
        document.body.appendChild(this.element);
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
        if(this.form)
            this.form.removeEventListener('submit', this.submitDialog);
        
        if(this.cancel)
            this.cancel.removeEventListener('click', this.cancelDialog);
        
        if(this.element && this.element.parentNode)
            this.element.parentNode.removeChild(this.element);
    }

    async waitForUserInput() {
        return this.promise;
    }
}