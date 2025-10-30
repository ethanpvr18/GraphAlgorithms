import { LinkedList } from './LinkedList.js';
import { Edge } from './Edge.js';

export class Vertex {
    constructor(label='v0', color='white', predecessor=null, distance=Infinity, finishTime=Infinity, x=0, y=0, key=null) {
        this.label = label;
        this.color = color;
        this.predecessor = predecessor;
        this.distance = distance;
        this.finishTime = finishTime;
        this.x = x;
        this.y = y;
        this.key = key;
        this.adjEdges = new LinkedList();

        this.isDragging = false;

        this.element = document.createElement('div');
        this.element.style.left = `${this.x}rem`;
        this.element.style.top = `${this.y}rem`;
        this.element.classList.add('vertex');
        this.element.textContent = this.label;

        document.body.appendChild(this.element);
    }

    getLabel() { return this.label; }
    getColor() { return this.color; }
    getPredecessor() { return this.predecessor; }
    getDistance() { return this.distance; }
    getFinishTime() { return this.finishTime; }
    getXPos() { return this.x; }
    getYPos() { return this.y; }
    getKey() { return this.key; }

    setLabel(label) { this.label = label; }
    setColor(color) { this.color = color; }
    setPredecessor(predecessor) { this.predecessor = predecessor; }
    setDistance(distance) { this.distance = distance; }
    setFinishTime(finishTime) { this.finishTime = finishTime; }
    setXPos(x) { 
        this.x = x; 
        this.element.style.left = `${this.x}rem`;
    }
    setYPos(y) { 
        this.y = y;
        this.element.style.top = `${this.y}rem`; 
    }
    setKey(key) { this.key = key; }

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
        if(this.element) {
            this.color = 'white';
            this.predecessor = null;
            this.distance = Infinity;
            this.finishTime = Infinity;
            this.key = null;
            this.adjEdges.clear();
            
            if(this.element.parentNode)
                this.element.parentNode.removeChild(this.element);
        }
    }

    setPosition(x, y) {
        this.setXPos(x);
        this.setYPos(y);
    }

    connect(graph, v, weight=1) {
        if (!graph.findEdgeByVertices(this, v) && this instanceof Vertex && v instanceof Vertex) {
            const edge = new Edge(this, v, weight);
            this.adjEdges.add(edge);
            this.deselect(); 
            v.deselect();
            edge.update();
        } else {
            console.error(`Invalid Vertex or Edge ${this.label} to ${v.label} exists!`);
        }
    }
}