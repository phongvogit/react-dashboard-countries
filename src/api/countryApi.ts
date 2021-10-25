import { Country, ListParams, ListResponse } from 'model';
import axiosClient from './axiosClient';

const countryApi = {
  getAll(params: ListParams): Promise<ListResponse<Country>> {
    const url = '/countries';
    return axiosClient.get(url, { params });
  },
};

export default countryApi;
