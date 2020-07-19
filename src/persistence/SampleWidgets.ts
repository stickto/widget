// import _ from 'lodash';

const projField = {
  name: 'projName',
  label: 'Project Name',
  options: [{
    id: 'p1',
    name: 'Project 1',
  }, {
    id: 'p2',
    name: 'Project 2',
  }, {
    id: 'p3',
    name: 'Project 3',
  }],
};

class WidgetTest {
  static settings = {
    id: 'test001',
    name: 'Test Widget',
    icon: 'https://static.thenounproject.com/png/3381813-200.png',
    css: '',
    fields: [projField, {
      name: 'gender',
      label: 'Gender',
      options: [{
        id: 'male',
        name: 'Male',
      }, {
        id: 'female',
        name: 'Female',
      }, {
        id: 'others',
        name: 'Others',
      }],
    }],
  };
}

class WidgetProject {
  static settings = {
    id: 'project',
    name: 'Project Switch',
    icon: 'https://static.thenounproject.com/png/1823861-200.png',
    css: '',
    fields: [],
  };
}

class WidgetRelease {
  static settings = {
    id: 'release',
    name: 'Release',
    icon: 'https://static.thenounproject.com/png/2353823-200.png',
    css: '',
    fields: [projField],
  };
}

class WidgetLabel {
  name = 'WidgetLabel';

  props: any;

  static settings = {
    id: 'label',
    name: 'Label',
    icon: 'https://static.thenounproject.com/png/47708-200.png',
    css: '',
    fields: [projField, {
      name: 'fontSize',
      label: 'Font Size',
    }, {
      name: 'text',
      label: 'Text',
    }],
  };

  constructor(props: any) {
    this.props = props;
  }

  didMount() {
    console.log(`did mount ${this.name}`);
  }

  willUnmount() {
    console.log(`will unmount ${this.name}`);
  }

  render() {
    const { text, fontSize } = this.props;
    const div = document.createElement('div');
    div.style.fontSize = fontSize || '10px';
    div.innerText = text;
    return div;
  }
}

class WidgetWeather {
  static settings = {
    id: 'weather',
    name: 'Weather',
    icon: 'https://static.thenounproject.com/png/3432323-200.png',
    css: '',
    fields: [projField, {
      name: 'city',
      label: 'City',
      options: [{
        id: 'shanghai',
        name: 'Shanghai',
      }, {
        id: 'hangzhou',
        name: 'Hangzhou',
      }, {
        id: 'beijing',
        name: 'Beijing',
      }],
    }],
  };
}

export default [WidgetTest, WidgetProject, WidgetRelease, WidgetLabel, WidgetWeather];
