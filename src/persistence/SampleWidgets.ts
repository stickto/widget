// import _ from 'lodash';

const projField = {
  name: 'projName',
  label: 'Project Name',
  defaultValue: 'p1',
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
  props: any;

  static settings = {
    id: 'test001',
    name: 'Test Widget',
    icon: 'https://static.thenounproject.com/png/3381813-200.png',
    css: '',
    fields: [projField, {
      name: 'gender',
      label: 'Gender',
      defaultValue: 'male',
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

  async render() {
    const { props } = this;
    return new Promise((resolve: any) => {
      const titleNode = document.createElement('div');
      titleNode.style.fontSize = '16px';
      titleNode.innerText = 'TestWidget';
      // eslint-disable-next-line no-restricted-syntax
      for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
          const value = props[key];
          const div = document.createElement('div');
          div.style.fontSize = '12px';
          div.innerText = `${key} = ${value}`;
          titleNode.appendChild(div);
        }
      }
      resolve(titleNode);
    });
  }
}

class WidgetProject {
  props: any;

  emitEvent: any;

  static settings = {
    id: 'project',
    name: 'Project Switch',
    icon: 'https://static.thenounproject.com/png/1823861-200.png',
    css: '',
    fields: [projField],
  };

  async render() {
    const { projName } = this.props;
    const { emitEvent } = this;
    return new Promise((resolve: any) => {
      const titleNode = document.createElement('div');
      titleNode.style.fontSize = '18px';
      titleNode.innerText = 'Project Switch：';
      const sel = document.createElement('select');
      projField.options.forEach((d: any) => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.text = d.name;
        opt.style.fontSize = '14px';
        if (d.id === projName) {
          opt.selected = true;
        }
        sel.appendChild(opt);
      });
      sel.onchange = () => {
        emitEvent('fieldValueChanged', {
          projName: sel.value,
        });
      };
      titleNode.appendChild(sel);
      resolve(titleNode);
    });
  }
}

class WidgetRelease {
  props: any;

  static settings = {
    id: 'release',
    name: 'Release',
    icon: 'https://static.thenounproject.com/png/2353823-200.png',
    css: '',
    fields: [projField],
  };

  constructor(props: any) {
    this.props = props;
  }

  async render() {
    // const that = this;
    const { projName } = this.props;
    return new Promise((resolve: any) => {
      fetch('/dist/widget/releaseData.json')
        .then((response: any) => response.json())
        .then((releaseData: object) => {
          const projRelease = releaseData[projName];
          const titleNode = document.createElement('div');
          titleNode.style.fontSize = '20px';
          // titleNode.style.textAlign = 'left';
          titleNode.innerText = `Release of ${projName}`;
          const ul = document.createElement('ul');
          ul.style.fontSize = '16px';
          ul.style.textAlign = 'left';
          // ul.innerText = JSON.stringify(projRelease);
          // insert children
          projRelease.forEach((line: string) => {
            const li = document.createElement('li');
            li.innerText = line;
            ul.appendChild(li);
          });
          titleNode.appendChild(ul);
          resolve(titleNode);
        });
    });
  }
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
      defaultValue: '20px',
    }, {
      name: 'text',
      label: 'Text',
      defaultValue: 'Hello Widget',
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

  async render() {
    return new Promise((resolve: any) => {
      const { text, fontSize } = this.props;
      const div = document.createElement('div');
      div.style.fontSize = fontSize || '10px';
      div.innerText = text;
      resolve(div);
    });
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

export default [WidgetTest, WidgetProject, WidgetRelease, WidgetLabel];
