// WidgetsContainer.tsx
import React from 'react';
import Draggable from 'react-draggable';
import { Clock } from './Clock/Clock';
import styles from './Clock/ClockWidget.module.css';

type Widget = { id: number; type: string; x: number; y: number };

type Props = {
  widgets: Widget[];
};

const WidgetsContainer: React.FC<Props> = ({ widgets }) => {
  return (
    <div>
      {widgets.map((widget) => (
        <Draggable key={widget.id} defaultPosition={{ x: widget.x, y: widget.y }}>
          <div className={styles.widget}>
            {widget.type === 'Time' && <Clock />}
            {widget.type === 'Media' && <div>Media Widget</div>}
            {widget.type === 'Calendar' && <div>Calendar Widget</div>}
            {widget.type === 'Weather' && <div>Weather Widget</div>}
            {widget.type === 'More' && <div>More Widget</div>}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default WidgetsContainer;
