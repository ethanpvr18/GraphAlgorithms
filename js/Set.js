export class Set {
    constructor() {
        this.head = null;
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

    getCurrentSize() {
        return this.numOfEntries;
    }

    isEmpty() {
        return this.numOfEntries == 0;
    }

    add(newEntry) {
        if(this.contains(newEntry)) {
            return false;
        } else {
            let newNode = new this.Node(newEntry, this.head);
            this.head = newNode;
            this.numOfEntries++;
            return true;
        }
    }

    removeFront() {
        let temp = null;
        if(this.head.getData()) {
            temp = this.head.getData();
            this.head = this.head.getNextNode();
            --this.numOfEntries;
        }
        return temp;
    }

    remove(entry) {
        if(this.isEmpty())
            return false;

        if(this.head.getData() === entry) {
            this.head = this.head.getNextNode();
            this.numOfEntries--;
            return true;
        }

        let prevNode = this.head;
        let currentNode = this.head.getNextNode();

        while(currentNode !== null) {
            if(currentNode.getData() === entry) {
                prevNode.setNextNode(currentNode.getNextNode());
                this.numOfEntries--;
                return true;
            }
            prevNode = currentNode;
            currentNode = currentNode.getNextNode();
        }

        return false;
    }

    clear() {
        while(!this.isEmpty()) {
            this.remove();
        }
    }

    getFrequencyOf(entry) {
        let frequency = 0;
        let loopCounter = 0;
        let currentNode = this.head;
        while((loopCounter < this.numOfEntries) && (currentNode)) {
            if(entry === currentNode.getData()) {
                frequency++;
            }
            loopCounter++;
            currentNode = currentNode.getNextNode();
        }
        return frequency;
    }

    contains(entry) {
        let currentNode = this.head;
        for(let i = 0; i < this.numOfEntries; i++) {
            if(currentNode.getData() === entry) {
                return true;
            }
            currentNode = currentNode.getNextNode();
        }
        return false;
    }

    toArray() {
        let arr = [];
        let currentNode = this.head;
        for(let i = 0; i < this.numOfEntries; i++) {
            arr[i] = currentNode.getData();
            currentNode = currentNode.getNextNode();
        }
        return arr;
    }

    *[Symbol.iterator]() {
        let currentNode = this.head;
        while(currentNode) {
            yield currentNode.getData();
            currentNode = currentNode.getNextNode();
        }
    }
}