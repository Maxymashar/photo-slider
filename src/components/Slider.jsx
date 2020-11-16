import { makeStyles } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { ImageCard } from './ImageCard';
import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

const axios = require('axios').default;

function getEmptyImages(number) {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push({ id: Math.random(), name: 'N', src: null });
  }
  return array;
}
// The state
const initialState = getEmptyImages(20);

// The wrapper ref
let wrapperRef = null;

// the images shown at at time
const slidesPerWindow = 3;

// The current image index
let currentImageIndex = 0;

// the slides moving at a time
let slidesMoving = 1;

// get the width of the wrapper
function getWidth(number) {
  // number = number < 1 ? 1 : number;
  const sliderWidth = 250;
  return (number + 1) * 8 + number * sliderWidth;
}

function getTransformationDistance(number) {
  return number * 258;
}

const SliderWrapper = ({ children }) => {
  wrapperRef = useRef();

  useEffect(() => {
    wrapperRef.current.style.width = `${
      children instanceof Array ? getWidth(children.length) : getWidth(1)
    }px`;
  }, [children]);

  const { root } = makeStyles({
    root: {
      height: '100%',
      // outline: '2px solid black',
      padding: '16px 0px',
      transition: 'transform 500ms ease',
    },
  })();
  return (
    <div ref={wrapperRef} className={root}>
      {children}
    </div>
  );
};

const ControlButton = ({ direction, clickHandler, disabled }) => {
  const { root, left, right } = makeStyles({
    root: {
      position: 'absolute',
      top: 'calc(50% - 28px)',
      zIndex: 100,
    },
    left: {
      left: 16,
    },
    right: {
      right: 16,
    },
  })();

  return (
    <Fab
      className={direction === 'back' ? clsx(root, left) : clsx(root, right)}
      onClick={clickHandler}
      disabled={disabled}
    >
      {direction === 'back' ? <ArrowBack /> : <ArrowForward />}
    </Fab>
  );
};

const SliderWindow = ({ children }) => {
  const { root } = makeStyles({
    root: {
      width: getWidth(slidesPerWindow),
      height: 350,
      outline: '2px solid blue',
      position: 'relative',
      overflow: 'hidden',
    },
  })();

  return <div className={root}>{children}</div>;
};

const Slider = ({ query }) => {
  console.log('Slider Rendered', query);
  // The state
  const [images, setImages] = useState(initialState);
  // The API KEY
  const API_KEY = '563492ad6f91700001000001b7702f4246d94a279d5fa6bed1b7182e';
  const BASE_URL = 'https://api.pexels.com/v1/search';

  // disabled state [backward,foward]
  const [disabled, setDisabled] = useState([false, false]);

  useEffect(() => {
    console.log('useEffect Running');

    // reset the currentImageIndex if the query changes
    currentImageIndex = 0;
    wrapperRef.current.style.transform = 'translateX(0px)';

    if (currentImageIndex === 0) {
      setDisabled([true, false]);
    }

    if (currentImageIndex === images.length - slidesPerWindow) {
      setDisabled([true, false]);
    }
    axios
      .get(BASE_URL, {
        params: { query: query, per_page: 20 },
        headers: { Authorization: API_KEY },
      })
      .then((res) => {
        setImages(
          res.data.photos.map(({ photographer, id, src: { large } }) => ({
            name: photographer,
            id: id,
            key: id,
            src: large,
          }))
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }, [query]);

  const handleRemove = (_id) => {
    setImages(images.filter(({ id }) => id !== _id));
  };

  const moveBack = () => {
    if (currentImageIndex === 1) {
      setDisabled([true, false]);
    } else {
      setDisabled([false, false]);
    }

    currentImageIndex -= slidesMoving;
    wrapperRef.current.style.transform = `translateX(-${getTransformationDistance(
      currentImageIndex
    )}px)`;
  };

  const moveFoward = () => {
    if (currentImageIndex === images.length - 1 - slidesPerWindow) {
      setDisabled([false, true]);
    } else {
      setDisabled([false, false]);
    }

    currentImageIndex += slidesMoving;
    wrapperRef.current.style.transform = `translateX(-${getTransformationDistance(
      currentImageIndex
    )}px)`;
    console.log(wrapperRef.current);
  };

  return (
    <>
      <SliderWindow>
        <ControlButton
          direction='back'
          clickHandler={moveBack}
          disabled={disabled[0]}
        />
        <SliderWrapper>
          {images.map(({ id, name, src }) => (
            <ImageCard
              src={src}
              name={name}
              id={id}
              key={id}
              handleRemove={handleRemove}
            />
          ))}
        </SliderWrapper>
        <ControlButton
          direction='foward'
          clickHandler={moveFoward}
          disabled={disabled[1]}
        />
      </SliderWindow>
    </>
  );
};

export { Slider };
