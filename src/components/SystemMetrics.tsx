import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Thermometer,
  Wifi,
  Camera,
  Activity
} from 'lucide-react';

interface SystemMetricsProps {
  activeStreams: number;
}

export const SystemMetrics = ({ activeStreams }: SystemMetricsProps) => {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    temperature: 0,
    networkBandwidth: 0,
    totalFramesProcessed: 0,
    avgInferenceTime: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate realistic metrics based on active streams
      const baseLoad = activeStreams * 15; // Each stream adds ~15% CPU load
      
      setMetrics({
        cpu: Math.min(95, baseLoad + Math.floor(Math.random() * 20)),
        memory: Math.min(90, activeStreams * 20 + Math.floor(Math.random() * 15) + 25),
        disk: 45 + Math.floor(Math.random() * 10),
        temperature: 45 + Math.floor(Math.random() * 20) + (activeStreams * 3),
        networkBandwidth: activeStreams * 2.5 + Math.random() * 2,
        totalFramesProcessed: Math.floor(Math.random() * 1000) + 15000,
        avgInferenceTime: 25 + Math.floor(Math.random() * 30) + (activeStreams * 5)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [activeStreams]);

  const getUsageColor = (value: number) => {
    if (value < 50) return 'text-success';
    if (value < 80) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (value: number) => {
    if (value < 50) return 'bg-success';
    if (value < 80) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <Card className="bg-gradient-card border-border/50 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">System Performance</h2>
          <Badge variant={activeStreams > 0 ? "default" : "secondary"}>
            <Activity className="w-3 h-3 mr-1" />
            {activeStreams} Active Stream{activeStreams !== 1 ? 's' : ''}
          </Badge>
        </div>

        {/* Resource Usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">CPU Usage</span>
              </div>
              <span className={`text-sm font-mono ${getUsageColor(metrics.cpu)}`}>
                {metrics.cpu}%
              </span>
            </div>
            <Progress value={metrics.cpu} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MemoryStick className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Memory</span>
              </div>
              <span className={`text-sm font-mono ${getUsageColor(metrics.memory)}`}>
                {metrics.memory}%
              </span>
            </div>
            <Progress value={metrics.memory} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-info" />
                <span className="text-sm font-medium">Disk Usage</span>
              </div>
              <span className={`text-sm font-mono ${getUsageColor(metrics.disk)}`}>
                {metrics.disk}%
              </span>
            </div>
            <Progress value={metrics.disk} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium">Temperature</span>
              </div>
              <span className={`text-sm font-mono ${getUsageColor(metrics.temperature * 1.2)}`}>
                {metrics.temperature}°C
              </span>
            </div>
            <Progress value={metrics.temperature * 1.2} className="h-2" />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Bandwidth</span>
            </div>
            <div className="text-lg font-mono text-foreground">
              {metrics.networkBandwidth.toFixed(1)} MB/s
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Total Frames</span>
            </div>
            <div className="text-lg font-mono text-foreground">
              {metrics.totalFramesProcessed.toLocaleString()}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-info" />
              <span className="text-sm font-medium">Avg Inference</span>
            </div>
            <div className="text-lg font-mono text-foreground">
              {metrics.avgInferenceTime}ms
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};