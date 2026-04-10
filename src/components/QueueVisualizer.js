import styles from './QueueVisualizer.module.css';

export default function QueueVisualizer({ queue }) {
  if (!queue || queue.length === 0) {
    return (
      <div className={`glass-panel ${styles.container} ${styles.empty}`}>
        <p>No orders in queue</p>
      </div>
    );
  }

  // Find max priority to normalize heights for visual bars (optional)
  const maxScore = Math.max(...queue.map(q => q.urgencyScore));

  return (
    <div className={`glass-panel ${styles.container}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Priority Queue (Max-Heap)</h2>
        <span className={styles.countBadge}>{queue.length} items</span>
      </div>

      <div className={styles.treeVisualization}>
        {queue.map((item, index) => (
          <div 
            key={item.id} 
            className={`${styles.queueNode} animate-fade-in ${item.vipStatus ? styles.vipNode : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={styles.nodeIndex}>[{index}]</div>
            
            <div className={styles.nodeContent}>
              <div className={styles.nodeHeader}>
                <span className={styles.customerName}>{item.customerName}</span>
                {item.vipStatus && <span className={styles.vipBadge}>VIP</span>}
              </div>
              <div className={styles.itemName}>{item.itemName}</div>
            </div>

            <div className={styles.scoreContainer}>
              <div className={styles.scoreLabel}>Urgency</div>
              <div className={styles.scoreValue}>{item.urgencyScore}</div>
            </div>
            
            {/* Structural connection line - conceptual since we are rendering a list representation of the heap array */}
            <div className={styles.heapVisualIndicator} style={{ width: `${Math.max(10, (item.urgencyScore / maxScore) * 100)}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
