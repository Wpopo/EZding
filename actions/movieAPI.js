import domain from './domain';
// homepage

const MOVIE_RANK_WEB_API_URL = `${domain.ROOT_URL}new_ezding/ranking_list/comment_top`;
const MOVIE_RANK_COMING_API_URL = `${domain.ROOT_URL}new_ezding/ranking_list/coming`;

// bookingDialog
const GET_HOT_MOVIES_LIST_API_URL = `${domain.ROOT_URL}new_ezding/ranking_list/order_top`;
const CINEMAS_LIST_API_URL = `${domain.ROOT_URL}new_ezding/cinemas`;
const MOVIE_FIND_CINEMAS_LIST_API_URL = `${domain.ROOT_URL}new_ezding/orders/find_movie`;
const MOVIE_FIND_BY_LOCATION = `${domain.ROOT_URL}new_ezding/orders/find_location_cinema`;
const MOVIE_CINEMA_SESSIONDATE_API_URL = `${domain.ROOT_URL}new_ezding/orders/find_movie_time`;
const MOVIE_FIND_BY_CINEMA_API_URL = `${domain.ROOT_URL}new_ezding/orders/find_movie_by_cinema`;

// 取得一部電影的詳細資料
const GET_MOVIE_INFO_API_URL = `${domain.ROOT_URL}new_ezding/movies`;
// 取得一個場次的詳細資訊
const GET_SESSION_INFO_BY_SESSIONID_API_URL = `${domain.ROOT_URL}new_ezding/orders/find_movie_by_session`;
// 取得一個場次的詳細資料(booking_start_trans)
const GET_SESSION_INFO_API_URL = `${domain.ROOT_URL}new_ezding/orders/booking_start_trans`;
// 取得座位(booking_selected_seats)
const GET_SELECTED_SEATS = `${domain.ROOT_URL}new_ezding/orders/booking_selected_seats`;
// 取消座位
const CANCEL_SEATS_API_URL = `${domain.ROOT_URL}new_ezding/orders/cancel_seats`;

// homepage 現正熱映
export function movieRankHot(page, page_size) {
  const promise = new Promise((resolve, reject) => {
    let query = GET_HOT_MOVIES_LIST_API_URL;

    if (page) {
      query += `?page=${page}`;
    }
    if (page_size) {
      query += `&page_size=${page_size}`;
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

// homepage 網路熱議
export function movieRankWeb(page, page_size) {
  const promise = new Promise((resolve, reject) => {
    let query = MOVIE_RANK_WEB_API_URL;
    if (page) {
      query += `?page=${page}`;
    }
    if (page_size) {
      query += `&page_size=${page_size}`;
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

// homepage 即將上映
export function movieRankComing(page, page_size) {
  const promise = new Promise((resolve, reject) => {
    let query = MOVIE_RANK_COMING_API_URL;

    if (page) {
      query += `?page=${page}`;
    }
    if (page_size) {
      query += `&page_size=${page_size}`;
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

// bookingDialog 影城清單
export function cinemasList(location, valid) {
  const promise = new Promise((resolve, reject) => {
    let query = CINEMAS_LIST_API_URL;

    if (location) {
      query += `?location=${location}`;
    }
    if (valid) {
      query += `&valid=${valid}`;
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

export function cinemaInfo(cinema_id) {
  const promise = new Promise((resolve, reject) => {
    let query = CINEMAS_LIST_API_URL;

    if (cinema_id) {
      query += `/${cinema_id}`;
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
// 指定電影找 影城清單
export function getMovieCinemasList(movie_id) {
  const promise = new Promise((resolve, reject) => {
    let query = MOVIE_FIND_CINEMAS_LIST_API_URL;

    if (movie_id) {
      query += `/${movie_id}`;
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

// 指定電影 指定影城找上映日期
export function getMovieCinemasSessionDate(movie_id, cinema_id, page, page_size) {
  const promise = new Promise((resolve, reject) => {
    let query = MOVIE_CINEMA_SESSIONDATE_API_URL;

    if (movie_id) {
      query += `?movie_id=${movie_id}`;
    }
    if (cinema_id) {
      query += `&cinema_id=${cinema_id}`;
    }
    if (page) {
      query += `&page=${page}`;
    }
    if (page_size) {
      query += `&page_size=${page_size}`;
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

// 依電影＋地區找影城清單
export function getMovieCinemasListByLocation(movie_id, location, page, page_size) {
  const promise = new Promise((resolve, reject) => {
    let query = MOVIE_FIND_BY_LOCATION;

    if (movie_id) {
      query += `?movie_id=${movie_id}`;
    }
    if (location) {
      query += `&location=${location}`;
    }
    if (page) {
      query += `&page=${page}`;
    }
    if (page_size) {
      query += `&page_size=${page_size}`;
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

// 依影城 找要看的電影
export function getMovieListByCinema(cinema_id, page, page_size) {
  const promise = new Promise((resolve, reject) => {
    let query = MOVIE_FIND_BY_CINEMA_API_URL;

    if (cinema_id) {
      query += `?cinema_id=${cinema_id}`;
    }
    if (page) {
      query += `&page=${page}`;
    }
    if (page_size) {
      query += `&page_size=${page_size}`;
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

// 取得一部電影的詳細資料
export function getMovieInfo(movie_id) {
  const promise = new Promise((resolve, reject) => {
    let query = GET_MOVIE_INFO_API_URL;

    if (movie_id) {
      query += `/${movie_id}`;
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

// 取得一個場次的詳細資料
export function getSessionInfo(session_id) {
  const promise = new Promise((resolve, reject) => {
    let query = GET_SESSION_INFO_BY_SESSIONID_API_URL;

    if (session_id) {
      query += `?session_id=${session_id}`;
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
// 取得一個場次的座位詳細資料(booking_start_trans)
export function getSessionSeatMapInfo(session_id, tickets) {
  const promise = new Promise((resolve, reject) => {
    const query = GET_SESSION_INFO_API_URL;

    fetch(query, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id, tickets }),
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

// 取得座位(booking_selected_seats)
export function getSelectedSeats(source, userToken) {
  const promise = new Promise((resolve, reject) => {
    const query = GET_SELECTED_SEATS;

    fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Ftc-Authorization': userToken,
      },
      body: source,
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

// 取消座位
export function cancelSeats(date) {
  const promise = new Promise((resolve, reject) => {
    const query = CANCEL_SEATS_API_URL;

    fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: date,
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
