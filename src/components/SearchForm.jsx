import { makeStyles, TextField, Button } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { useRef } from 'react';

const SearchForm = ({ onChangeQuery }) => {
  const textFieldRef = useRef(null);
  function handleClick() {
    const value = textFieldRef.current.querySelector('input').value;
    if (value.trim()) {
      onChangeQuery(value);
    }
  }

  const { root } = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      outline: `2px solid ${deepPurple[400]}`,
      '& > *': {
        margin: '0px 8px',
      },
    },
  })();
  return (
    <form className={root}>
      <TextField
        ref={textFieldRef}
        placeholder='Query'
        variant='filled'
        style={{ flex: 1 }}
      />
      <Button variant='contained' color='primary' onClick={handleClick}>
        Search
      </Button>
    </form>
  );
};

export { SearchForm };
