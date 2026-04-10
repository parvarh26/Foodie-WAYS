import { NextResponse } from 'next/server';
import { queue } from '@/lib/PriorityQueue';

export async function POST() {
  const processedOrder = queue.extractMax();
  
  if (!processedOrder) {
    return NextResponse.json({ 
      success: false, 
      message: 'Queue is empty' 
    }, { status: 404 });
  }

  return NextResponse.json({ 
    success: true, 
    message: 'Order processed',
    processedOrder: processedOrder,
    queue: queue.getQueueState()
  });
}
