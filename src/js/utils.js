/**
 * Remove unused props that are automatically passed to React Slick's buttons
 * and cause warning messages.
 * @param  {object} props The props passed from React Slick.
 * @return {object} fixedProps The props to send to the button components.
 */
export function removeTroublesomeArrowProps(props) {
  const troublesomeProps = ['currentSlide', 'slideCount'];
  const fixedProps = {};

  Object.keys(props).forEach(key => {
    if (troublesomeProps.includes(key) === false) {
      fixedProps[key] = props[key];
    }
  });

  return fixedProps;
}

const MEDIA_CACHE = {};
export function fetchMedia({ endpoint, id }) {
  return new Promise(async resolve => {
    const url = `${endpoint}/${id}`.replace(`//${id}`, `/${id}`);

    if (url in MEDIA_CACHE) {
      resolve(MEDIA_CACHE(url));
      return;
    }

    let response;
    try {
      response = await fetch(url);
    } catch (e) {
      resolve(null);
      return;
    }

    if (response.status !== 200) {
      resolve(null);
      return;
    }

    const media = await response.json();
    resolve(media);
  });
}
