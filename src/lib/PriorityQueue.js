// Priority Queue implementation using a Max-Heap array
export class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex(parentIndex) { return 2 * parentIndex + 1; }
  getRightChildIndex(parentIndex) { return 2 * parentIndex + 2; }
  getParentIndex(childIndex) { return Math.floor((childIndex - 1) / 2); }

  hasLeftChild(index) { return this.getLeftChildIndex(index) < this.heap.length; }
  hasRightChild(index) { return this.getRightChildIndex(index) < this.heap.length; }
  hasParent(index) { return this.getParentIndex(index) >= 0; }

  leftChild(index) { return this.heap[this.getLeftChildIndex(index)]; }
  rightChild(index) { return this.heap[this.getRightChildIndex(index)]; }
  parent(index) { return this.heap[this.getParentIndex(index)]; }

  swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }

  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  // Insert a new order
  // order expects: { id, customerName, itemName, vipStatus, prepTime, urgencyScore, timestamp }
  insert(order) {
    this.heap.push(order);
    this.heapifyUp();
  }

  // Remove and return highest priority order
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return max;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      this.hasParent(index) && 
      this.parent(index).urgencyScore < this.heap[index].urgencyScore
    ) {
      // For stable sort on equal scores, we could check timestamp, but simple score comparison is fine here.
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let largerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) && 
        this.rightChild(index).urgencyScore > this.leftChild(index).urgencyScore
      ) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index].urgencyScore > this.heap[largerChildIndex].urgencyScore) {
        break;
      } else {
        this.swap(index, largerChildIndex);
      }
      index = largerChildIndex;
    }
  }

  getQueueState() {
    // Return array representation
    return this.heap;
  }
}

// In-memory global singleton to persist between API calls in development
const globalForQueue = globalThis;
if (!globalForQueue.foodQueue) {
  globalForQueue.foodQueue = new PriorityQueue();
}

export const queue = globalForQueue.foodQueue;
