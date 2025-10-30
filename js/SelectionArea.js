export class SelectionArea {
    constructor() {
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;

        this.isDragging = false;

        this.element = document.createElement('div');
        this.element.classList.add('selection-area');
    }

    open(x=0, y=0) {
        this.startX = x;
        this.startY = y;
        this.endX = x;
        this.endY = y;
        this.isDragging = true;

        this.element.style.left = `${x}rem`;
        this.element.style.top = `${y}rem`;
        this.element.style.width = '0rem';
        this.element.style.height = '0rem';

        document.body.appendChild(this.element);
    }

    update(x, y) {
        if(this.isDragging){
            this.endX = x;
            this.endY = y;

            this.element.style.left = Math.min(this.startX, this.endX) + 'rem';
            this.element.style.top = Math.min(this.startY, this.endY) + 'rem';
            this.element.style.width = Math.abs(this.startX - this.endX) + 'rem';
            this.element.style.height = Math.abs(this.startY - this.endY) + 'rem';
        }
    }

    close() {
        if(this.isDragging) {
            const width = Math.abs(this.startX - this.endX);
            const height = Math.abs(this.startY - this.endY);
            if(width < 5 && height < 5) {
                this.element.remove();
            } else if(this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
        
        this.isDragging = false;
    }

    select(graph) {
        const rect = this.element.getBoundingClientRect();
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

        for(const v of graph.vertices) {
            const vRect = v.element.getBoundingClientRect();
            if(vRect.left / rem >= rect.left / rem &&
                vRect.right / rem <= rect.right / rem &&
                vRect.top / rem >= rect.top / rem &&
                vRect.bottom / rem <= rect.bottom / rem
            ) {
                v.select();
            }
        }

        for(const v of graph.vertices) {
            for(const e of v.adjEdges) {
                const eRect = e.element.getBoundingClientRect();
                if(eRect.left / rem >= rect.left / rem &&
                    eRect.right / rem <= rect.right / rem &&
                    eRect.top / rem >= rect.top / rem &&
                    eRect.bottom / rem <= rect.bottom / rem
                ) {
                    e.select();
                }
            }
        }
    }
}