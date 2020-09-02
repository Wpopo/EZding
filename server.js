const next = require('next');
const express = require('express');
const session = require('express-session');
const config = require('./config');
const helmet = require('helmet');
const csp = require('helmet-csp');
const compression = require('compression');

const nextJS = config.nextJS;
const beta = config.beta;
const prod = config.prod;

const request = require('request');

const dev = process.env.NODE_ENV !== 'production';
const production = process.env.NODE_ENV === 'production';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = dev == true ? next({ dev }) : next({ production });
const handle = app.getRequestHandler();

const FTC_KEY = '246abe9331eb41e0930f8558774ca444';

// sitemap.xml
const sm = require('sitemap');

const host = 'https://www.ezding.com.tw';
const sitemapUrlArticle = '/new_ezding/sitemap/article';
const sitemapUrlCinema = '/new_ezding/sitemap/cinema';
const sitemapUrlMovie = '/new_ezding/sitemap/movie';

app.prepare().then(() => {
  const server = express();

  server.all(/(.*)/, (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === 'http') {
      if (req.originalUrl == '/check_alive.html') {
      } else {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
      }
    } else {
      return next(); // pass control to the next handler
    }
  });

  function getConfig(req) {
    let envConfig = config.prod;
    switch (req.headers.host) {
      case 'alpha-next.ezding.com.tw':
      case 'localhost:3000':
        envConfig = config.nextJS;
        break;
      case 'beta3.ezding.com.tw':
        envConfig = config.beta;
        break;
    }
    return envConfig;
  }

  function getPotocal(req) {
    if (req.headers.host == 'localhost:3000') {
      return 'http://';
    }
    return 'https://'
  }

  function getAPIDomain(req) {
    return getConfig(req).ezdingAPIAddress;
  }

  function header(currentHost) {
    if (
      currentHost == 'alpha-next.ezding.com.tw'
      || currentHost == 'localhost:3000'
      || currentHost == 'beta3.ezding.com.tw'
    ) {
      return {
        'Cache-control': 'max-age=120',
        'Content-Type': 'application/json; charset=utf-8',
      };
    }
    return {
      'Cache-control': 'max-age=120',
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Encoding': 'gzip',
    };
  }

  function appendAPIHeaders(req, res) {
    let url = getAPIDomain(req) + req.url;
    console.log(new Date(), 'appendAPIHeaders:', url);
    req.headers['X-Ftcsys-Key'] = FTC_KEY;

    // 區分需要做cache的path
    let headerObj = {};

    if (req.url.indexOf('new_ezding/orders/find_movie/') > 0) {
      headerObj = header(req.headers.host);
      res.writeHeader(200, headerObj);
    } else if (req.url.indexOf('newPaymentWeb/') > 0) {
      // for PaymentWeb (no cache)
      // 拿掉假路徑
      url = url.replace('newPaymentWeb/', '');
    } else if (
      req.url.indexOf('new_ezding/orders/') > 0
      || req.url.indexOf('new_ezding/members/') > 0
      || req.url.indexOf('new_ezding/api/members/') > 0
      || req.url.indexOf('new_ezding/ez_thirdparty/') > 0
    ) {
      // no cache
    } else {
      headerObj = header(req.headers.host);
      res.writeHeader(200, headerObj);
    }

    req.pipe(request(url)).pipe(res); // 指定response回傳的位置 回原本的路線上
  }

  function appendMemberAPIHeaders(req, res) {
    const url = getConfig(req).memberAPIAddress + req.url;
    console.log(new Date(), 'appendMemberAPIHeaders:', url);
    req.headers['X-Ftcsys-Key'] = FTC_KEY;
    req.pipe(request(url)).pipe(res); // 指定response回傳的位置 回原本的路線上
  }

  server.use(
    helmet({
      dnsPrefetchControl: { allow: true },
      frameguard: { action: 'sameorigin' },
    }),
  );
  server.use(compression());
  server.use(
    csp({
      // Specify directives as normal.
      directives: {
        scriptSrc: [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          'https://www.googletagmanager.com',
          'http://www.googletagmanager.com',
          'http://www.google-analytics.com',
          'http://www.googleadservices.com',
          'https://connect.facebook.net',
          'https://code.jquery.com',
          'http://ad.tagtoo.co',
          'http://cdn.tagtoo.com.tw',
          'http://static.hotjar.com',
          'https://googleads.g.doubleclick.net',
          'https://script.hotjar.com',
          'https://bot.cresclab.com',
          'https://tagmanager.google.com',
          'https://pagead2.googlesyndication.com',
          'https://adservice.google.com',
          'https://adservice.google.com.tw',
        ],
        objectSrc: ["'none'"],
      },

      // This module will detect common mistakes in your directives and throw errors
      // if it finds any. To disable this, enable "loose mode".
      loose: false,

      // Set to true if you only want browsers to report errors, not block them.
      // You may also set this to a function(req, res) in order to decide dynamically
      // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
      reportOnly: false,

      // Set to true if you want to blindly set all headers: Content-Security-Policy,
      // X-WebKit-CSP, and X-Content-Security-Policy.
      setAllHeaders: false,

      // Set to true if you want to disable CSP on Android where it can be buggy.
      disableAndroid: false,

      // Set to false if you want to completely disable any user-agent sniffing.
      // This may make the headers less compatible but it will be much faster.
      // This defaults to `true`.
      browserSniff: true,
    }),
  );

  server.all(/\/new_ezding\//, appendAPIHeaders);
  server.all(/\/MemberUI\//, appendMemberAPIHeaders);

  // 遇到mb.do或mmb.do 轉址
  server.all(/\b(mb.do|mmb.do)\b/, (req, res) => {
    return res.redirect('https://www.ezding.com.tw');
  });

  // 如果短網址進來，給一個靜態頁面倒轉，faq
  server.get('/page/faq/faq.html', (req, res) => {
    res.sendFile('./static/app/app.html', { root: __dirname });

    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    const redirecturl = `${http + req.headers.host}/faq` + '?comeFromApp=true&device=app';
    return res.redirect(redirecturl);
  });

  // 如果短網址進來，給一個靜態頁面倒轉，preferential
  server.get('/page/preferential/', (req, res) => {
    res.sendFile('./static/app/app.html', { root: __dirname });

    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    const redirecturl = `${http + req.headers.host}/preferential` + '?comeFromApp=true&device=app';
    return res.redirect(redirecturl);
  });

  // article沒有page是給Android，遇到userid=轉址
  server.all('/article/article.html', (req, res) => {
    if (req.query.userId != null) {
      const id = req.query.id;
      let http;
      if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
        http = 'http://';
      } else {
        http = 'https://';
      }
      const redirecturl = `${http + req.headers.host}/articlePage?content_id=${id}&comeFromApp=true&device=app`;
      return res.redirect(redirecturl);
    }
  });

  // article遇到userid=轉址
  // 舊ezding，page/article/article.html轉址
  server.all('/page/article/article.html', (req, res) => {
    const id = req.query.id;
    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    if (req.query.id) {
      if (req.query.userId != null) {
        const redirecturl = `${http + req.headers.host}/articlePage?content_id=${id}&comeFromApp=true&device=app`;
        return res.redirect(redirecturl);
      }
      const redirecturl = `${http + req.headers.host}/articlePage?content_id=${id}`;
      return res.redirect(redirecturl);
    }
    const redirecturl = `${http + req.headers.host}/article`;
    return res.redirect(redirecturl);
  });

  // 舊ezding，page/intro/movie_detail.html轉址
  server.all('/page/intro/movie_detail.html', (req, res) => {
    const id = req.query.id;
    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    const lineRedirecturl = `${http + req.headers.host}/movieInfo?movieid=${id}`;
    // console.log('bookingError',lineRedirecturl);
    return res.redirect(lineRedirecturl);
  });

  // 遇到bookingError時轉址
  server.all('/page/common/bookingError.html', (req, res) => {
    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    const lineRedirecturl = `${http + req.headers.host}/bookingError`;
    // console.log('bookingError',lineRedirecturl);
    return res.redirect(lineRedirecturl);
  });

  // 遇到channel=line時redirect網址
  server.get('/page/booking/index.html', (req, res) => {
    // line進來取值
    // console.log(req.query.movieId);
    const campaignCode = req.query.campaign_code;
    const movieId = req.query.movieId;
    const cinemaId = req.query.cinemaId;
    const date = req.query.date;
    const time = req.query.time;
    const tickets = req.query.people;
    const sessionId = req.query.session;
    const channel = req.query.channel;
    const domain = req.headers.host;
    console.log(new Date(), 'channel=line_redirect:domain', domain);

    // 轉換成next資料
    const url = `movieId=${movieId}&cinemaId=${cinemaId}&date=${date}&time=${time}&tickets=${tickets}&session_id=${sessionId}&channel=${channel}&campaignCode=${campaignCode}`;

    let http;
    if (domain == 'localhost:3000' || domain == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }

    const lineRedirecturl = `${http + domain}/seatMap?${url}`;
    console.log(new Date(), 'channel=line_redirect:', lineRedirecturl);
    return res.redirect(lineRedirecturl);
  });

  // logo for line pay 平台
  server.get('/img/logo300x300.jpg', (req, res) => {
    res.sendFile('./static/linepay/logo300x300.jpg', { root: __dirname });
  });

  // check_alive.html
  server.get('/check_alive.html', (req, res) => {
    res.sendFile('./static/check_alive.html', { root: __dirname });
  });

  // apple pay 授權
  server.get('/.well-known/apple-developer-merchantid-domain-association.txt', (req, res) => {
    res.sendFile('./static/.well-known/apple-developer-merchantid-domain-association.txt', { root: __dirname });
  });

  // iframe:開眼
  server.get('/pages/iframe/iframe_layout4atmovie.html', (req, res) => {
    // console.log(req.query.id);
    res.sendFile('./static/iframe/iframe_new_atmovie.html', { root: __dirname });
  });

  // iframe:cardu
  server.get('/pages/iframe/iframe4cardu.html', (req, res) => {
    res.sendFile('./static/iframe/iframe4cardu.html', { root: __dirname });
  });

  // iframe:ETtoday
  server.get('/pages/iframe/iframe4ETtoday.html', (req, res) => {
    res.sendFile('./static/iframe/iframe4ETtoday.html', { root: __dirname });
  });

  // iframe:holyshare
  server.get('/pages/iframe/iframe4holyshare.html', (req, res) => {
    res.sendFile('./static/iframe/iframe4holyshare.html', { root: __dirname });
  });

  // iframe:yahoo
  server.get('/pages/iframe/iframe4yahoo.html', (req, res) => {
    res.sendFile('./static/iframe/iframe4yahoo.html', { root: __dirname });
  });

  // google console search:sitemapindex_____sitemap.xml
  server.get('/sitemap.xml', (req, res) => {
    res.sendFile('./static/sitemap.xml', { root: __dirname });
  });

  function generateSitemapXml(req, res, url) {
    // console.log(url);
    request({
      headers: {'X-Ftcsys-Key': FTC_KEY},
      uri: url,
      method: 'GET'
    }, function (err, response, body) {
      let smOption = {
        hostname: getPotocal(req) + getConfig(req).host,
        cacheTime: 600000,
        urls: [host],
      };

      let movieList = JSON.parse(response.body).result;
      movieList.forEach(item => {
        // console.log(item.lastmod);
        if (item.lastmod) {
          item.lastmod = new Date(item.lastmod);
        } else {
          delete item.lastmod;
        }
        
        smOption.urls.push(item);
      });
      // console.log(smOption);

      let xml = sm.createSitemap(smOption).toString();
      // console.log(xml);
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  }

  // google console search:sitemap movieInfo_____sitemap1.xml
  server.get('/sitemap1.xml', (req, res) => {
    // console.log(req.headers);
    // console.log(getConfig(req).host);
    // console.log(getAPIDomain(req));
    generateSitemapXml(req, res, getAPIDomain(req) + sitemapUrlMovie);
  });

  // google console search:sitemap articlePage_____sitemap2.xml
  server.get('/sitemap2.xml', (req, res) => {
    generateSitemapXml(req, res, getAPIDomain(req) + sitemapUrlArticle);
  });

  // google console search:sitemap cinemaBooking_____sitemap3.xml
  server.get('/sitemap3.xml', (req, res) => {
    generateSitemapXml(req, res, getAPIDomain(req) + sitemapUrlCinema);
  });

  // bing search:sitemap
  server.get('/BingSiteAuth.xml', (req, res) => {
    res.sendFile('./static/BingSiteAuth.xml', { root: __dirname });
  });

  // FB search
  server.get('/q6k62bmkafeow7802xd4spzopztzaf.html', (req, res) => {
    res.sendFile('./static/q6k62bmkafeow7802xd4spzopztzaf.html', { root: __dirname });
  });

  server.get('/', (req, res) => {
    if (res.statusCode === 500) {
      res.statusCode = '';
    }
    return handle(req, res);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
  });
});

// route - 顯示目前的位置
// pathname - 要前往連結的位置
// query - 傳參數用,預設值{}
// asPath - 瀏覽器實際顯示的路徑但非實際連結位置
// push(url, as=url) - 執行呼叫
