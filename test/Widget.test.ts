import testData from './WidgetExample';
import Widget from '../src/model/widget/def/WidgetDef';

test('init widget', () => {
  const widgetData = testData.widget;
  Widget.init(widgetData);
  const ins = Widget.getInstance();
  // expect(ins).not(null);
  expect(ins.id).toBe(widgetData.id);
});
