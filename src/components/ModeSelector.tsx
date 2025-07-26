import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Users, 
  Camera, 
  ParkingCircle, 
  Sprout, 
  AlertTriangle 
} from 'lucide-react';

export type MonitoringMode = 
  | 'traffic' 
  | 'campus' 
  | 'animal' 
  | 'parking' 
  | 'agriculture'
  | 'anomaly';

interface ModeSelectorProps {
  activeMode: MonitoringMode;
  onModeChange: (mode: MonitoringMode) => void;
}

const modes = [
  {
    id: 'traffic' as MonitoringMode,
    name: 'Traffic Monitoring',
    description: 'Vehicle detection and traffic flow analysis',
    icon: Car,
    color: 'text-info',
    bgColor: 'bg-info/10 hover:bg-info/20'
  },
  {
    id: 'campus' as MonitoringMode,
    name: 'Campus Crowd',
    description: 'People counting and crowd density monitoring',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10 hover:bg-primary/20'
  },
  {
    id: 'animal' as MonitoringMode,
    name: 'Animal Detection',
    description: 'Wildlife and animal behavior monitoring',
    icon: Camera,
    color: 'text-accent',
    bgColor: 'bg-accent/10 hover:bg-accent/20'
  },
  {
    id: 'parking' as MonitoringMode,
    name: 'Parking Analysis',
    description: 'Parking space occupancy and vehicle tracking',
    icon: ParkingCircle,
    color: 'text-warning',
    bgColor: 'bg-warning/10 hover:bg-warning/20'
  },
  {
    id: 'agriculture' as MonitoringMode,
    name: 'Agriculture',
    description: 'Crop monitoring and agricultural surveillance',
    icon: Sprout,
    color: 'text-success',
    bgColor: 'bg-success/10 hover:bg-success/20'
  },
  {
    id: 'anomaly' as MonitoringMode,
    name: 'Anomaly Detection',
    description: 'Unusual behavior and security monitoring',
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10 hover:bg-destructive/20'
  }
];

export const ModeSelector = ({ activeMode, onModeChange }: ModeSelectorProps) => {
  return (
    <Card className="bg-gradient-card border-border/50 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Monitoring Mode</h2>
          <Badge variant="outline" className="text-xs">
            {modes.find(m => m.id === activeMode)?.name}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            
            return (
              <Button
                key={mode.id}
                variant={isActive ? "default" : "ghost"}
                className={`h-auto p-4 justify-start transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary shadow-glow' 
                    : `${mode.bgColor} border border-border/50 hover:border-border`
                }`}
                onClick={() => onModeChange(mode.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <Icon className={`w-5 h-5 mt-0.5 ${
                    isActive ? 'text-primary-foreground' : mode.color
                  }`} />
                  <div className="text-left">
                    <div className={`font-medium text-sm ${
                      isActive ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {mode.name}
                    </div>
                    <div className={`text-xs ${
                      isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {mode.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};