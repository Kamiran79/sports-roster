import PropType from 'prop-types';

const playerShape = PropType.shape({
  id: PropType.string.isRequired,
  imageUrl: PropType.string.isRequired,
  name: PropType.string.isRequired,
  uid: PropType.string.isRequired,
});

export default { playerShape };
