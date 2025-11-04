import { LinkedList } from './LinkedList.js';
import { Queue } from './Queue.js';
import { Stack } from './Stack.js';
import { Set } from './Set.js';
import { Result } from './Result.js';

export class GraphAlgorithms {

    constructor() {
        this.result = null;

        this.time = 0;
        this.topoSortedList = new LinkedList();
        this.path = [];
    }
    
    async dfs(graph, sourceVertex) {
        if(this.result) {
            this.result.remove();
            this.result = new Result();
        } else {
            this.result = new Result();
        }
        this.result.clear();
        this.result.add('Depth First Search: ');
        await this.wait();

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

            for(let e of u.adjEdges) {
                if(e.getVertexV().getColor() === 'white') {
                    e.getVertexV().setPredecessor(u);
                    e.select();
                    await this.wait();
                    await this.dfsVisit(graph, e.getVertexV());
                }
            }

            this.incrementTime(1);
            u.setFinishTime(this.getTime());
            u.setColor('black');
            u.select();
            this.result.add(u.getLabel());
            await this.wait();
        }
    }

    async bfs(graph, sourceVertex) {
        if(this.result) {
            this.result.remove();
            this.result = new Result();
        } else {
            this.result = new Result();
        }
        this.result.clear();
        this.result.add('Breadth First Search: ');
        await this.wait();

        for(let u of graph.vertices) {
            if(u !== sourceVertex) {
                u.setColor('white');
                u.deselect();
                u.setDistance(Infinity);
                u.setPredecessor(null);
            }
        }

        sourceVertex.setColor('gray');
        sourceVertex.setDistance(0);
        sourceVertex.setPredecessor(null);

        let queue = new Queue();
        
        queue.enqueue(sourceVertex);

        while(!queue.isEmpty()) {
            let u = queue.dequeue();

            for(let e of u.adjEdges) {
                if(e.getVertexV().getColor() === 'white') {
                    e.getVertexV().setColor('gray');
                    e.getVertexV().setDistance(u.getDistance() + 1);
                    e.getVertexV().setPredecessor(u);
                    e.select('red');
                    await this.wait();
                    queue.enqueue(e.getVertexV());
                }
            }

            u.setColor('black');
            u.select();
            this.result.add(u.getLabel());
            await this.wait();
        }
    }

    async topoSort(graph, sourceVertex) {
        if(this.result) {
            this.result.remove();
            this.result = new Result();
        } else {
            this.result = new Result();
        }
        this.result.clear();
        this.result.add('Topological Sort: ');
        await this.wait();

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

            for(let e of u.adjEdges) {
                if(e.getVertexV().getColor() === 'white') {
                    e.getVertexV().setPredecessor(u);
                    e.select();
                    await this.wait();
                    await this.topoSortVisit(graph, e.getVertexV());
                }
            }

            this.incrementTime(1);
            u.setFinishTime(this.getTime());
            this.topoSortedList.add(u);
            u.setColor('black');
            u.select();
            this.result.add(u.getLabel());
            await this.wait();
        }
    }

    async createMst(graph, rootVertex) {
        if(this.result) {
            this.result.remove();
            this.result = new Result();
        } else {
            this.result = new Result();
        }
        this.result.clear();
        this.result.add('Minimum Spanning Tree');
    
        for (let vertex of graph.vertices) {
            vertex.setKey(Infinity);
            vertex.setPredecessor(null);
        }

        rootVertex.setKey(0);

        let verticesArray = [];
        
        for (let vertex of graph.vertices) {
            verticesArray.push(vertex);
        }

        while(verticesArray.length > 0) {

            let minIndex = 0;

            for (let i = 0; i < verticesArray.length; i++) {
                if(verticesArray[i].getKey() < verticesArray[minIndex].getKey())
                    minIndex = i;
            }

            let currentVertex = verticesArray[minIndex];
            verticesArray.splice(minIndex, 1);
            currentVertex.select();

            if(currentVertex.getPredecessor() != null) {
                let currentEdge = graph.findEdgeByVertices(currentVertex.getPredecessor(), currentVertex);
                
                if(currentEdge != null)
                    currentEdge.select();
            }

            this.result.add(currentVertex.getLabel());
            await this.wait();

            for (let edge of currentVertex.adjEdges) {
                let currentEdge = graph.findEdgeByVertices(currentVertex, edge.getVertexV());
                let found = false;

                for (let i = 0; i < verticesArray.length; i++) {
                    if(verticesArray[i] == edge.getVertexV())
                        found = true;
                }

                if(found && currentEdge.getWeight() < edge.getVertexV().getKey()) {
                    edge.getVertexV().setPredecessor(currentVertex);
                    edge.getVertexV().setKey(currentEdge.getWeight());
                }
            }
        }
    }

    async findShortestPath(graph, startVertex, destinationVertex) {
        if(this.result) {
            this.result.remove();
            this.result = new Result();
        } else {
            this.result = new Result();
        }
        this.result.clear();
        this.result.add('Shortest Path: ');
        await this.wait();
    
        this.initializeSingleSource(graph, startVertex);

        for (let i = 1; i < graph.vertices.getLength() - 1; i++) {
            for (let vertex of graph.vertices) {
                for (let edge of vertex.adjEdges) {
                    this.relax(edge.getVertexU(), edge.getVertexV(), edge.getWeight());
                }
            }
        }
        
        for (let vertex of graph.vertices) {
            for (let edge of vertex.adjEdges) {
                if(edge.getVertexV().getDistance() > edge.getVertexU().getDistance() + edge.getWeight()) {
                    return;
                }
            }
        }

        let stack = new Stack();
    
        let currentVertex = destinationVertex;

        while(currentVertex != startVertex) {
            stack.push(currentVertex);
            currentVertex = currentVertex.getPredecessor();
        }

        startVertex.select();
        this.result.add(startVertex.getLabel());
        await this.wait();

        while(!stack.isEmpty()) {
            
            currentVertex = stack.pop();
            
            if(currentVertex != null && startVertex != null) {
                let currentEdge = graph.findEdgeByVertices(startVertex, currentVertex);
                currentEdge.select();
                await this.wait();
            }

            currentVertex.select();
            this.result.add(currentVertex.getLabel());
            await this.wait();

            startVertex = currentVertex;
        }

    }

    async findMaxFlow(graph, sourceVertex, sinkVertex) {
        if(this.result) {
            this.result.remove();
            this.result = new Result();
        } else {
            this.result = new Result();
        }
        this.result.clear();
        this.result.add('Maximum Flow: ');
        await this.wait();

        for (let vertex of graph.vertices) {            
            for (let edge of vertex.adjEdges) {            
                edge.setFlow(0);
            }
        }

        while(this.hasPath(graph, sourceVertex, sinkVertex)) {
            for (let edge of this.getPath(graph, s, v)) {
                let residualCapacity = edge.getCapacity() - edge.getFlow()
                edge.setFlow(edge.getFlow() + residualCapacity);

                let reverseEdge = graph.findEdgeByVertices(edge.getVertexV, edge.getVertexU);
                if(reverseEdge)
                    reverseEdge.setFlow(edge.getFlow() - residualCapacity);
            }
        }
        
    }

    async findMaxMatch(graph) {
        if(this.result) {
            this.result.remove();
            this.result = new Result();
        } else {
            this.result = new Result();
        }
        this.result.clear();
        this.result.add('Maximum Matching: ');
        await this.wait();
    }

    initializeSingleSource(graph, s) {
        for(let v of graph.vertices) {
            v.setDistance(Infinity);
            v.setPredecessor(null);
        }

        s.setDistance(0);
    }

    relax(u, v, w) {
        if(v.getDistance() > u.getDistance() + w) {
            v.setDistance(u.getDistance() + w);
            v.setPredecessor(u);
        }
    }

    hasPath(graph, s, v) {
        if(v == s) {
            return false;
        } else if(v.getPredecessor() == null) {
            return false;
        } else {
            this.hasPath(graph, s, v.getPredecessor());
            return true;
        }
    }

    getPath(graph, s, v) {
        if(v == s) {
            return this.path;
        } else if(v.getPredecessor() == null) {
            return this.path;
        } else {
            this.path.push(graph.findEdgeByVertices(v.getPredecessor()), v);
            this.getPath(graph, s, v.getPredecessor());
            return this.path;
        }
    }

    wait() { return new Promise(resolve => setTimeout(resolve, 400)); }
    getTime() { return this.time; }
    resetTime() { this.time = 0; }
    incrementTime(increment) { this.time += increment; }
}