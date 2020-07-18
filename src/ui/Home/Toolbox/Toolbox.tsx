import React from 'react';
import WidgetDefUI from './comps/WidgetDefUI';
import defHelper from '../../../persistence/defHelper';
import WidgetDef from '../../../model/widget/def/WidgetDef';

type MyState = {
  widgets: Array<WidgetDef>,
};

class Toolbox extends React.Component <any, MyState> {
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     widgets: null,
  //   };
  // }

  componentDidMount() {
    const widgets = defHelper.load();
    this.setState({
      widgets,
    });
  }

  render() {
    if (!this.state) {
      return <div />;
    }
    const { widgets } = this.state;
    return (
      <div>
        { widgets.map((widget: WidgetDef) => (
          <WidgetDefUI widget={widget} />
        )) }
      </div>
    );
  }
}

export default Toolbox;
