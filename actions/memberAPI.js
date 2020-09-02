import domain from './domain';

const WEB_CODE_GET_TOKEN_API_URL = `${domain.MEMBER_URL}MemberUI/api/authorization/code`;
const MEMBER_TOKEN_CHECK_API_URL = `${domain.MEMBER_URL}MemberUI/api/oauth/token`;

const GET_MEMBER_DETAIL_API_URL = `${domain.MEMBER_URL}MemberUI/api/members/detail`;
const GET_MEMBER_NICKNAME_API_URL = `${domain.MEMBER_URL}new_ezding/members/config`;
const UPDATE_MEMBER_NICKNAME_API_URL = `${domain.MEMBER_URL}new_ezding/members/config/update`;
const UPDATE_MEMBER_DETAIL_API_URL = `${domain.MEMBER_URL}MemberUI/api/members/detail/update`;

const GET_MEMBER_POINTS_API_URL = `${domain.ROOT_URL}new_ezding/api/members/points`;
const GET_MEMBER_POINTS_LIST_API_URL = `${domain.ROOT_URL}new_ezding/members/point_list`;

const COUPON_TO_ACCOUNT_API_URL = `${domain.ROOT_URL}new_ezding/coupons/attach`;
const GET_COUPON_LIST_API_URL = `${domain.ROOT_URL}new_ezding/members/coupon_list`;
const GET_PAYMENT_BOOKING_INFO_API_URL = `${domain.ROOT_URL}new_ezding/members/order`;

const GET_RECORD_LIST_API_URL = `${domain.ROOT_URL}new_ezding/members/order_list`;
const GET_ORDER_INFO_API_URL = `${domain.ROOT_URL}new_ezding/members/order`;
const CANCEL_BOOKING_API_URL = `${domain.ROOT_URL}new_ezding/orders/cancel_booking_record`;

const MEMBER_IS_EXIT_USER_API_URL = `${domain.ROOT_URL}MemberUI/api/members/is_exist_user`;
const MEMBER_CREATE_USER_API_URL = `${domain.ROOT_URL}MemberUI/api/members/create_user`;
const MEMBER_VALIDATION_USER_API_URL_ = `${domain.ROOT_URL}MemberUI/api/members/validation_user`;
const MEMBER_AUTHORIZATION_LOGIN = `${domain.ROOT_URL}MemberUI/api/authorization/login`;
const MEMBER_AUTHORIZATION_THIRD_PARTY_LOGIN = `${domain.ROOT_URL}MemberUI/api/authorization/thirdparty/login`;
const MEMBER_BIND = `${domain.ROOT_URL}MemberUI/api/members/bind_user`;
const MEMBER_MGM_CODE = `${domain.ROOT_URL}new_ezding/MGM/code`;

