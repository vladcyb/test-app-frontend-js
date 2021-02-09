import Responses from './methods/responses';
import instance from './axios';

const API = {
  Specialization: {
    add: (props) => Responses(
      instance.post('/specialization', props),
    ),
    get: () => Responses(
      instance.get('/specialization'),
    ),
    edit: (props) => {
      if (!props.id) {
        throw Error('Enter master id!');
      }
      return Responses(
        instance.put('/specialization', props),
      );
    },
    delete: (id) => Responses(
      instance.delete(`/specialization/${id}`),
    ),
  },
  Master: {
    add: (props) => Responses(
      instance.post('/master', props),
    ),
    get: (specId) => Responses(
      instance.get(specId ? `/master?specId=${specId}` : '/master'),
    ),
    edit: (props) => Responses(
      instance.put('/master', props),
    ),
    delete: (id) => Responses(
      instance.delete(`/master/${id}`),
    ),
  },
};

export default API;
