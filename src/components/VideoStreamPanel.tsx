import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Activity, Clock, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreamMetrics {
  frameRate: number;
  processedFrames: number;
  inferenceTime: number;
  timestamp: string;
}

interface VideoStreamPanelProps {
  title: string;
  streamId: string;
  isActive: boolean;
  onToggle: (streamId: string) => void;
  placeholderImage: string;
  statusColor: 'success' | 'warning' | 'destructive';
}

export const VideoStreamPanel = ({ 
  title, 
  streamId, 
  isActive, 
  onToggle, 
  placeholderImage,
  statusColor 
}: VideoStreamPanelProps) => {
  const [metrics, setMetrics] = useState<StreamMetrics>({
    frameRate: 0,
    processedFrames: 0,
    inferenceTime: 0,
    timestamp: new Date().toISOString()
  });

  // Simulate real-time metrics
  useEffect(() => {
    if (!isActive) {
      setMetrics(prev => ({ ...prev, frameRate: 0, inferenceTime: 0 }));
      return;
    }

    const interval = setInterval(() => {
      setMetrics({
        frameRate: Math.floor(Math.random() * 10) + 25, // 25-35 fps
        processedFrames: Math.floor(Math.random() * 1000) + 5000,
        inferenceTime: Math.floor(Math.random() * 50) + 20, // 20-70ms
        timestamp: new Date().toISOString()
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getStatusColor = () => {
    switch (statusColor) {
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'destructive': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            isActive ? getStatusColor() : "bg-stream-inactive",
            isActive && "shadow-glow animate-pulse"
          )} />
          <h3 className="font-semibold text-foreground">{title}</h3>
          <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
            {isActive ? "LIVE" : "OFFLINE"}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isActive ? "destructive" : "default"}
            onClick={() => onToggle(streamId)}
            className="transition-all duration-300"
          >
            {isActive ? (
              <>
                <Square className="w-4 h-4 mr-1" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Start
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Video Feed Area */}
      <div className="relative aspect-video bg-muted/20 overflow-hidden">
        {isActive ? (
          <div className="relative w-full h-full">
            <img 
              src={placeholderImage} 
              alt={`${title} Feed`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Live indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">LIVE</span>
            </div>

            {/* Stream info overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">FPS:</span>
                    <span className="font-mono text-foreground">{metrics.frameRate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Inference:</span>
                    <span className="font-mono text-foreground">{metrics.inferenceTime}ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-info" />
                    <span className="text-muted-foreground">Frames:</span>
                    <span className="font-mono text-foreground">{metrics.processedFrames.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Pause className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground">Stream Offline</p>
                <p className="text-sm text-muted-foreground/70">Click Start to begin processing</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Metrics Footer */}
      <div className="px-4 py-3 bg-muted/10 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Stream ID: {streamId}</span>
          <span>Last Update: {new Date(metrics.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </Card>
  );
};