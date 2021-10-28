import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Country } from 'model';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  table: {
    borderColor: theme.palette.secondary.main,
  },
  image: {
    width: '80px',
    height: '50px',
  },
}));

export interface CountryRankingListProps {
  countryList: Country[];
}

export default function CountryRankingList({ countryList }: CountryRankingListProps) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Flag</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countryList.map((country, idx) => (
            <TableRow key={country.name}>
              <TableCell align="center">{idx + 1}</TableCell>
              <TableCell align="left">
                <Avatar
                  className={classes.image}
                  variant="rounded"
                  alt={`image_${country.name}`}
                  src={country.flag}
                />
              </TableCell>
              <TableCell align="left">{country.name}</TableCell>
              <TableCell align="right">{country.population.toLocaleString('de-DE')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
