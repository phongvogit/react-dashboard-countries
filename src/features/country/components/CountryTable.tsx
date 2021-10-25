import { Avatar, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
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
  table: {},

  image: {
    width: '80px',
    height: '50px',
  },

  view: {
    marginLeft: theme.spacing(1),
    color: '#651fff',
  },
}));

export interface CountryTableProps {
  countryList: Country[];

  onAdd?: (country: Country) => void;
  onView?: (country: Country) => void;
}

export default function CountryTable({ countryList }: CountryTableProps) {
  const classes = useStyles();

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  //   const handleRemoveClick = (student: Student) => {
  //     setSelectedStudent(student);
  //     setOpen(true);
  //   };

  //   const handleRemoveConfirm = (student: Student) => {
  //     onRemove?.(student);
  //     setOpen(false);
  //   };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Flag</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Languages</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Region</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryList.map((country, idx) => (
              <TableRow key={country.name}>
                <TableCell>
                  <Avatar
                    className={classes.image}
                    variant="rounded"
                    alt={`image_${country.name}`}
                    src={country.flag}
                  />
                </TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>
                  {country.languages.map((lang) => (
                    <li key={lang.name}>{lang.name}</li>
                  ))}
                </TableCell>
                <TableCell>{country.population.toLocaleString('de-DE')}</TableCell>
                <TableCell>{country.region}</TableCell>
                <TableCell align="right">
                  <Button size="small" color="primary" variant="contained">
                    ADD
                  </Button>
                  <Button size="small" className={classes.view} variant="outlined">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}