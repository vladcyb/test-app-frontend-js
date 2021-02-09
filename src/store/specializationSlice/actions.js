import { createAction } from '@reduxjs/toolkit';

const prefix = 'specialization';

const actions = {
  add: createAction(`${prefix}/add`),
  delete: createAction(`${prefix}/delete`),
  edit: createAction(`${prefix}/edit`),
  set: createAction(`${prefix}/set`),
};

export default actions;
