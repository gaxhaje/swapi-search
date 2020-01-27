// components/SwapiAutocomplete.js

// SWR is a React Hooks library for remote data fetching.
import fetch from 'isomorphic-unfetch';
import { useState, useEffect, useMemo, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce } from 'throttle-debounce';
import Link from 'next/link';

const sleep = (delay = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const PostLink = props => (
  <Link href="/characters/[id]" as={`/characters/${props.id}`}>
    <a>{props.option.name}</a>
  </Link>
);

export default function SwapiAutocomplete(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

    React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('http://localhost:3000/api/characters');
      // await sleep(1e3); // For demo purposes.
      const data = await response.json();

      if (active) {
        setOptions(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="actor-search"
      style={{ 
        width: '100%',
        textTransform: 'uppercase',
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Search by character's name"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {loading ? '' : null}
              </Fragment>
            ),
          }}
        />
      )}
      renderOption={(option, { inputValue }) => {
        let id = option.url.split('/');
        id = id[id.length-2];
        return (
          <PostLink option={option} id={id} />
        );
      }}
    />
  );
}

SwapiAutocomplete.getInitialProps = async ctx => {
  const characters = await fetch('http://localhost:3000/api/characters');
  const characterData = await characters.json();
  return { characterData: characterData }
}