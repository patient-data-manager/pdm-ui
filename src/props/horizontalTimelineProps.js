import PropTypes from 'prop-types';

const groupProps = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
});

const itemProps = PropTypes.shape({
  id: PropTypes.number.isRequired,
  group: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  start_time: PropTypes.object.isRequired,
  end_time: PropTypes.object.isRequired,
  canMove: PropTypes.bool,
  canResize: PropTypes.bool,
  canChangeGroup: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  itemProps: PropTypes.object
});

export {
  groupProps,
  itemProps
};
