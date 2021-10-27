import axiosClient from './axiosClient';

const regionApi = {
  getAll(): Promise<string[]> {
    const url = '/regions';
    return axiosClient.get(url);
  },
};

export default regionApi;
