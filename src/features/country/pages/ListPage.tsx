import { Box, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cartActions } from 'features/cart/cartSlice';
import { languageActions, selectLanguageList } from 'features/language/languageSlice';
import { regionActions, selectRegionList } from 'features/region/regionSlice';
import { Country, ListParams } from 'model';
import React, { useEffect } from 'react';
import CountryFilters from '../components/CountryFilters';
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
  const languageList = useAppSelector(selectLanguageList);
  const regionList = useAppSelector(selectRegionList);

  useEffect(() => {
    dispatch(cartActions.fetchItemsFromLocalStorage());
    dispatch(languageActions.fetchLanguageList());
    dispatch(regionActions.fetchRegionList());
  }, [dispatch]);

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

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(countryActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(countryActions.setFilter(newFilter));
  };

  const handleAddItem = async (country: Country) => {
    await dispatch(cartActions.addItems(country));
    await dispatch(countryActions.setCountryIsFavorite(country));
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Typography variant="h4">Countries</Typography>

      {/* Filters */}
      <Box mb={3} mt={2}>
        <CountryFilters
          filter={filter}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
          languageList={languageList}
          regionList={regionList}
        />
      </Box>

      <Box mb={1}>
        There are
        <span style={{ fontWeight: 'bold', color: 'green' }}>&nbsp;{pagination?._totalRows}</span>
        <span style={{ fontStyle: 'italic' }}>&nbsp;results.</span>
      </Box>

      {/* Country Table */}
      <CountryTable countryList={countryList} onAdd={handleAddItem} />

      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil((pagination?._totalRows || 0) / (pagination?._limit || 0))}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
