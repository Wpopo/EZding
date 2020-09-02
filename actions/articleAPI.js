import domain from './domain';

const ARTICLE_NEWS_API_URL = `${domain.ROOT_URL}new_ezding/contents`;

// homepage 新聞影評
export function articleNews(content_category, content_type, valid, page, page_size, top, feature) {
  const promise = new Promise((resolve, reject) => {
    let query = ARTICLE_NEWS_API_URL;
    if (content_category) {
      query += '?content_category=' + content_category;
    }
    if (content_type) {
      query += '&content_type=' + content_type;
    }
    if (valid) {
      query += '&valid=' + valid;
    }
    if (top) {
      query += '&top=' + top;
    }
    if (feature) {
      query += '&feature=' + feature;
    }
    if (page) {
      query += '&page=' + page;
    }
    if (page_size) {
      query += '&page_size=' + page_size;
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

// article 文章詳細
export function articlePage(content_id) {
  const promise = new Promise((resolve, reject) => {
    let query = ARTICLE_NEWS_API_URL;
    if (content_id) {
      query += '/' + content_id;
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

// article 文章詳細
export function getOtherOneRead(movie_id, page, page_size, valid) {
  const promise = new Promise((resolve, reject) => {
    let query = ARTICLE_NEWS_API_URL;
    if (movie_id) {
      query += '?movie_id=' + movie_id;
    }
    if (page) {
      query += '&page=' + page;
    }
    if (page_size) {
      query += '&page_size=' + page_size;
    }
    if (valid) {
      query += '&valid=' + valid;
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
