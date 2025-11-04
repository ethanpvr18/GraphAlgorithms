export class Editor {
    constructor(graph, element, x, y) {
        this.element = document.createElement('input');
        this.element.style.left = `${x}rem`;
        this.element.style.top = `${y}rem`;
        this.element.type = 'text';
        this.element.value = element.textContent;
        this.element.classList.add('editor');

        document.body.appendChild(this.element);
        this.element.focus();

        this.submitChange = (event) => {
            if(event.key === 'Enter') {
                event.preventDefault();
                const oldLabel = element.textContent;
                element.textContent = this.element.value.trim();

                if(element.classList.contains('vertex')) {
                    const vertex = graph.findVertex({ target: element });
                    if(vertex)
                        vertex.setLabel(element.textContent);
                    
                    for(const v of graph.vertices) {
                        for(const e of v.adjEdges) {
                            if(e.u.label === oldLabel)
                                e.u = vertex;
                            if(e.v.label === oldLabel)
                                e.v = vertex;
                        }
                    }
                }
                
                if(element.classList.contains('edge') || element.classList.contains('edge-weight')) {
                    let edge = graph.findEdge({ target: element });
                    if(!edge) {
                        for(const v of graph.vertices) {
                            for(const e of v.adjEdges) {
                                if(e.edgeWeight === element) {
                                    edge = e;
                                    break;
                                }
                            }
                        }
                    }
                    if(edge) {
                        edge.setWeight(parseFloat(element.textContent));
                        if(edge.edgeWeight)
                            edge.edgeWeight.textContent = element.textContent;
                    }
                }

                this.remove();
                graph.updateGraph();
            } else if(event.key === 'Escape') {
                event.preventDefault();
                this.remove();
            }
        };

        this.element.addEventListener('keydown', this.submitChange);
    }

    remove() {
        if(this.element && this.element.parentNode) {
            this.element.removeEventListener('keydown', this.submitChange);
            this.element.parentNode.removeChild(this.element);
        }
    }
}