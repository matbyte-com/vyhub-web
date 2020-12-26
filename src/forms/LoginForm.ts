export default {
  type: 'object',
  required: [
    'email',
    'password',
  ],
  properties: {
    email: {
      type: 'string',
      titleK: 'email',
      pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
    },
    password: {
      type: 'string',
      titleK: 'password',
      'x-display': 'password',
    },
  },
};
