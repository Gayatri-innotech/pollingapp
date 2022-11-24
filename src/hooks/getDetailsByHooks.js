import { GetDetailsById } from "../api/axiosRequest";
import React, { useEffect, useState } from "react";

export default (props) => {
  const [detailsById, setDetailsById] = useState({});
  const GetDetailsByHooks = (requestId) => {
    // console.log('Req id', requestId);
    return GetDetailsById(requestId).then((res) => {
      // console.log('ResData=>', res);
      setDetailsById(res);
    });
  };
  useEffect(() => {
    GetDetailsByHooks(props);
  }, []);
  return [detailsById];
};
