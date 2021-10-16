
export class Node {
    constructor(value) {
        this.value = value
        this.prev = null
        this.next = null
    }
}

export class LinkedList {
    constructor(value) {
        this.head = new Node(value)
        this.tail = new Node(value)
        this.head.next = this.tail
        this.tail.prev = this.head
        this.cells = [this.head.value]
    }
    addHead(value) {
        var currentHead = this.head
        var newHead = new Node(value)
        currentHead.prev = newHead
        this.head = newHead
        newHead.next = currentHead
        this.cells.unshift(newHead.value)
        this.cells = this.cells
    }
    addTail(value) {
        var currentTail = this.tail
        var newTail = new Node(value)
        currentTail.next = newTail
        newTail.prev = currentTail
        this.tail = newTail
        this.cells.push(newTail.value)
    }
    removeTail() {
        this.cells.pop()
        this.cells = this.cells
        if (this.cells.length == 1) {
            this.tail = this.head
            this.tail.prev = this.head
            return
        }
        var currentTail = this.tail
        var newTail = currentTail.prev
        this.tail = newTail
        newTail.next = null
        currentTail.prev = null
    }
}
