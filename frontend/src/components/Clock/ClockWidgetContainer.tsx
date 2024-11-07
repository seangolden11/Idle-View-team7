// components/WidgetsContainer.tsx
import React, { useState } from "react";
import Draggable from "react-draggable";
import { Clock } from "./Clock";
import styles from "./ClockWidget.module.css"

export const WidgetsContainer = () => {
  const [widgets, setWidgets] = useState<{ id: number; x: number; y: number }[]>([]);
  const [widgetCounter, setWidgetCounter] = useState(0);

  const addClockWidget = () => {
    setWidgets([...widgets, { id: widgetCounter, x: 0, y: 0 }]);
    setWidgetCounter(widgetCounter + 1);
  };

  const updateWidgetPosition = (id: number, x: number, y: number) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, x, y } : widget
      )
    );
  };

  return (
    <div>
      <button onClick={addClockWidget}>Add Clock Widget</button>
      {widgets.map((widget) => (
        <Draggable
          key={widget.id}
          defaultPosition={{ x: widget.x, y: widget.y }}
          onStop={(e, data) => updateWidgetPosition(widget.id, data.x, data.y)}
        >
          <div className={styles.widget}>
            <Clock />
          </div>
        </Draggable>
      ))}
    </div>
  );
};

