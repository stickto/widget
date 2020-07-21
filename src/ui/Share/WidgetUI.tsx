import React, { FC } from 'react';
import Widget from '../../model/widget/instance/Widget';
import WidgetRuntimeUI from '../comps/WidgetRuntimeUI';

import './WidgetUI.scss';

type MyProps = {
  widget: Widget
};

const Content: FC<MyProps> = (props: MyProps) => {
  const { widget } = props;
  const { layout } = widget;
  const style = {
    left: layout.x,
    top: layout.y,
    width: layout.width,
    height: layout.height,
  };
  return (
    <div className="widget-ui" style={style}>
      <WidgetRuntimeUI widget={widget} />
    </div>
  );
};

export default Content;
