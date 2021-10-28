import { Box, Button, FormControl, Grid, makeStyles, MenuItem, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { Language, ListParams } from 'model';
import React, { ChangeEvent, useRef } from 'react';

export interface CountryFiltersProps {
  filter: ListParams;
  languageList: Language[];
  regionList: string[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

const useStyles = makeStyles((theme) => ({
  label: {
    color: `${theme.palette.primary.contrastText} !important`,
  },
  clear: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: '7px',
  },
  input: {
    color: `${theme.palette.primary.contrastText} !important`,
  },
}));

export default function CountryFilters({
  filter,
  languageList,
  regionList,
  onChange,
  onSearchChange,
}: CountryFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();
  const classes = useStyles();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleRegionChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      region_like: e.target.value || undefined,
    };

    onChange(newFilter);
  };

  const handleLanguageChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      languages_like: e.target.value || undefined,
    };

    onChange(newFilter);
  };

  const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      region_like: undefined,
      languages_like: undefined,
      name_like: undefined,
    };

    onChange(newFilter);
    console.log('1');
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box>
      {/* Search */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName" className={classes.label}>
              Search by Name
            </InputLabel>
            <OutlinedInput
              id="searchByName"
              label="searchByName"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              inputRef={searchRef}
              className={classes.input}
            />
          </FormControl>
        </Grid>
        {/* Filter By Language */}
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByLanguage" className={classes.label}>
              Filter by language
            </InputLabel>
            <Select
              labelId="filterByLanguage"
              id="demo-simple-select-outlined"
              onChange={handleLanguageChange}
              label="Filter by language"
              value={filter.languages_like || ''}
              color="secondary"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {languageList.map((language) => (
                <MenuItem key={language.code} value={language.name}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Filter By Region */}
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByLanguage" className={classes.label}>
              Filter by region
            </InputLabel>
            <Select
              labelId="filterByLanguage"
              id="demo-simple-select-outlined"
              onChange={handleRegionChange}
              label="Filter by language"
              value={filter.region_like || ''}
              color="secondary"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {regionList.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sort  */}
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy" className={classes.label}>
              Sort
            </InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
              color="secondary"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="population.asc"> Population ASC </MenuItem>
              <MenuItem value="population.desc"> Population DESC </MenuItem>
              <MenuItem value="name.asc"> Name ASC </MenuItem>
              <MenuItem value="name.desc"> Name DESC </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button
            variant="outlined"
            className={classes.clear}
            fullWidth
            onClick={handleClearFilter}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
