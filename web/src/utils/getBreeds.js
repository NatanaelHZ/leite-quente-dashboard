// eslint-disable-next-line import/no-unresolved
import breeds from 'src/__mocks__/breeds';

export default (breed) => {
  let label = 'sdfsdf';

  breeds.forEach((element) => {
    if (toString(element.value) === toString(breed)) {
      label = element.label;
    }
  });

  return label;
};
