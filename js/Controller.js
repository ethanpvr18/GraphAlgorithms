import { Graph } from './Graph.js';
import { Toolbar } from './Toolbar.js';
import { SelectionArea } from './SelectionArea.js';
import { Editor } from './Editor.js';
import { Dialog } from './Dialog.js';
import { TwoInputDialog } from './TwoInputDialog.js';
import { GraphAlgorithms } from './GraphAlgorithms.js';

const toolbar = new Toolbar();
let graph = new Graph();
const selectionArea = new SelectionArea();
const graphAlgorithms = new GraphAlgorithms();

let currentVertex = null;
let previousVertex = null;
let currentEdge = null;
let currentEditor = null;
let currentDialog = null;

let draggedVertex = null;
let draggedDialog = null;
let draggedResult = null;

let dragOffsetX = 0;
let dragOffsetY = 0;

const elementModifier = (event) => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';
    
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

    if(event.target.classList.contains('vertex')) {
        if(currentVertex == null && previousVertex == null) {
            currentVertex = graph.findVertex(event);
            if(currentVertex && currentVertex != null)
                currentVertex.select();
            if(currentEditor != null) {
                currentEditor.remove();
                currentEditor = null;
            }
            currentEditor = new Editor(graph, currentVertex.element, (currentVertex.element.getBoundingClientRect().left / rem) + 2.5, (currentVertex.element.getBoundingClientRect().top / rem));

            return;
        } else {
            previousVertex = currentVertex;
            currentVertex = graph.findVertex(event);
            if(currentVertex && currentVertex != null)
                currentVertex.select();
            if(currentEditor != null) {
                currentEditor.remove();
                currentEditor = null;
            }
            currentEditor = new Editor(graph, currentVertex.element, (currentVertex.element.getBoundingClientRect().left / rem) + 2.5, (currentVertex.element.getBoundingClientRect().top / rem));
        
            if(previousVertex && previousVertex != null && currentVertex && currentVertex != null && previousVertex != currentVertex) {
                previousVertex.connect(graph, currentVertex);
                graph.updateGraph();

                graph.clearSelection();
                previousVertex = null;
                currentVertex = null;
                if(currentEditor !== null) {
                    currentEditor.remove();
                    currentEditor = null;
                }
            }

            return;
        }
    }

    if(event.target.classList.contains('edge') || event.target.classList.contains('edge-weight') || event.target.classList.contains('edge-arrow')) {
        currentEdge = graph.findEdge(event);
        currentEdge.select();
        if(currentEditor != null) {
            currentEditor.remove();
            currentEditor = null;
        }
        currentEditor = new Editor(graph, currentEdge.edgeWeight, (currentEdge.edgeWeight.getBoundingClientRect().left / rem) + 2.5, (currentEdge.edgeWeight.getBoundingClientRect().top / rem));
        return;
    }

    if(!event.target.classList.contains('vertex') && !event.target.classList.contains('edge') && !event.target.classList.contains('edge-weight') && !event.target.classList.contains('edge-arrow') && !event.target.classList.contains('toolbar') && !event.target.classList.contains('editor') && !event.target.classList.contains('dialog') && !event.target.classList.contains('result') && !event.target.classList.contains('btn') && !event.target.classList.contains('submit')) {
        graph.clearSelection();
        
        if(currentEditor !== null) {
            currentEditor.remove();
            currentEditor = null;
        }
        
        graph.addVertex(`v${graph.vertices.numOfEntries}`, 'white', null, Infinity, Infinity, (event.clientX - 48) / rem, (event.clientY - 48) / rem, null);
        graph.updateGraph();

        return;
    }
};

document.addEventListener('dblclick', elementModifier);

