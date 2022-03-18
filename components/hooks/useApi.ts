import { useState } from "react";
import axios from "axios";

type UseApiResponse = [
  {
    loading: boolean,
    data: null | object | any [],
    error: any
  },
  (requestData?:any[]|object) => Promise<any>,
]

type UseApiArgs = {
  /**
   * HTTP Method. 默认’GET‘
   */
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS',
  url: string,
  /**
   * 可选，初始默认值
   */
  defaultData?: object | any[],
  /**
   * 可选，返回数据
   */
  bodyData?: object | any[]
}

const useApi = ({
  method = 'GET',
  url,
  defaultData,
}: UseApiArgs ) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(defaultData || null);
  const [error, setError] = useState(false);

  const sendRequest = (requestData?: object | any[]) => {
    const requestConfig = {
      method,
      url,
      data: requestData
    };

    const axiosConfig = Object.assign({}, requestConfig);

    /**
     * 返回一个promise对象
     */

    return new Promise(async (resolve, reject)=>{
      setLoading(true);
      try {
        const response = await axios(axiosConfig);
        setData(response.data);
        resolve(data);
      }catch(err){
        setError(error);
        reject(error);
      }finally{
        setLoading(false);
      }
    });
  };

  const response: UseApiResponse = [
    {
      loading,
      data,
      error,
    },
    sendRequest
  ];

  return response;
}

export default useApi;