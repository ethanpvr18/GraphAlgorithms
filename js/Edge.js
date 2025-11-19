export class Edge {
    constructor(u, v, weight=1, isDirected=true, flow=0, capacity=weight) {
        this.u = u;
        this.v = v;
        this.weight = weight;
        this.isDirected = isDirected;
        this.flow = flow;
        this.capacity = capacity;
        this.visited = false;

        this.element = document.createElement('div');
        this.element.classList.add('edge');
        
        this.edgeWeight = document.createElement('div');
        this.edgeWeight.classList.add('edge-weight');
        this.edgeWeight.textContent = this.weight;

        this.edgeFlow = document.createElement('div');
        this.edgeFlow.classList.add('edge-flow');
        this.edgeFlow.textContent = this.flow;

        this.edgeArrow = document.createElement('div');
        this.edgeArrow.classList.add('edge-arrow');


        document.body.appendChild(this.element);
        document.body.appendChild(this.edgeWeight);
        document.body.appendChild(this.edgeFlow);
        document.body.appendChild(this.edgeArrow);
    }

    update() {
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

        if(!this.u.element || !this.v.element) return;

        const graphRect = document.body.getBoundingClientRect();
        const v1Rect = this.u.element.getBoundingClientRect();
        const v2Rect = this.v.element.getBoundingClientRect();
        
        if(v1Rect.width === 0 || v2Rect.width === 0) {
            return;
        }

        const x1 = (v1Rect.left + v1Rect.width / 2) / rem;
        const y1 = (v1Rect.top + v1Rect.height / 2) / rem;
        const x2 = (v2Rect.left + v2Rect.width / 2) / rem;
        const y2 = (v2Rect.top + v2Rect.height / 2) / rem;

        // const x1 = ((v1Rect.left + v1Rect.width / 2) - graphRect.left) / rem;
        // const y1 = ((v1Rect.top + v1Rect.height / 2) - graphRect.top) / rem;
        // const x2 = ((v2Rect.left + v2Rect.width / 2) - graphRect.left) / rem;
        // const y2 = ((v2Rect.top + v2Rect.height / 2) - graphRect.top) / rem;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        if(length > 0) {
            this.element.style.left = `${x1}rem`;
            this.element.style.top = `${y1}rem`;
            this.element.style.width = `${length}rem`;
            this.element.style.transform = `rotate(${angle}deg)`;

            const labelX = (x1 + x2) / 2;
            const labelY = (y1 + y2) / 2;
            this.edgeWeight.style.left = `${labelX}rem`;
            this.edgeWeight.style.top = `${labelY - 0.5}rem`;
            this.edgeWeight.style.width = `${1}rem`;
            this.edgeWeight.style.height = `${1}rem`;

            this.edgeFlow.style.left = `${labelX - 1.5}rem`;
            this.edgeFlow.style.top = `${labelY - 0.5}rem`;
            this.edgeFlow.style.width = `${1}rem`;
            this.edgeFlow.style.height = `${1}rem`;

            this.edgeArrow.style.left = `${x2 - (dx / length) * 1.0}rem`;
            this.edgeArrow.style.top = `${y2 - (dy / length) * 1.0}rem`;
            this.edgeArrow.style.transform = `translate(-50%, 0) rotate(${angle + 90}deg)`;
        }

        if(this.isDirected) {
            this.edgeArrow.style.display = 'block';
        }else{
            this.edgeArrow.style.display = 'none';
        }
    }

    getWeight() { return this.weight; }
    getVertexU() { return this.u; }
    getVertexV() { return this.v; }
    getIsDirected() { return this.isDirected; }
    getFlow() { return this.flow; }
    getCapacity() { return this.capacity; }

    isVisited() { return this.visited; }

    visit() {
        this.visited = true; 
    }

    setWeight(weight) { 
        this.weight = weight; 
        this.edgeWeight.textContent = this.weight;
        this.setCapacity(this.weight);
        this.update();
    }

    setVertexU(u) { this.u = u; }
    setVertexV(v) { this.v = v; }
    setIsDirected(isDirected) { this.isDirected = isDirected; }

    setFlow(flow) { 
        this.flow = flow; 
        this.edgeFlow.textContent = this.flow;
        this.update();
    }

    setCapacity(capacity) { 
        this.capacity = capacity; 
    }

    select(color='red') {
        if(this.element && !this.element.classList.contains('selected')) {
            this.element.classList.add('selected');
            this.element.style.boxShadow = `0rem 0rem 0.3rem 0.3rem ${color}`;
            this.element.style.border = `0.01rem solid ${color}`;
        }
    }

    deselect() {
        if(this.element && this.element.classList.contains('selected')) {
            this.element.classList.remove('selected');
            this.element.style.boxShadow = `0rem 0rem 0.3rem 0.3rem transparent`;
            this.element.style.border = `0.01rem solid black`;
        }
    }

    remove() {
        if(this.edgeWeight && this.edgeWeight.parentNode)
            this.edgeWeight.parentNode.removeChild(this.edgeWeight);

        if(this.edgeFlow && this.edgeFlow.parentNode)
            this.edgeFlow.parentNode.removeChild(this.edgeFlow);

        if(this.edgeArrow && this.edgeArrow.parentNode)
            this.edgeArrow.parentNode.removeChild(this.edgeArrow);

        if(this.element && this.element.parentNode)
            this.element.parentNode.removeChild(this.element);
    }
}