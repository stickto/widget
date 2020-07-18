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

const widget = {
  id: 'test001',
  name: 'Test Widget',
  icon: 'https://static.thenounproject.com/png/3381813-200.png',
  css: '',
  script: '',
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

const widgetProject = {
  id: 'project',
  name: 'Project Switch',
  icon: 'https://static.thenounproject.com/png/1823861-200.png',
  css: '',
  script: '',
  fields: [],
};

const widgetRelease = {
  id: 'release',
  name: 'Release',
  icon: 'https://static.thenounproject.com/png/2353823-200.png',
  css: '',
  script: '',
  fields: [projField],
};

const widgetLabel = {
  id: 'label',
  name: 'Label',
  icon: 'https://static.thenounproject.com/png/47708-200.png',
  css: '',
  script: '',
  fields: [projField, {
    name: 'fontSize',
    label: 'Font Size',
  }],
};

const widgetWeather = {
  id: 'weather',
  name: 'Weather',
  icon: 'https://static.thenounproject.com/png/3432323-200.png',
  css: '',
  script: '',
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

export default [widget, widgetProject, widgetRelease, widgetLabel, widgetWeather];
