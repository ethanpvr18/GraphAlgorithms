import { LinkedList } from './LinkedList.js';
import { Vertex } from './Vertex.js';

export class Graph {
    constructor() {
        this.graphFile = null;
        this.vertices = new LinkedList();
        this.nextVertexNumber = 0;
        this.currentlabel = 'v' + this.nextVertexNumber;
    }

    addVertex(label=this.currentlabel, color, predecessor, distance, finishTime, x, y, key) {
        const vertex = new Vertex(label, color, predecessor, distance, finishTime, x, y, key);
        if(vertex.element) {
            vertex.element.style.left = `${x}rem`;
            vertex.element.style.top = `${y}rem`;
        }
        this.vertices.add(vertex);
        if(label === this.currentlabel) {
            this.nextVertexNumber++;
            this.currentlabel = 'v' + this.nextVertexNumber;
        }

        this.updateGraph();
    }

    findVertex(event) {
        const vertices = this.vertices;
        return vertices.find(v => v.element === event.target || v.element.contains(event.target));
    }

    findVertexByLabel(givenLabel) {
        for(let v of this.vertices) {
            if(v.label === givenLabel) {
                return v;
            }                                 
        }
    }

    findEdge(event) {
        for(let v of this.vertices) {
            for(let e of v.adjEdges) {
                if(e.element.contains(event.target))
                    return e;
            }
        }
    }

    findEdgeByVertices(v1, v2) {
        for(let v of this.vertices) {
            for(let e of v.adjEdges) {
                if(e.u == v1 && e.v == v2) {
                    return e;
                }
            }
        }

        return undefined;
    }

    getMinEdge() {
        let minEdge = null;
        for(let v of this.vertices) {
            for(let e of v.adjEdges) {
                if(!e.element.classList.contains('selected')) {
                    minEdge = e;
                    if(e !== minEdge && e.getWeight() < minEdge.getWeight()) {
                        minEdge = e;
                    }
                }
            }
        }
        return minEdge;
    }

    clearSelection() {
        for(let v of this.vertices) {
            v.deselect();
        }

        for(let v of this.vertices) {
            for(let e of v.adjEdges) {
                e.deselect();
            }
        }
    }

    removeSelection() {
        for(let v of this.vertices) {
            if(v.element.classList.contains('selected')) {
                for(let e of v.adjEdges) {
                    v.adjEdges.remove(v.adjEdges.indexOf(e));
                    e.remove();
                }
                this.vertices.remove(this.vertices.indexOf(v));
                v.remove();
            }
        }

        for(let v of this.vertices) {
            for(let e of v.adjEdges) {
                if(e.element.classList.contains('selected')) {
                    v.adjEdges.remove(v.adjEdges.indexOf(e));
                    e.remove();
                }
            }
        }

        this.updateGraph();
    }

    clear() {
        for(let v of this.vertices) {
            for(let e of v.adjEdges) {
                e.remove();
            }
        }

        for(let v of this.vertices) {
            v.remove();
        }

        this.vertices.clear();
        this.nextVertexNumber = 0;
        this.graphFile = null;

        this.updateGraph();
    }

    async saveGraph(filename='untitled_graph') {
        const vertexData = this.vertices.map(v => ({
            label: v.label,
            color: v.color,
            distance: v.distance,
            finishTime: v.finishTime,
            key: v.key,
            adjEdges: v.adjEdges.map(e => ({
                u: e.u.label,
                v: e.v.label,
                weight: e.weight,
                isDirected: e.isDirected,
                flow: e.flow,
                capacity: e.capacity
            })),
            x: parseFloat(v.element.style.left) || v.x,
            y: parseFloat(v.element.style.top) || v.y,
            classList: v.element.classList
        }));

        const data = JSON.stringify({vertices: vertexData, nextVertexNumber: this.nextVertexNumber}, null, 2);

        try {
            this.graphFile = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [{
                    description: 'JSON Files',
                    accept: {'application/json':['.json']}
                }]
            });

            const writable = await this.graphFile.createWritable();
            await writable.write(data);
            await writable.close();
        } catch (error) {
            console.warn('File save canceled or failed:', error);
        }
    }

    async openGraph() {
        try {
            [this.graphFile] = await window.showOpenFilePicker({
                types: [{
                    description: 'JSON Files',
                    accept: {'*/*':['.json']}
                }]
            });

            const file = await this.graphFile.getFile();
            const fileContent = await file.text();
            const fileGraph = JSON.parse(fileContent);

            this.nextVertexNumber = fileGraph.nextVertexNumber;

            for(let v of fileGraph.vertices)
                this.addVertex(v.label, v.color, v.predecessor, v.distance, v.finishTime, v.x, v.y, v.key);

            for(let v of fileGraph.vertices) {
                for(let e of v.adjEdges) {
                    const sourceVertex = this.findVertexByLabel(e.u);
                    const sinkVertex = this.findVertexByLabel(e.v);

                    if(sourceVertex && sinkVertex)
                        sourceVertex.connect(this, sinkVertex, e.getWeight());
                }
            }

        } catch (error) {
            console.warn('File open canceled or failed:', error);
        }
    }

    updateGraph() {
        if(!localStorage) return;

        if(this.vertices.numOfEntries === 0) {
            localStorage.removeItem('tempGraph');
            return;
        }

        const vertexData = this.vertices.map(v => ({
            label: v.label,
            color: v.color,
            distance: v.distance,
            finishTime: v.finishTime,
            key: v.key,
            adjEdges: v.adjEdges.map(e => ({
                u: e.u.label,
                v: e.v.label,
                weight: e.weight,
                isDirected: e.isDirected,
                flow: e.flow,
                capacity: e.getCapacity()
            })),
            x: parseFloat(v.element.style.left),
            y: parseFloat(v.element.style.top),
            classList: v.element.classList
        }));

        localStorage.setItem('tempGraph', JSON.stringify({vertices: vertexData, nextVertexNumber: this.nextVertexNumber}, null, 2));
    }

    reloadGraph() {
        const unsavedData = JSON.parse(localStorage.getItem('tempGraph'));
        if(!unsavedData) return;

        this.clear();

        for(let v of unsavedData.vertices)
            this.addVertex(v.label, v.color, v.predecessor, v.distance, v.finishTime, v.x, v.y, v.key);

        for(let v of unsavedData.vertices) {
            for(let e of v.adjEdges) {
                const sourceVertex = this.findVertexByLabel(e.u);
                const sinkVertex = this.findVertexByLabel(e.v);

                if(sourceVertex != null && sinkVertex != null)
                    sourceVertex.connect(this, sinkVertex, e.getWeight());
            }
        }
    }
}