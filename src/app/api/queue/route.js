import { NextResponse } from 'next/server';
import { queue } from '@/lib/PriorityQueue';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json({ queue: queue.getQueueState() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, itemName, prepTime, vipStatus } = body;
    
    // Simple urgency metric: VIPs get +100 base score. 
    // Higher prep time could mean slightly lower priority by default, but let's just make it simple:
    // Urgency = (VIP ? 100 : 0) + (100 - prepTime) (shorter prep time = quickly get it out)
    const baseScore = vipStatus ? 1000 : 0;
    
    // We add a timestamp modifier to maintain a bit of FIFO for same priority items
    // Time score decreases over time since epoch (so older items have slightly higher score if same VIP)
    // Actually simpler: 10 points for every minute waiting. For insert, we just set a base score.
    const urgencyScore = baseScore + Math.floor(Math.random() * 50); // randomized for visual variety in this demo

    const newOrder = {
      id: randomUUID(),
      customerName,
      itemName,
      prepTime: Number(prepTime),
      vipStatus: Boolean(vipStatus),
      urgencyScore: urgencyScore,
      timestamp: Date.now()
    };

    queue.insert(newOrder);

    return NextResponse.json({ 
      success: true, 
      message: 'Order added to priority queue',
      order: newOrder,
      queue: queue.getQueueState()
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
