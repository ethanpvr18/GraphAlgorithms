export class Stack {
    constructor() {
        this.top = null;
        this.numOfEntries = 0;

        this.Node = class {
            constructor(data, nextNode) {
                this.data = data;
                this.nextNode = nextNode;
            }

            getData() {
                return this.data;
            }

            getNextNode() {
                return this.nextNode;
            }

            setData(data) {
                this.data = data;
            }

            setNextNode(nextNode) {
                this.nextNode = nextNode;
            }
        }
    }

    push(newEntry) {
        this.top = new this.Node(newEntry, this.top);
        this.numOfEntries++;
    }

    pop() {
        if(this.isEmpty())
            return undefined;
        
        let result = this.peek();
        this.top = this.top.getNextNode();
        this.numOfEntries--;

        return result;
    }

    peek() {
        if(this.isEmpty())
            return undefined;
        return this.top.getData();
    }

    isEmpty() {
        return this.top == null;
    }

    clear() {
        this.top = null;
        this.numOfEntries = 0;
    }

    getCurrentSize() {
        return this.numOfEntries;
    }
}