import { Avatar, Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import countryApi from 'api/countryApi';
import { Country, ListParams } from 'model';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  table: {},

  image: {
    width: '150px',
    height: '150px',
  },
  paper: {
    padding: theme.spacing(4),
    width: '300px',
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  languages: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
}));

export default function ViewPage() {
  const classes = useStyles();
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    if (!countryName) return;

    (async () => {
      try {
        const params: ListParams = { name_like: countryName };
        const data: Country[] = await countryApi.getByName(params);
        setCountry(data[0]);
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [countryName]);

  return (
    <Box>
      <Link to="/">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft />
          Back to country list
        </Typography>
      </Link>
      <Paper className={classes.paper}>
        <Avatar
          className={classes?.image}
          variant="rounded"
          alt={`image_${country?.name}`}
          src={country?.flag}
        />
        <Typography variant="h4">{country?.name}</Typography>
        <Box mb={2}>Country in {country?.region}</Box>
        <Box className={classes.wrapper}>
          <Box mr={2} fontWeight="bold">
            Population:
          </Box>
          {country?.population.toLocaleString('de-DE')}
        </Box>
        <Box className={classes.wrapper}>
          <Box mr={2} fontWeight="bold">
            Languages:
          </Box>
          <Box className={classes.languages}>
            {country?.languages.map((item) => (
              <li>{item.name}</li>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}