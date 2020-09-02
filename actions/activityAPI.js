import domain from './domain';

const BANNER_API_URL = `${domain.ROOT_URL}new_ezding/ads`;
const DISCOUNT_API_URL = `${domain.ROOT_URL}new_ezding/payment/payment_list`;
const PRICEDISCOUNT_API_URL = `${domain.ROOT_URL}new_ezding/payment/payment_detail/`;
const DISCOUNTCONTENT_API_URL = `${domain.ROOT_URL}new_ezding/payment/payment_desc/`;

// 公告
export function getNotice(ad_type, ad_category, ad_channel, page_code, area_code) {
  const promise = new Promise((resolve, reject) => {
    let query = BANNER_API_URL;
    if (ad_type) {
      query += `?ad_type=${ad_type}`;
    }
    if (ad_category) {
      query += `&ad_category=${ad_category}`;
    }
    if (ad_channel) {
      query += `&ad_channel=${ad_channel}`;
    }
    if (page_code) {
      query += `&page_code=${page_code}`;
    }
    if (area_code) {
      query += `&area_code=${area_code}`;
    }

    fetch(query, {
      method: 'GET',
    })
      .then(response => {
        if (response.status !== 200) {
          response
            .text()
            .then(result => {
              reject(result);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');
          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then(result => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch(error => {
                reject(error);
              });
          } else {
            // 格式不是json
            response
              .text()
              .then(result => {
                resolve(result);
              })
              .catch(error => {
                reject(error);
              });
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
  return promise;
}

// homepage mainbanner + slider
export function getbanner(ad_type, ad_size, ad_category, ad_channel, page_code, area_code) {
  const promise = new Promise((resolve, reject) => {
    let query = BANNER_API_URL;
    if (ad_type) {
      query += `?ad_type=${ad_type}`;
    }
    if (ad_size) {
      query += `&ad_size=${ad_size}`;
    }
    if (ad_category) {
      query += `&ad_category=${ad_category}`;
    }
    if (ad_channel) {
      query += `&ad_channel=${ad_channel}`;
    }
    if (page_code) {
      query += `&page_code=${page_code}`;
    }
    if (area_code) {
      query += `&area_code=${area_code}`;
    }

    fetch(query, {
      method: 'GET',
    })
      .then(response => {
        if (response.status !== 200) {
          response
            .text()
            .then(result => {
              reject(result);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');
          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then(result => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch(error => {
                reject(error);
              });
          } else {
            // 格式不是json
            response
              .text()
              .then(result => {
                resolve(result);
              })
              .catch(error => {
                reject(error);
              });
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
  return promise;
}

// credit card discount, bank discount
export function getcredit_and_bank(type) {
  const promise = new Promise((resolve, reject) => {
    let query = DISCOUNT_API_URL;
    if (type) {
      query += `?type=${type}`;
    }

    fetch(query, {
      method: 'GET',
    })
      .then(response => {
        // 不是200
        if (response.status !== 200) {
          response
            .text()
            .then(result => {
              reject(result);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');
          // 格式是json
          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then(result => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch(error => {
                reject(error);
              });
          } else {
            // 格式不是json
            response
              .text()
              .then(result => {
                resolve(result);
              })
              .catch(error => {
                reject(error);
              });
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
  return promise;
}

// get discount 2D, 3D price
export function getprice_2D_3D(parentPaymentID, movie_version) {
  const promise = new Promise((resolve, reject) => {
    let query = PRICEDISCOUNT_API_URL;
    if (parentPaymentID) {
      query += parentPaymentID;
    }
    if (movie_version) {
      query += `?movie_version=${movie_version}`;
    }

    fetch(query, {
      method: 'GET',
    })
      .then(response => {
        // 不是200
        if (response.status !== 200) {
          response
            .text()
            .then(result => {
              reject(result);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');
          // 格式是json
          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then(result => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch(error => {
                reject(error);
              });
          } else {
            // 格式不是json
            response
              .text()
              .then(result => {
                resolve(result);
              })
              .catch(error => {
                reject(error);
              });
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
  return promise;
}

// discount content
export function getparentID(parentIDChecked) {
  const promise = new Promise((resolve, reject) => {
    let query = DISCOUNTCONTENT_API_URL;
    if (parentIDChecked) {
      query += parentIDChecked;
    }

    fetch(query, {
      method: 'GET',
    })
      .then(response => {
        // 不是200
        if (response.status !== 200) {
          response
            .text()
            .then(result => {
              reject(result);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');
          // 格式是json
          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then(result => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch(error => {
                reject(error);
              });
          } else {
            // 格式不是json
            response
              .text()
              .then(result => {
                resolve(result);
              })
              .catch(error => {
                reject(error);
              });
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
  return promise;
}
