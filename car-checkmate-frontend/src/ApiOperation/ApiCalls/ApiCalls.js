import axios from 'axios';

export function getApi(url, headers) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'get',
      url: url,
      headers: headers,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log({ url, err });
        resolve(err?.response || err);
      });
  });
}

export function postApi(url, data, headers) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: url,
      headers: headers,
      data: data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log({ url, err });
        resolve(err?.response || err);
      });
  });
}

export function putApi(url, data, headers) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'put',
      url: url,
      headers: headers,
      data: data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log({ url, err });
        resolve(err?.response || err);
      });
  });
}

export function deleteApi(url, data, headers) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'delete',
      url: url,
      headers: headers,
      data: data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log({ url, err });
        resolve(err?.response || err);
      });
  });
}
