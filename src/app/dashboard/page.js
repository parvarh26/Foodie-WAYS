'use client';
import { useState, useEffect } from 'react';
import OrderForm from '@/components/OrderForm';
import QueueVisualizer from '@/components/QueueVisualizer';
import styles from './page.module.css';

export default function Dashboard() {
  const [queue, setQueue] = useState([]);
  const [kitchenOrders, setKitchenOrders] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch initial queue state
  useEffect(() => {
    fetch('/api/queue')
      .then(res => res.json())
      .then(data => {
        if (data.queue) setQueue(data.queue);
        setInitialLoading(false);
      });
  }, []);

  const handleProcessNext = async () => {
    if (queue.length === 0) return;
    setProcessing(true);
    try {
      const res = await fetch('/api/process', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.processedOrder) {
        setQueue(data.queue);
        setKitchenOrders([data.processedOrder, ...kitchenOrders].slice(0, 5)); // Keep top 5 recently processed
      }
    } catch (err) {
      console.error("Error processing order:", err);
    } finally {
      setProcessing(false);
    }
  };

  if (initialLoading) {
    return <div className={styles.loading}>Loading Priority Dashboard...</div>;
  }

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}></div>
          <h1>Foodie-WAYS</h1>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.statusBadge}>System Active</span>
        </div>
      </header>

      <div className={styles.gridContainer}>
        {/* Input Column */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>1. Incoming Orders</h3>
          <OrderForm onAddOrder={(newQueue) => setQueue(newQueue)} />
        </div>

        {/* Priority Queue (The Brain) */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>2. Priority Algorithm</h3>
          <div className={styles.queueContainer}>
            <QueueVisualizer queue={queue} />
          </div>
        </div>

        {/* Action & Output Column */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>3. Processing Engine</h3>
          
          <div className={`glass-panel ${styles.processContainer}`}>
            <h2 className={styles.sectionHeader}>Dispatch Control</h2>
            <button 
              className={styles.dispatchBtn} 
              onClick={handleProcessNext}
              disabled={queue.length === 0 || processing}
            >
              {processing ? 'Extracting Max Priority...' : 'Process Next Order'}
            </button>
            <p className={styles.dispatchDesc}>
              Triggering this action executes <code>extractMax()</code> on the Priority Queue, guaranteeing O(log N) retrieval of the highest priority item.
            </p>
          </div>

          <div className={styles.kitchenContainer}>
            <h3 className={styles.kitchenTitle}>Kitchen (Recently Dispatched)</h3>
            <div className={styles.kitchenList}>
              {kitchenOrders.length === 0 ? (
                <p className={styles.empty}>No orders processed yet.</p>
              ) : (
                kitchenOrders.map((order, i) => (
                  <div key={order.id + i} className={`glass-panel animate-fade-in ${styles.processedItem}`}>
                    <div className={styles.piHeader}>
                      <strong>{order.customerName}</strong>
                      <span className={styles.piScore}>Score: {order.urgencyScore}</span>
                    </div>
                    <div className={styles.piBody}>{order.itemName}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
