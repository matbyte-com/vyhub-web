export default {
  type: 'object',
  required: [
    'email',
    'password',
  ],
  properties: {
    email: {
      type: 'string',
      titleK: 'header.forms.email',
      pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
    },
    password: {
      type: 'string',
      titleK: 'header.forms.password',
      'x-display': 'password',
    },
  },
};
