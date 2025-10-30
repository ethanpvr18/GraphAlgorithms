import { LinkedList } from './LinkedList.js';
import { Queue } from './Queue.js';
import { Set } from './Set.js';
import { Result } from './Result.js';

export class GraphAlgorithms {

    constructor() {
        this.result = null;

        this.time = 0;
        this.topoSortedList = new LinkedList();
    }
    
    async dfs(graph, sourceVertex) {
        if(this.result === null)
            this.result = new Result();
        this.result.clear();
        this.result.add('Depth First Search: ');
        await this.wait(600);

        for(let u of graph.vertices) {
            u.setColor('white');
            u.deselect();
            u.setPredecessor(null);
        }

        this.resetTime();

        await this.dfsVisit(graph, sourceVertex);
    }

    async dfsVisit(graph, u) {
        if(u.getColor() === 'white') {
            this.incrementTime(1);
            u.setDistance(this.getTime());
            u.setColor('gray');
            u.select('gray');

            for(let e of u.adjEdges) {
                if(e.getVertexV().getColor() === 'white') {
                    e.getVertexV().setPredecessor(u);
                    await this.wait(600);
                    await this.dfsVisit(graph, e.getVertexV());
                }
            }

            this.incrementTime(1);
            u.setFinishTime(this.getTime());
            u.setColor('black');
            u.select('black');
            this.result.add(u.getLabel());
            await this.wait(600);
        }
    }

    async bfs(graph, sourceVertex) {
        if(this.result === null)
            this.result = new Result();
        this.result.clear();
        this.result.add('Breadth First Search: ');
        await this.wait(600);

        for(let u of graph.vertices) {
            if(u !== sourceVertex) {
                u.setColor('white');
                u.deselect();
                u.setDistance(Infinity);
                u.setPredecessor(null);
            }
        }

        sourceVertex.setColor('gray');
        sourceVertex.select('gray');
        sourceVertex.setDistance(0);
        sourceVertex.setPredecessor(null);

        let queue = new Queue();
        
        queue.enqueue(sourceVertex);

        while(!queue.isEmpty()) {
            let u = queue.dequeue();

            for(let e of u.adjEdges) {
                if(e.getVertexV().getColor() === 'white') {
                    e.getVertexV().setColor('gray');
                    e.getVertexV().select('gray');
                    e.getVertexV().setDistance(u.getDistance() + 1);
                    e.getVertexV().setPredecessor(u);
                    await this.wait(600);
                    queue.enqueue(e.getVertexV());
                }
            }

            u.setColor('black');
            u.select('black');
            this.result.add(u.getLabel());
            await this.wait(600);
        }
    }

    async topoSort(graph, sourceVertex) {
        if(this.result === null)
            this.result = new Result();
        this.result.clear();
        this.result.add('Topological Sort: ');
        await this.wait(600);

        for(let u of graph.vertices) {
            u.setColor('white');
            u.deselect();
            u.setPredecessor(null);
        }

        this.resetTime();

        await this.topoSortVisit(graph, sourceVertex);
    }

    async topoSortVisit(graph, u) {
        if(u.getColor() === 'white') {
            this.incrementTime(1);
            u.setDistance(this.getTime());
            u.setColor('gray');
            u.select('gray');

            for(let e of u.adjEdges) {
                if(e.getVertexV().getColor() === 'white') {
                    e.getVertexV().setPredecessor(u);
                    await this.wait(600);
                    await this.topoSortVisit(graph, e.getVertexV());
                }
            }

            this.incrementTime(1);
            u.setFinishTime(this.getTime());
            this.topoSortedList.add(u);
            u.setColor('black');
            u.select('black');
            this.result.add(u.getLabel());
            await this.wait(600);
        }
    }

    async createMst(graph) {
        if(this.result === null)
            this.result = new Result();
        this.result.clear();
        this.result.add('Minimum Spanning Tree');

        let safeEdge = this.getSafeEdge(graph);

        while(safeEdge != null) {
            safeEdge.select();

            for(let v of graph.vertices) {
                if(safeEdge.u == v && !v.element.classList.contains('selected'))
                    v.select();
                if(safeEdge.v == v && !v.element.classList.contains('selected'))
                    v.select();
            }

            await this.wait(600);
            safeEdge = this.getSafeEdge(graph);
        }
        
    }

    getSafeEdge(graph) {
        let safeEdge = null;
        for (let vertex of graph.vertices) {
            for (let edge of vertex.adjEdges) {
                if(safeEdge == null) {
                    if(!edge.element.classList.contains('selected') && !edge.u.element.classList.contains('selected') && !edge.v.element.classList.contains('selected')) {
                        safeEdge = edge;
                    }
                } else if (safeEdge.weight > edge.weight) {
                    if(!edge.element.classList.contains('selected') && !edge.u.element.classList.contains('selected') && !edge.v.element.classList.contains('selected')) {
                        safeEdge = edge;
                    }
                } else {
                    return safeEdge;
                }
            }
        }
    }

    async findShortestPath(graph, startVertex, destinationVertex) {
        if(this.result === null)
            this.result = new Result();
        this.result.clear();
        this.result.add('Shortest Path: ');
        await this.wait(600);

        startVertex.select();
        console.log(startVertex.adjEdges);
    }

    initializeSingleSource(graph, s) {
        for(let v of graph.vertices) {
            v.distance = Infinity;
            v.predecessor = null;
        }

        s.distance = 0;
    }

    relax(u, v, w) {
        if(v.distance > u.distance + w) {
            v.distance = u.distance + w;
            v.predecessor = u;
        }
    }

    printPath(graph, s, v) {
        if(this.result === null)
            this.result = new Result();
        this.result.clear();
        this.result.add('Path: ');

        if(v == s) {
            this.result.add(s.getLabel());
        } else if(v.predecessor == null) {
            this.result.add('No path exists.');
        } else {
            printPath(graph, s, v.predecessor);
            this.result.add(v.getLabel());
        }
    }

    wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    getTime() { return this.time; }
    resetTime() { this.time = 0; }
    incrementTime(increment) { this.time += increment; }
}