import { useState } from 'react';
import { VideoStreamPanel } from '@/components/VideoStreamPanel';
import { ModeSelector, MonitoringMode } from '@/components/ModeSelector';
import { SystemMetrics } from '@/components/SystemMetrics';
import { FrameLogsPanel } from '@/components/FrameLogsPanel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Settings, 
  BarChart3, 
  Shield,
  Camera,
  Activity
} from 'lucide-react';

// Import placeholder images
import personDetectionFeed from '@/assets/person-detection-feed.jpg';
import faceDetectionFeed from '@/assets/face-detection-feed.jpg';
import segmentationFeed from '@/assets/segmentation-feed.jpg';

const Index = () => {
  const [monitoringMode, setMonitoringMode] = useState<MonitoringMode>('traffic');
  const [activeStreams, setActiveStreams] = useState<Record<string, boolean>>({
    'person-detection': false,
    'face-detection': false,
    'segmentation': false
  });

  const handleStreamToggle = (streamId: string) => {
    setActiveStreams(prev => ({
      ...prev,
      [streamId]: !prev[streamId]
    }));
  };

  const activeStreamCount = Object.values(activeStreams).filter(Boolean).length;
  const activeStreamIds = Object.entries(activeStreams)
    .filter(([_, isActive]) => isActive)
    .map(([id]) => id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">AI Video Monitor</h1>
                  <p className="text-sm text-muted-foreground">Real-time intelligent surveillance</p>
                </div>
              </div>
              
              <Badge 
                variant={activeStreamCount > 0 ? "default" : "secondary"} 
                className="px-3 py-1"
              >
                <Activity className="w-3 h-3 mr-1" />
                {activeStreamCount} Active Stream{activeStreamCount !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Mode Selector */}
        <ModeSelector 
          activeMode={monitoringMode} 
          onModeChange={setMonitoringMode} 
        />

        {/* Video Streams Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary" />
              Live Video Streams
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const allActive = Object.values(activeStreams).every(Boolean);
                  const newState = allActive ? false : true;
                  setActiveStreams({
                    'person-detection': newState,
                    'face-detection': newState,
                    'segmentation': newState
                  });
                }}
              >
                {Object.values(activeStreams).every(Boolean) ? 'Stop All' : 'Start All'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <VideoStreamPanel
              title="Person Detection"
              streamId="person-detection"
              isActive={activeStreams['person-detection']}
              onToggle={handleStreamToggle}
              placeholderImage={personDetectionFeed}
              statusColor="success"
            />
            
            <VideoStreamPanel
              title="Face Detection"
              streamId="face-detection"
              isActive={activeStreams['face-detection']}
              onToggle={handleStreamToggle}
              placeholderImage={faceDetectionFeed}
              statusColor="warning"
            />
            
            <VideoStreamPanel
              title="Image Segmentation"
              streamId="segmentation"
              isActive={activeStreams['segmentation']}
              onToggle={handleStreamToggle}
              placeholderImage={segmentationFeed}
              statusColor="success"
            />
          </div>
        </div>

        {/* Metrics and Logs Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SystemMetrics activeStreams={activeStreamCount} />
          <FrameLogsPanel activeStreams={activeStreamIds} />
        </div>

        {/* Footer Info */}
        <Card className="bg-gradient-card border-border/50 p-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">System Ready</h3>
            <p className="text-muted-foreground">
              Connected to GStreamer pipeline • Python AI models loaded • Flask server running
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Mode: {monitoringMode.charAt(0).toUpperCase() + monitoringMode.slice(1)}</span>
              <span>•</span>
              <span>FPS Target: 30</span>
              <span>•</span>
              <span>Resolution: 640x480</span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;
