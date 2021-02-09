import { createAction } from '@reduxjs/toolkit';

const prefix = 'master';

const actions = {
  add: createAction(`${prefix}/add`),
  delete: createAction(`${prefix}/delete`),
  edit: createAction(`${prefix}/edit`),
  set: createAction(`${prefix}/set`),
};

export default actions;
