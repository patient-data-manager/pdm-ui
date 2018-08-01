import PropTypes from 'prop-types';

const groupProps = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
});

const itemProps = PropTypes.shape({
  id: PropTypes.string.isRequired,
  group: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  start_time: PropTypes.number.isRequired,
  end_time: PropTypes.number.isRequired,
  canMove: PropTypes.bool,
  canResize: PropTypes.bool,
  canChangeGroup: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.string,
  itemProps: PropTypes.shape({
    'data-tip': PropTypes.string
  })
});

export {
  groupProps,
  itemProps
};
