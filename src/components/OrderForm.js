'use client';
import { useState } from 'react';
import styles from './OrderForm.module.css';

export default function OrderForm({ onAddOrder }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    itemName: '',
    prepTime: '15',
    vipStatus: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.itemName) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        onAddOrder(data.queue);
        setFormData(prev => ({ ...prev, customerName: '', itemName: '' }));
      }
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`glass-panel ${styles.formContainer}`}>
      <h2 className={styles.title}>New Order Entry</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Customer Name</label>
          <input 
            type="text" 
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            placeholder="John Doe"
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Item Name</label>
          <input 
            type="text" 
            value={formData.itemName}
            onChange={(e) => setFormData({...formData, itemName: e.target.value})}
            placeholder="Spicy Tuna Roll"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.splitRow}>
          <div className={styles.inputGroup}>
            <label>Prep Time (min)</label>
            <input 
              type="number" 
              min="1"
              max="120"
              value={formData.prepTime}
              onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.checkboxGroup}>
            <label className={styles.vipLabel}>
              <input 
                type="checkbox" 
                checked={formData.vipStatus}
                onChange={(e) => setFormData({...formData, vipStatus: e.target.checked})}
                className={styles.checkbox}
              />
              <span className={styles.vipText}>VIP Customer</span>
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Processing...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
}
