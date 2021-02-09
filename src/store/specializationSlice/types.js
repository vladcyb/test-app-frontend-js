import PropTypes from 'prop-types';

export const StateType = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
});
