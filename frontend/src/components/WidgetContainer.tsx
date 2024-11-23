// WidgetsContainer.tsx
import React from 'react';
import Draggable from 'react-draggable';
import { Clock } from './Widgets/Clock/Clock';
import WeatherWidget from './Widgets/WeatherWidget';
import BasicCalendar from './Widgets/Calendar/BasicCalendar';
import MediaPlayer from './Widgets/MediaPlayer/MediaPlayer';

// 위젯 타입 정의
type Widget = { id: number; type: string; x: number; y: number };

type Props = {
  widgets: Widget[];
};

const WidgetsContainer: React.FC<Props> = ({ widgets }) => {
  return (
    <div className='noglobal'>
      {widgets.map((widget) => (
        <Draggable key={widget.id} defaultPosition={{ x: widget.x, y: widget.y }}>
          <div className='noglobal'>
            {widget.type === 'Time' && <Clock />} {/* Clock 컴포넌트 */}
            {widget.type === 'Media' && <MediaPlayer/>}
            {widget.type === 'Calendar' && <BasicCalendar />}
            {widget.type === 'Weather' && <WeatherWidget />} {/* Weather Widget */}
            {widget.type === 'More' && <div>More Widget</div>}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default WidgetsContainer;