const elementKeyModifier = (event) => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    if(event.key === 'Escape') {
        graph.clearSelection();
        currentVertex = null;
        previousVertex = null;
        currentEdge = null;

        if(currentEditor !== null) {
            currentEditor.remove();
            currentEditor = null;
        }

        if(currentDialog !== null) {
            currentDialog.remove();
            currentDialog = null;
        }

        if(graphAlgorithms && graphAlgorithms.result != null)
            graphAlgorithms.result.remove();
    }
        

    if((event.ctrlKey || event.metaKey) && event.key === 'Backspace') {
        graph.removeSelection();
        graph.updateGraph();
        if(graphAlgorithms && graphAlgorithms.result != null)
            graphAlgorithms.result.remove();
    }

    if((event.ctrlKey || event.metaKey) && event.key === 'a') {
        for(const v of graph.vertices) {
            v.select();
            for(const e of v.adjEdges) {
                e.select();
            }
        }
    }

    if((event.ctrlKey || event.metaKey) && event.key === 'c') {
        for(let v of this.vertices) {
            if(v.element.classList.contains('selected')) {

            }
        }

        for(let v of this.vertices) {
            for(let e of v.adjEdges) {
                if(e.element.classList.contains('selected')) {
                
                }
            }
        }
    }

    if((event.ctrlKey || event.metaKey) && event.key === 'v') {

    }

    if((event.ctrlKey || event.metaKey) && event.key === 'x') {

    }

    if((event.ctrlKey || event.metaKey) && event.key === 'z') {

    }
};

document.addEventListener('keydown', elementKeyModifier);

const mouseDownListener = (event) => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';
        
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

    if(event.target.classList.contains('vertex')) {
        draggedVertex = graph.findVertex(event);
        if(!draggedVertex) return;
        if(draggedVertex && !draggedVertex.isDragging) {
            draggedVertex.isDragging = true;
            if(draggedVertex.element.classList.contains('selected'))
                draggedVertex.deselect();
        }
    }

    if(!event.target.classList.contains('vertex') && !event.target.classList.contains('edge') && !event.target.classList.contains('edge-weight') && !event.target.classList.contains('edge-arrow') && !event.target.classList.contains('toolbar') && !event.target.classList.contains('editor') && !event.target.classList.contains('dialog') && !event.target.classList.contains('form') && !event.target.classList.contains('label') && !event.target.classList.contains('input') && !event.target.classList.contains('submit') && !event.target.classList.contains('cancel')&& !event.target.classList.contains('result') && !event.target.classList.contains('btn')) {
        selectionArea.open(event.clientX / rem, event.clientY / rem);
        selectionArea.update(event.clientX / rem, event.clientY / rem);
    }

    if(event.target.closest('.dialog')) {
        draggedDialog = currentDialog;
        if(draggedDialog && !draggedDialog.isDragging) {
            draggedDialog.isDragging = true;
            const rect = draggedDialog.element.getBoundingClientRect();
            dragOffsetX = (event.clientX - rect.left) / rem;
            dragOffsetY = (event.clientY - rect.top) / rem;
        }
    }

    if(event.target.closest('.result')) {
        draggedResult = graphAlgorithms.result;
        if(draggedResult && !draggedResult.isDragging) {
            draggedResult.isDragging = true;
            const rect = draggedResult.element.getBoundingClientRect();
            dragOffsetX = (event.clientX - rect.left) / rem;
            dragOffsetY = (event.clientY - rect.top) / rem;
        }
    }
};

document.addEventListener('mousedown', mouseDownListener);

const mouseMoveListener = (event) => {
    if(draggedVertex && draggedVertex.isDragging) {
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        draggedVertex.setPosition(((event.clientX - 30) / rem) - (((event.clientX - 30) / rem) % 1), ((event.clientY - 30) / rem) - (((event.clientY - 30) / rem) % 1));
        for(const v of graph.vertices) {
            for(const e of v.adjEdges) {
                e.update();
            }
        }
    }

    if(draggedDialog && draggedDialog.isDragging) {
        draggedDialog.setPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
    }

    if(draggedResult && draggedResult.isDragging) {
        draggedResult.setPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
    }

    if(selectionArea && selectionArea.isDragging) {
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        selectionArea.update(event.clientX / rem, event.clientY / rem);
        selectionArea.select(graph);
    }
};

document.addEventListener('mousemove', mouseMoveListener);

const mouseUpListener = (event) => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

    if(draggedVertex && draggedVertex.isDragging) {
        draggedVertex.isDragging = false;
        draggedVertex = null;
        graph.updateGraph();
    }

    if(draggedDialog && draggedDialog.isDragging) {
        draggedDialog.isDragging = false;
        draggedDialog = null;
    }

    if(draggedResult && draggedResult.isDragging) {
        draggedResult.isDragging = false;
        draggedResult = null;
    }

    if(selectionArea.isDragging) {
        selectionArea.update(event.clientX / rem, event.clientY / rem);
        selectionArea.select(graph);
        selectionArea.close();
    }
};

