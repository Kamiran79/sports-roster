import PropType from 'prop-types';

const playerShape = PropType.shape({
  imageUrl: PropType.string.isRequired,
  name: PropType.string.isRequired,
  uid: PropType.string.isRequired,
  position: PropType.string.isRequired,
});

export default { playerShape };
