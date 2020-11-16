import { Avatar, Button, makeStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { Skeleton } from '@material-ui/lab';

const CardAction = ({ handleRemove }) => {
  const { root } = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  })();
  return (
    <div className={root}>
      <Button color='primary' variant='text' onClick={handleRemove}>
        Remove
      </Button>
    </div>
  );
};

const CardImage = ({ src, name }) => {
  const { root, image } = makeStyles({
    root: {
      width: '100%',
      flex: 1,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
      transition: 'transform 500ms ease',
      '&:hover': {
        transform: 'scale(1.2)',
      },
    },
  })();
  return (
    <div className={root}>
      {src ? (
        <img src={src} alt={name} className={image} />
      ) : (
        <Skeleton variant='rect' animation='wave' width='100%' height='100%' />
      )}
    </div>
  );
};

const CardHeader = ({ pName, handleRemove }) => {
  const { root, avatar } = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      justifyContent: 'space-between',
      background: '#f2f2f2',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    name: {
      fontFamily: 'Roboto',
      fontSize: '1rem',
      fontWeight: '400',
      marginLeft: '16px',
    },
    avatar: {
      color: '#fff',
      background: deepPurple[400],
    },
  })();
  return (
    <div className={root}>
      <Avatar className={avatar}>{pName[0].toUpperCase()}</Avatar>
      {/* <CardAction handleRemove={handleRemove} /> */}
    </div>
  );
};

const ImageCard = ({ src, name, handleRemove, id }) => {
  const { root } = makeStyles((theme) => ({
    root: {
      display: 'inline-flex',
      flexDirection: 'column',
      width: 250,
      height: '100%',
      boxShadow: '2px 2px 4px #f2f2f2 ,-2px -2px 4px #f2f2f2',
      borderRadius: 6,
      marginLeft: 4,
      marginRight: 4,
      '&:first-child': {
        marginLeft: 8,
        marginRight: 4,
      },
      '&:last-child': {
        marginRight: 8,
        marginLeft: 4,
      },
      '&:only-child': {
        marginRight: 8,
        marginLeft: 8,
      },
    },
  }))();

  return (
    <div className={root}>
      <CardHeader
        pName={name}
        handleRemove={() => {
          handleRemove(id);
        }}
      />
      <CardImage src={src} name={name} />
    </div>
  );
};

export { ImageCard };
