import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Download, 
  Trash2, 
  Clock, 
  Hash, 
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface FrameLog {
  id: string;
  streamId: string;
  frameNumber: number;
  timestamp: string;
  inferenceTime: number;
  confidence: number;
  detectionsCount: number;
  status: 'success' | 'warning' | 'error';
}

interface FrameLogsPanelProps {
  activeStreams: string[];
}

export const FrameLogsPanel = ({ activeStreams }: FrameLogsPanelProps) => {
  const [logs, setLogs] = useState<FrameLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'success' | 'warning' | 'error'>('all');

  // Generate realistic frame logs
  useEffect(() => {
    if (activeStreams.length === 0) return;

    const interval = setInterval(() => {
      const newLogs: FrameLog[] = [];
      
      activeStreams.forEach(streamId => {
        const frameNumber = Math.floor(Math.random() * 10000) + 5000;
        const confidence = Math.random() * 100;
        const detectionsCount = Math.floor(Math.random() * 8);
        
        let status: 'success' | 'warning' | 'error' = 'success';
        if (confidence < 30) status = 'error';
        else if (confidence < 60) status = 'warning';

        newLogs.push({
          id: `${streamId}-${Date.now()}-${Math.random()}`,
          streamId,
          frameNumber,
          timestamp: new Date().toISOString(),
          inferenceTime: Math.floor(Math.random() * 50) + 20,
          confidence: Math.floor(confidence),
          detectionsCount,
          status
        });
      });

      setLogs(prev => [...newLogs, ...prev].slice(0, 50)); // Keep only last 50 logs
    }, 2000);

    return () => clearInterval(interval);
  }, [activeStreams]);

  const filteredLogs = logs.filter(log => 
    filter === 'all' || log.status === filter
  );

  const getStatusIcon = (status: FrameLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusColor = (status: FrameLog['status']) => {
    switch (status) {
      case 'success':
        return 'border-l-success';
      case 'warning':
        return 'border-l-warning';
      case 'error':
        return 'border-l-destructive';
    }
  };

  const exportLogs = () => {
    const csv = [
      'Timestamp,Stream ID,Frame Number,Inference Time (ms),Confidence (%),Detections,Status',
      ...logs.map(log => 
        `${log.timestamp},${log.streamId},${log.frameNumber},${log.inferenceTime},${log.confidence},${log.detectionsCount},${log.status}`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `frame-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <Card className="bg-gradient-card border-border/50 p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Frame Processing Logs</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {filteredLogs.length} entries
            </Badge>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter:</span>
            {(['all', 'success', 'warning', 'error'] as const).map((status) => (
              <Button
                key={status}
                size="sm"
                variant={filter === status ? "default" : "ghost"}
                onClick={() => setFilter(status)}
                className="text-xs"
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={exportLogs}
              disabled={logs.length === 0}
            >
              <Download className="w-4 h-4 mr-1" />
              Export CSV
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={clearLogs}
              disabled={logs.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        {/* Logs List */}
        <ScrollArea className="h-64 w-full">
          <div className="space-y-2">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No frame logs available</p>
                <p className="text-xs">Start processing streams to see logs</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`bg-muted/20 border-l-4 ${getStatusColor(log.status)} p-3 rounded-r-lg transition-all duration-200 hover:bg-muted/30`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.status)}
                      <Badge variant="outline" className="text-xs">
                        {log.streamId}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <Badge 
                      variant={log.confidence > 60 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {log.confidence}% confidence
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Hash className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Frame:</span>
                      <span className="font-mono text-foreground">{log.frameNumber}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Inference:</span>
                      <span className="font-mono text-foreground">{log.inferenceTime}ms</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Detections:</span>
                      <span className="font-mono text-foreground">{log.detectionsCount}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};