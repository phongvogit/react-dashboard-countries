import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Language, People, Public, SupervisorAccount } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import CountryRankingList from './components/CountryRankingList';
import StatisticItems from './components/StatisticItems';
import Widget from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestPopulationList,
  selectLowestPopulationList,
  selectRankingByCityList,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
    backgroundColor: theme.palette.secondary.light,
    height: '2px',
  },

  widgetWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestPopulationList = useAppSelector(selectHighestPopulationList);
  const lowestPopulationList = useAppSelector(selectLowestPopulationList);
  const rankingByRegionList = useAppSelector(selectRankingByCityList);

  const classes = useStyles();

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* Statistics Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItems
            icon={<Public fontSize="large" />}
            label="countries"
            value={statistics.countriesCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItems
            icon={<Language fontSize="large" />}
            label="regions"
            value={statistics.regionsCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItems
            icon={<People fontSize="large" />}
            label="population &ge; 100.000.000"
            value={statistics.highPopulationCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItems
            icon={<SupervisorAccount fontSize="large" />}
            label="population &le; 1.000"
            value={statistics.lowPopulationCount}
          />
        </Grid>
      </Grid>

      {/* All country ranking */}
      <Box mt={5}>
        <Typography variant="h4" color="textPrimary">
          All Countries
        </Typography>
        <Box mt={2} className={classes.widgetWrapper}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Widget title="Countries with highest population">
                <CountryRankingList countryList={highestPopulationList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Widget title="Countries with lowest population">
                <CountryRankingList countryList={lowestPopulationList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Ranking By City */}
      <Box mt={5}>
        <Typography variant="h4" color="textPrimary">
          Rankings population by region
        </Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByRegionList.map((ranking) => (
              <Grid key={ranking.regionName} item xs={12} md={6} lg={6}>
                <Widget title={ranking.regionName}>
                  <CountryRankingList countryList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
