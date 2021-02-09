import PropTypes from 'prop-types';

export const StateType = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf({
    id: PropTypes.number,
    login: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    patronymic: PropTypes.string.isRequired,
    Specialization: {
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    },
  }).isRequired,
});
