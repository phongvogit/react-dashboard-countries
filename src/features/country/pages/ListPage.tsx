import { Box, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import CountryTable from '../components/CountryTable';
import {
  countryActions,
  selectCountryFilter,
  selectCountryList,
  selectCountryLoading,
  selectCountryPagination,
} from '../countrySlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ListPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCountryLoading);
  const countryList = useAppSelector(selectCountryList);
  const filter = useAppSelector(selectCountryFilter);
  const pagination = useAppSelector(selectCountryPagination);

  useEffect(() => {
    dispatch(countryActions.fetchCountryList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      countryActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Typography variant="h4">Countries</Typography>

      {/* Filters */}
      {/* <Box mb={3}>
        <CountryFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box> */}

      {/* Country Table */}
      <CountryTable countryList={countryList} />

      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
