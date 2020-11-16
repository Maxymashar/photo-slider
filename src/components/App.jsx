import React, { useState } from 'react';
import { Slider } from './Slider';
import { SearchForm } from './SearchForm';
import { makeStyles } from '@material-ui/core';

const App = () => {
  const [query, setQuery] = useState('dog');

  function onChangeQuery(query) {
    console.log('onChangeQuery', query);
    setQuery(query);
  }

  const { root } = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > * ': {
        margin: '2rem 0px',
      },
    },
  })();

  return (
    <div className={root}>
      <SearchForm onChangeQuery={onChangeQuery} />
      <Slider query={query} />
    </div>
  );
};

export { App };