document.addEventListener('mouseup', mouseUpListener);

const openBtnListener = () => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    graph.openGraph();
};

toolbar.openBtn.addEventListener('click', openBtnListener);

const saveBtnListener = () => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    graph.saveGraph();
};

toolbar.saveBtn.addEventListener('click', saveBtnListener);

const closeBtnListener = () => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    if(graph) {
        graph.clear();
        graph.updateGraph();
    }
    if(localStorage)
        localStorage.removeItem('tempGraph');
    if(graphAlgorithms && graphAlgorithms.result != null)
        graphAlgorithms.result.remove();
};

toolbar.closeBtn.addEventListener('click', closeBtnListener);

const printBtnListener = () => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';
        
    window.print();
};

toolbar.printBtn.addEventListener('click', printBtnListener);

const dfsBtnListener = async () => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    graph.clearSelection();
    currentDialog = null;
    currentDialog = new Dialog();
        
    const userInput = await currentDialog.waitForUserInput();
    const sourceVertex = graph.findVertexByLabel(userInput);
    if(!sourceVertex) return;

    graphAlgorithms.dfs(graph, sourceVertex);
};

toolbar.dfsBtn.addEventListener('click', dfsBtnListener);

const bfsBtnListener = async () => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    graph.clearSelection();
    currentDialog = null;
    currentDialog = new Dialog();

    const userInput = await currentDialog.waitForUserInput();
    const sourceVertex = graph.findVertexByLabel(userInput);
    if(!sourceVertex) return;

    graphAlgorithms.bfs(graph, sourceVertex);
};

toolbar.bfsBtn.addEventListener('click', bfsBtnListener);

const topoSortBtnListener = async () => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    graph.clearSelection();
    currentDialog = null;
    currentDialog = new Dialog();

    const userInput = await currentDialog.waitForUserInput();
    const sourceVertex = graph.findVertexByLabel(userInput);
    if(!sourceVertex) return;

    graphAlgorithms.topoSort(graph, sourceVertex);
};

toolbar.topoSortBtn.addEventListener('click', topoSortBtnListener);

const mstBtnListener = async () => {

    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    graph.clearSelection();
    currentDialog = null;
    currentDialog = new Dialog();
        
    const userInput = await currentDialog.waitForUserInput();
    const sourceVertex = graph.findVertexByLabel(userInput);
    if(!sourceVertex) return;

    graphAlgorithms.createMst(graph, sourceVertex);
};

toolbar.mstBtn.addEventListener('click', mstBtnListener);

const shortestPathBtnListener = async () => {
    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    graph.clearSelection();
    currentDialog = null;
    currentDialog = new TwoInputDialog();

    const userInput = await currentDialog.waitForUserInput();

    const startVertex = graph.findVertexByLabel(userInput[0]);
    if(!startVertex) return;
    const destinationVertex = graph.findVertexByLabel(userInput[1]);
    if(!destinationVertex) return;

    graphAlgorithms.findShortestPath(graph, startVertex, destinationVertex);
};

toolbar.shortestPathBtn.addEventListener('click', shortestPathBtnListener);

const maxFlowBtnListener = async () => {
    if(toolbar.controlsDialog.style.display == 'block')
            toolbar.controlsDialog.style.display = 'none';

    graph.clearSelection();
    currentDialog = null;
    currentDialog = new TwoInputDialog();

    const userInput = await currentDialog.waitForUserInput();

    const sourceVertex = graph.findVertexByLabel(userInput[0]);
    if(!sourceVertex) return;
    const sinkVertex = graph.findVertexByLabel(userInput[1]);
    if(!sinkVertex) return;

    graphAlgorithms.findMaxFlow(graph, sourceVertex, sinkVertex);
};

toolbar.maxFlowBtn.addEventListener('click', maxFlowBtnListener);

const beforeUnloadListener = () => {
    graph.updateGraph();
};

window.addEventListener('beforeunload', beforeUnloadListener);

const loadListener = () => {        
    if(localStorage.getItem('tempGraph')) {
        graph.reloadGraph();
        graph.updateGraph();
    }

    if(graphAlgorithms && graphAlgorithms.result != null)
        graphAlgorithms.result.remove();
};

window.addEventListener('load', loadListener);