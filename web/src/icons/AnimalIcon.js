import { IconContext } from 'react-icons';
import { GiCow } from 'react-icons/gi';

const AnimalIcon = (props) => (
  <IconContext.Provider {...props} value={{ className: 'cowIcon' }}>
    <span>
      <GiCow />
    </span>
  </IconContext.Provider>
);

export default AnimalIcon;
