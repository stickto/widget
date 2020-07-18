const widget = {
  id: 'test001',
  name: 'Test Widget',
  fields: [{
    name: 'projName',
    label: 'Project Name',
  }, {
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
  icon: 'https://static.thenounproject.com/png/3381813-200.png',
  css: '',
  script: '',
};

export default [widget];
