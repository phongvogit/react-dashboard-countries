import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import countryApi from 'api/countryApi';
import regionApi from 'api/regionApi';
import { ListResponse, Country } from 'model';
import { dashboardActions, RankingByRegion } from './dashboardSlice';

function* fetchStatistics() {
  const responseCountryList: Array<ListResponse<Country>> = yield all([
    call(countryApi.getAll, { _page: 1, _limit: 1 }),
    call(countryApi.getAll, { _page: 1, _limit: 1, population_gte: 100000000 }),
    call(countryApi.getAll, { _page: 1, _limit: 1, population_lte: 1000 }),
  ]);

  const responseRegionList: Array<string> = yield call(regionApi.getAll);

  const statisticList = responseCountryList.map((x) => x.pagination._totalRows);
  //add regionCount
  statisticList.push(responseRegionList.length);
  const [countriesCount, highPopulationCount, lowPopulationCount, regionsCount] = statisticList;
  yield put(
    dashboardActions.setStatistics({
      countriesCount,
      regionsCount,
      highPopulationCount,
      lowPopulationCount,
    })
  );
}

function* fetchHighestPopulationList() {
  const { data }: ListResponse<Country> = yield call(countryApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'population',
    _order: 'desc',
  });

  yield put(dashboardActions.setHighestPopulationList(data));
}

function* fetchLowestPopulationList() {
  const { data }: ListResponse<Country> = yield call(countryApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'population',
    _order: 'asc',
  });

  yield put(dashboardActions.setLowestPopulationList(data));
}

function* fetchRankingByRegionList() {
  //Fetch city list
  const regionList: Array<string> = yield call(regionApi.getAll);

  //Fetch ranking per city
  const callList = regionList.map((reg) =>
    call(countryApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'population',
      _order: 'desc',
      region: reg,
    })
  );
  const responseList: Array<ListResponse<Country>> = yield all(callList);
  const rankingByRegionList: Array<RankingByRegion> = responseList.map((x, idx) => ({
    regionName: regionList[idx],
    rankingList: x.data,
  }));

  //Update state
  yield put(dashboardActions.setRankingPopulationByRegionList(rankingByRegionList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestPopulationList),
      call(fetchLowestPopulationList),
      call(fetchRankingByRegionList),
    ]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('Failed to fetch dashboard data');
    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