// member token
export function webCodeGetToken(code) {
  const promise = new Promise((resolve, reject) => {
    let query = WEB_CODE_GET_TOKEN_API_URL;
    query += `/${code}`;

    fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function memberTokenCheck(token) {
  const promise = new Promise((resolve, reject) => {
    let query = MEMBER_TOKEN_CHECK_API_URL;
    query += `?token=${token}`;

    fetch(query, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function memberDetail(token) {
  const promise = new Promise((resolve, reject) => {
    const query = GET_MEMBER_DETAIL_API_URL;

    fetch(query, {
      method: 'GET',
      headers: {
        'X-Ftc-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function memberNickName(token) {
  const promise = new Promise((resolve, reject) => {
    const query = GET_MEMBER_NICKNAME_API_URL;

    fetch(query, {
      method: 'GET',
      headers: {
        'X-Ftc-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function updateMemberNickName(
  token,
  inv_receiver,
  inv_gender,
  inv_zip,
  inv_city_id,
  inv_town_id,
  inv_address,
  cinema_id,
  nick_name,
) {
  const promise = new Promise((resolve, reject) => {
    const query = UPDATE_MEMBER_NICKNAME_API_URL;

    const data = {};
    if (inv_receiver) {
      data.inv_receiver = inv_receiver;
    }
    if (inv_gender) {
      data.inv_gender = inv_gender;
    }
    if (inv_zip) {
      data.inv_zip = inv_zip;
    }
    if (inv_city_id) {
      data.inv_city_id = inv_city_id;
    }
    if (inv_town_id) {
      data.inv_town_id = inv_town_id;
    }
    if (inv_address) {
      data.inv_address = inv_address;
    }
    if (cinema_id) {
      data.cinema_id = cinema_id;
    }
    data.nick_name = nick_name;

    fetch(query, {
      method: 'PUT',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function memberTokenLogOut(token) {
  const promise = new Promise((resolve, reject) => {
    let query = MEMBER_TOKEN_CHECK_API_URL;
    query += `?token=${token}`;

    fetch(query, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function updateMemberDetail(token, name, email, birthday, asiamiles_no, base64_image) {
  const promise = new Promise((resolve, reject) => {
    const query = UPDATE_MEMBER_DETAIL_API_URL;

    const data = {};

    data.email = email;
    data.birthday = birthday;
    data.asiamiles_no = asiamiles_no;

    if (base64_image) {
      data.base64_image = base64_image;
    }

    fetch(query, {
      method: 'PUT',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function getMemberPoints(token, point_type) {
  const promise = new Promise((resolve, reject) => {
    let query = GET_MEMBER_POINTS_API_URL;

    if (point_type) {
      query += `?point_type=${point_type}`;
    }

    fetch(query, {
      method: 'GET',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function getMemberPointsList(token, point_type, begin_time, end_time, page, page_size) {
  const promise = new Promise((resolve, reject) => {
    let query = GET_MEMBER_POINTS_LIST_API_URL;

    if (point_type) {
      query += `?point_type=${point_type}`;
    }
    if (begin_time) {
      query += `&begin_time=${begin_time}`;
    }
    if (end_time) {
      query += `&end_time=${end_time}`;
    }
    if (page) {
      query += `&page=${page}`;
    }
    if (page_size) {
      query += `&page_size=${page_size}`;
    }

    fetch(query, {
      method: 'GET',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function couponToAccount(token, coupon_number) {
  const promise = new Promise((resolve, reject) => {
    const query = COUPON_TO_ACCOUNT_API_URL;

    const data = {
      coupon_number,
    };

    fetch(query, {
      method: 'POST',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function getCouponList(token, use_status, page, page_size) {
  const promise = new Promise((resolve, reject) => {
    let query = GET_COUPON_LIST_API_URL;

    if (use_status) {
      query += `?use_status=${use_status}`;
    }
    if (page) {
      query += `&page=${page}`;
    }
    if (page_size) {
      query += `&page_size=${page_size}`;
    }

    fetch(query, {
      method: 'GET',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function getRecordList(token, is_show, page, page_size) {
  const promise = new Promise((resolve, reject) => {
    let query = GET_RECORD_LIST_API_URL;

    if (is_show) {
      query += `?is_show=${is_show}`;
    }
    if (page) {
      query += `&page=${page}`;
    }
    if (page_size) {
      query += `&page_size=${page_size}`;
    }
    fetch(query, {
      method: 'GET',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

// 取得payment完成頁訂單資訊
export function getPaymentBookingInfo(order_id, token) {
  const promise = new Promise((resolve, reject) => {
    let query = GET_PAYMENT_BOOKING_INFO_API_URL;
    query += `?ez_order_id=${order_id}`;

    fetch(query, {
      method: 'GET',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function getOrderInformation(token, ez_order_id) {
  const promise = new Promise((resolve, reject) => {
    let query = GET_ORDER_INFO_API_URL;

    if (ez_order_id) {
      query += `?ez_order_id=${ez_order_id}`;
    }

    fetch(query, {
      method: 'GET',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export function cancelBookingRecord(token, order_id) {
  const promise = new Promise((resolve, reject) => {
    let query = CANCEL_BOOKING_API_URL;
    query += `/?order_id=${order_id}`;

    fetch(query, {
      method: 'POST',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

//Member Login
export const isExitUser = (login_id, login_type) => {
  const promise = new Promise((resolve, reject) => {
    let query = MEMBER_IS_EXIT_USER_API_URL;
    query += `?login_id=${login_id}&login_type=${login_type}&sid=ezding`;
    console.log('query', query);

    fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

export const memberCreateUser = (user_data) => {
  const promise = new Promise((resolve, reject) => {
    const query = MEMBER_CREATE_USER_API_URL;

    const data = user_data;

    fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

export const memberValidationUser = (user_data) => {
  const promise = new Promise((resolve, reject) => {
    const query = MEMBER_VALIDATION_USER_API_URL_;

    const data = user_data;

    fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

export const memberLogin = (userdData) => {
  const promise = new Promise((resolve, reject) => {
    const query = MEMBER_AUTHORIZATION_LOGIN;
    const data = userdData;

    fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

export const memberThirdPartyLogin = (userdData) => {
  const promise = new Promise((resolve, reject) => {
    const query = MEMBER_AUTHORIZATION_THIRD_PARTY_LOGIN;
    const data = userdData;

    fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

export const memberBind = (userdData, token) => {
  const promise = new Promise((resolve, reject) => {
    const query = MEMBER_BIND;
    const data = userdData;
    fetch(query, {
      method: 'POST',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

//MGM  inviteFromFriendCoupon
export function inviteFromFriendCoupon(token, MGM_Code) {
  const promise = new Promise((resolve, reject) => {
    let query = MEMBER_MGM_CODE;
    let data = {
      mgm_code: `${MGM_Code}`,
    };

    fetch(query, {
      method: 'POST',
      headers: {
        'X-Ftc-Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}
