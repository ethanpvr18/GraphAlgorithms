export class LinkedList {
    constructor() {
        this.firstNode = null;
        this.lastNode = null;
        this.nextNode = null;
        this.numOfEntries = 0;

        this.Node = class {
            constructor(data, nextNode=null) {
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

    add(newEntry) {
        let newNode = new this.Node(newEntry);
        
        if(this.isEmpty()) {
            this.firstNode = newNode;
        }else{
            this.lastNode.setNextNode(newNode);
        }

        this.lastNode = newNode;
        this.numOfEntries++;
    }

    addNodeAt(givenPosition, newEntry) {
        if ((givenPosition >= 1) && (givenPosition <= this.numOfEntries + 1)) {
            let newNode = new this.Node(newEntry);

            if (this.isEmpty()) {
                this.firstNode = newNode;
                this.lastNode = newNode;
            } else if (givenPosition == 1) {
                newNode.setNextNode(this.firstNode);
                this.firstNode = newNode;
            } else if (givenPosition === this.numOfEntries + 1) {
                this.lastNode.setNextNode(newNode);
                this.lastNode = newNode;
            } else {
                let nodeBefore = this.getNodeAt(givenPosition-1);
                let nodeAfter = nodeBefore.getNextNode();

                newNode.setNextNode(nodeAfter);
                nodeBefore.setNextNode(newNode);
            }
            this.numOfEntries++;

        } else {
            throw new Error('Index Out Of Bounds.');
        }
    }   

    remove(givenPosition) {
        let result = null;

        if ((givenPosition >= 1) && (givenPosition <= this.numOfEntries)) {
            if (givenPosition === 1) {
                result = this.firstNode.getData();
                this.firstNode = this.firstNode.getNextNode();
                if (this.numOfEntries === 1) {
                    this.lastNode = null;
                }
            } else {
                let nodeBefore = this.getNodeAt(givenPosition - 1);
                let nodeToRemove = nodeBefore.getNextNode();
                let nodeAfter = nodeToRemove.getNextNode();
                nodeBefore.setNextNode(nodeAfter);
                result = nodeToRemove.getData();
                
                if (givenPosition === this.numOfEntries) {
                    this.lastNode = nodeBefore;
                }
            }
            this.numOfEntries--;
        } else {
            throw new Error('Index Out Of Bounds.');
        }

        return result;
    }

    clear() {
        this.firstNode = null;
        this.lastNode = null;
        this.nextNode = null;
        this.numOfEntries = 0;
    }

    replace(givenPosition, newEntry) {
        if ((givenPosition >= 1) && (givenPosition <= this.numOfEntries)) {
            let newNode = this.getNodeAt(givenPosition);
            let oldEntry = newNode.getData();
            newNode.setData(newEntry);
            return oldEntry;
        } else {
            throw new Error('Index Out Of Bounds.');
        }
    }

    getEntry(givenPosition) {
        if ((givenPosition >= 1) && (givenPosition <= this.numOfEntries)) {
            return this.getNodeAt(givenPosition).getData();
        } else {
            throw new Error('Index Out Of Bounds.');
        }
    }

    toArray() {
        let result = [];

        let currentNode = this.firstNode;
        let index = 0;
    
        while ((index < this.numOfEntries) && (currentNode != null)) {
            result[index] = currentNode.getData();
            currentNode = currentNode.getNextNode();
            index++;
        }

        return result;
    }

    contains(entry) { 
        let currentNode = this.firstNode;

        while (currentNode !== null) {
            if (currentNode.getData() === entry) {
                return true;
            }
            currentNode = currentNode.getNextNode();
        }

        return false;
    }

    getLength() {
        let currentNode = this.firstNode;
        let numOfEntries = 0;

        while(currentNode != null) {
            numOfEntries++;
            currentNode = currentNode.getNextNode();
        }

        return numOfEntries;
    }

    isEmpty() {
        return this.numOfEntries === 0;
    }

    getNodeAt(givenPosition) {
        if(givenPosition < 1 || givenPosition > this.numOfEntries) {
            throw new Error('Index Out Of Bounds.');
        }
        let currentNode = this.firstNode;
        for(let i = 1;i < givenPosition;i++) {
            currentNode = currentNode.getNextNode();
        }
        return currentNode;
    }

    resetTraversal() {
        this.nextNode = this.firstNode;
    }

    *[Symbol.iterator]() {
        let currentNode = this.firstNode;
        while(currentNode) {
            yield currentNode.getData();
            currentNode = currentNode.getNextNode();
        }
    }

    indexOf(entry) {
        let currentNode = this.firstNode;
        let index = 1;

        while (currentNode !== null) {
            if (currentNode.getData() === entry) {
                return index;
            }
            index++;
            currentNode = currentNode.getNextNode();
        }

        return -1;
    }

    find(callback) {
        for(let data of this) {
            if(callback(data))
                return data;
        }
        return undefined;
    }

    map(callback) {
        const result = [];
        let i = 0;
        for(let data of this) {
            result.push(callback(data, i));
            i++;
        }
        return result;
    }
}