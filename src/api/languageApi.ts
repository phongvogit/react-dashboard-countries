import { Language } from 'model';
import axiosClient from './axiosClient';

const languageApi = {
  getAll(): Promise<Language[]> {
    const url = '/languages';
    return axiosClient.get(url);
  },
};

export default languageApi;
