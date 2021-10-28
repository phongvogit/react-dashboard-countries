import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Country } from 'model';

export interface DashboardStatistics {
  countriesCount: number;
  regionsCount: number;
  highPopulationCount: number;
  lowPopulationCount: number;
}

export interface RankingByRegion {
  regionName: string;
  rankingList: Country[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestPopulationList: Country[];
  lowestPopulationList: Country[];
  rankingByRegionList: RankingByRegion[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    countriesCount: 0,
    regionsCount: 0,
    highPopulationCount: 0,
    lowPopulationCount: 0,
  },
  highestPopulationList: [],
  lowestPopulationList: [],
  rankingByRegionList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestPopulationList(state, action: PayloadAction<Country[]>) {
      state.highestPopulationList = action.payload;
    },
    setLowestPopulationList(state, action: PayloadAction<Country[]>) {
      state.lowestPopulationList = action.payload;
    },
    setRankingPopulationByRegionList(state, action: PayloadAction<RankingByRegion[]>) {
      state.rankingByRegionList = action.payload;
    },
  },
});

//Actions
export const dashboardActions = dashboardSlice.actions;

//Selectors
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestPopulationList = (state: RootState) =>
  state.dashboard.highestPopulationList;
export const selectLowestPopulationList = (state: RootState) =>
  state.dashboard.lowestPopulationList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByRegionList;

//Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
