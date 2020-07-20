import React, { FC } from 'react';
// import instanceHelper from '../../../persistence/instanceHelper';
import Widget from '../../model/widget/instance/Widget';
import WidgetUICore from '../comps/WidgetUICore';

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
      <WidgetUICore widget={widget} />
    </div>
  );
};

export default Content;
