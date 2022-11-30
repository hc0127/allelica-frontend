import {
  REGISTER_NEW_TEST,
  REGISTER_NEW_TEST_CSV,
  SEARCH_REGISTERED_TEST,
  UPLOAD_PATIENT_CONSENT,
  GET_PATIENT_REPORT,
  GET_PATIENT_CONSENT,
  GET_TRACKING_INFO,
  GET_PATIENT_INFO,
  GET_USER_INFO,
} from "./constants";

import useAxiosConfig from "./useAxiosConfig";

const useApi = () => {
  const { axiosInstance, isLoading } = useAxiosConfig();

  const get_user_info = async () => {
    const { url, method } = GET_USER_INFO;
    const result = await axiosInstance[method](url);
    if (result && result.data) {
      const items = result.data;
      return items;
    }

    return {};
  };

  const register_new_test = async (datas) => {
    const { url, method } = REGISTER_NEW_TEST;
    const result = await axiosInstance[method](url, datas);
    if (result && result.data) {
      const items = result.data;

      return items;
    }

    return {};
  };
  
  const register_new_test_csv = async (datas) => {
    const { url, method } = REGISTER_NEW_TEST_CSV;
    const result = await axiosInstance[method](url, datas);
    if (result && result.data) {
      const items = result.data;
      return items;
    }

    return {};
  };

  const search_registered_test = async (params) => {//orderId
    const { url, method } = SEARCH_REGISTERED_TEST;
    const result = await axiosInstance[method](url, { params: params });
    if (result && result.data) {
      const items = result.data;
      console.log(items);
      //since we need to add a key, we add a key to the resulting array.
      const keyed_items = items.map((item, key) => {
        return { ...item, key };
      });
      return keyed_items;
    }

    return [];
  };

  const upload_patient_consent = async (datas) => {
    const { url, method } = UPLOAD_PATIENT_CONSENT;
    const result = await axiosInstance[method](url, datas);
    if (result && result.data) {
      const items = result.data;
      console.log(items);
      //since we need to add a key, we add a key to the resulting array.
      const keyed_items = items.map((item, key) => {
        return { ...item, key };
      });
      return keyed_items;
    }

    return [];
  };

  const get_patient_report = async (params) => {//orderId
    const { url, method } = GET_PATIENT_REPORT;
    const result = await axiosInstance[method](url, { params: params, responseType: 'blob' });
    if (result && result.data) {
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    }

    return ({ state: 'error' });
  };

  const get_patient_consent = async (params) => {
    const { url, method } = GET_PATIENT_CONSENT;
    const result = await axiosInstance[method](url, { params: params, responseType: 'blob' });
    if (result && result.data) {
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'consent.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    }

    return ({ state: 'error' });
  };

  const get_tracking_info = async (params) => {//orderId
    const { url, method } = GET_TRACKING_INFO;
    const result = await axiosInstance[method](url, { params: params });
    if (result && result.data) {
      const items = result.data;
      return items
    }

    return {};
  };

  const get_patient_info = async (params) => {//patientId
    const { url, method } = GET_PATIENT_INFO;
    const result = await axiosInstance[method](url, { params: params });
    if (result && result.data) {
      const items = result.data;
      return items;
    }

    return {};
  };

  return {
    register_new_test,
    register_new_test_csv,
    search_registered_test,
    upload_patient_consent,
    get_patient_consent,
    get_patient_info,
    get_patient_report,
    get_tracking_info,
    get_user_info,
    isLoading,
  };
};

export default useApi;
