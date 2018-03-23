import { chakram, faker, cookieParser } from '../common';

var name = faker.name.findName()
var email = faker.internet.email()
var password = 'Password@1234'
var organizationName = faker.company.companyName()

var url = 'https://api.appcurator.com/'

describe('Orca Query Tests', function () {

  it('login + Should Login with correct credentials', function () {
    var response = chakram.post(url, {
      query: `
        mutation {
          login(input: {fields: {email: "abhi.das@mass.co", password: "ABHI@dp11", remember: true}})
        }
      `
    })
    return chakram.waitFor([
      expect(response).to.have.status(200),
      expect(response).to.have.json('data.login', true),
      expect(response).to.have.cookie('acid'),
      expect(response).to.have.cookie('acsi')
    ]).then(function (responsebody) {
      // [ 'name=whatever', 'other=foo' ]
      const cookies = (responsebody.response.headers['set-cookie'].map(v => v.split(';')[0])).join('; ');
      //console.log(cookies.join('; '))

      //let newCookies = cookies;

      return responsebody
    })

  })


  it('should get Account details of the loggedin User', function () {
    var options = {
      headers: {
        "cookie": "acid=s%3AeyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2Q0Q5RDY1MTczNDU2NTk2MkM0NzMxRTZFNTYyMjk1RTNGMUMxMjEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJSczJkWlJjMFZsbGl4SE1lYmxZaWxlUHh3U0UifQ.eyJuYmYiOjE1MjE3MjA0NTUsImV4cCI6MTUyMTcyNDA1NSwiaXNzIjoiaHR0cDovL2FiOGIxMmViYzFjMzIxMWU4YmU2ODAyYWIzMTQwNjE3LTEwMTUxNzYyODMuYXAtc291dGhlYXN0LTIuZWxiLmFtYXpvbmF3cy5jb20iLCJhdWQiOlsiaHR0cDovL2FiOGIxMmViYzFjMzIxMWU4YmU2ODAyYWIzMTQwNjE3LTEwMTUxNzYyODMuYXAtc291dGhlYXN0LTIuZWxiLmFtYXpvbmF3cy5jb20vcmVzb3VyY2VzIiwiYmFja2VuZF9zZXJ2aWNlIl0sImNsaWVudF9pZCI6ImZyb250ZW5kX3NlcnZpY2UiLCJzdWIiOiJjMTJjMzhlNC1kMTE4LTRmYmYtYjBhYy1iZDQ1N2IxM2M5NDciLCJhdXRoX3RpbWUiOjE1MjE3MjA0NTUsImlkcCI6ImxvY2FsIiwic2NvcGUiOlsiYmFja2VuZF9zZXJ2aWNlIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.C5t-aqNqebqFto51Ch0AULVxDgMPgCLGo6k_zO2SLHnnBvA8euZeQ6kqoBrl3N_Wn-cnCimbc_Llj3ROW2ukk0YznkISFpyR0Fnrs7uxbq8DeFwuqzK5fcTx2GeSE0wK7CX4WKLVdCJgc70QbVNzEVI420psnJL-Uf5kB_XLfQU6nZAuEelmldN_woXNdAFjT6D2mWE6lUZdIDbGuRfL9DlGQaasCUoTYxsdYWeebNyBqHtRSz0eKJ8-kqKJe3qhCH02a-iFwSYajkChbarpW8huqU4mrLB6rBeLSa9l_UNEEaqaxfpreTyKsDEOmhw3kCrKuVaSVstS6JGzB98z6aGMb1Ozc4oO9OBTrOeAiKsr4p5VBYo_bVIERsm9taAzpvFpq_cUuiOSod8pYSjE6uYKm4bX3n0iynwTPnUMtT0PeGC00kvBCSoUNZgjpu5-OMZTXG_FLRgYHv0QqyQJZFIk2MIZTjdehyz-FPUELHeTiP_ygWm9975duyk8_9M7cOi2uwsutf_KmrsrukuWhfBcj9tUqXstmOONyDraskBMxamHV_EvVEeEStfKIE3Kg8Qjgh_GcE0IUD8A8n-s6UohDmy2EdIRtPy9zo_LgChh8hyG1nzjRnzZJZ1k8xXiDSB-JuFdK_PuxyonmpLN28mC8EolQVjXcR5MtSSW20c.cG9uLFUseLLMXURmoPamt%2B2QWRZw1%2Bcjb1G0NtaXfhg; acsi=1"
        //"cookie": "acid=s%3AeyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2Q0Q5RDY1MTczNDU2NTk2MkM0NzMxRTZFNTYyMjk1RTNGMUMxMjEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJSczJkWlJjMFZsbGl4SE1lYmxZaWxlUHh3U0UifQ.eyJuYmYiOjE1MjE2ODY5NjIsImV4cCI6MTUyMTY5MDU2MiwiaXNzIjoiaHR0cDovL2FiOGIxMmViYzFjMzIxMWU4YmU2ODAyYWIzMTQwNjE3LTEwMTUxNzYyODMuYXAtc291dGhlYXN0LTIuZWxiLmFtYXpvbmF3cy5jb20iLCJhdWQiOlsiaHR0cDovL2FiOGIxMmViYzFjMzIxMWU4YmU2ODAyYWIzMTQwNjE3LTEwMTUxNzYyODMuYXAtc291dGhlYXN0LTIuZWxiLmFtYXpvbmF3cy5jb20vcmVzb3VyY2VzIiwiYmFja2VuZF9zZXJ2aWNlIl0sImNsaWVudF9pZCI6ImZyb250ZW5kX3NlcnZpY2UiLCJzdWIiOiJjMTJjMzhlNC1kMTE4LTRmYmYtYjBhYy1iZDQ1N2IxM2M5NDciLCJhdXRoX3RpbWUiOjE1MjE2ODY5NjIsImlkcCI6ImxvY2FsIiwic2NvcGUiOlsiYmFja2VuZF9zZXJ2aWNlIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.z5eJmyp3wMYoC9ublBXVnTpCAp7ue68DU7Ah_gi0S13ru1sm9kI7vJZP6FUVWT5YjWsFF9T9fgW3DeP5qet2QL5L80fCC2ZcnwIxo5iu3d28VxQ5RzEkzSin0wQV-OrLlBJgcaZoNcdC85WgAZYx0cqjymDI4M_e4AbyGu98zdOGDAKraq75mYczF3cVqyfFxVcgbqFLhbkAdsVeMVlJe-2Yo0Uh2rd3w9VUhL56-NKKTEZinKI9HvyZeI-8P5i35M0m0EZYuI8CAsu57ynn_Eqj19DFwNOJwbRgMxUNceNYxLXk2PArwE8lQP6FwzgLCIrS-5sx0kbdYJZsAJ4pkk24B0fcYEaB4AIayZTQcodtnPpeAgwUZc-Ks8vJMBrJgnbMAAjFk3BiRwYgv71ACw53iNVd31I5tzvPZQtLEf6ccD_xtX1x2jKZTl_Eiiawh3ihPCl5EN52GYsdUjHP8Vaj1uCFRnJG79sfz_qAcwctPSb7yQZA0WcKyjczJMKe6f_xhw7_pGTWj4mHwqpl183PguuBG1b14Aiq_SJVpJeG6LLphQAi5K_8ZUfTuOsngnAYAYD_fhbOSiNKJMo42-viOLGWIsDc797jk6SK-QYzDO6C-uf1g4P48rz9naIhGT_QOx-m-Mdfscd7m0VXmspdwxksc4S5u_n64kL_-Jo.Rf%2B9tBM%2B6%2FgnHFBotPE8SkM5i3gkn2%2B%2FJjgBl3H2EVY; intercom-lou-ma5oso3h=1; intercom-session-ma5oso3h=Vm10RDBHazh3L2FSTmlIWlUrNTFmM0YyNkV4MDBiYVdLbkUraVlJMmFPdWszNzJNZnBzbnplUlhvY3dDS1MzVy0tSWkyeHhRa0YrRVRJMjd2U08vUjZsdz09--7b21ed27b960d6d489a61f58df1d438bd3f3c44a; acsi=1; acid=s%3AeyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2Q0Q5RDY1MTczNDU2NTk2MkM0NzMxRTZFNTYyMjk1RTNGMUMxMjEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJSczJkWlJjMFZsbGl4SE1lYmxZaWxlUHh3U0UifQ.eyJuYmYiOjE1MjE2ODEzNzgsImV4cCI6MTUyMTY4NDk3OCwiaXNzIjoiaHR0cDovL2FiOGIxMmViYzFjMzIxMWU4YmU2ODAyYWIzMTQwNjE3LTEwMTUxNzYyODMuYXAtc291dGhlYXN0LTIuZWxiLmFtYXpvbmF3cy5jb20iLCJhdWQiOlsiaHR0cDovL2FiOGIxMmViYzFjMzIxMWU4YmU2ODAyYWIzMTQwNjE3LTEwMTUxNzYyODMuYXAtc291dGhlYXN0LTIuZWxiLmFtYXpvbmF3cy5jb20vcmVzb3VyY2VzIiwiYmFja2VuZF9zZXJ2aWNlIl0sImNsaWVudF9pZCI6ImZyb250ZW5kX3NlcnZpY2UiLCJzdWIiOiJjMTJjMzhlNC1kMTE4LTRmYmYtYjBhYy1iZDQ1N2IxM2M5NDciLCJhdXRoX3RpbWUiOjE1MjE2ODEzNzgsImlkcCI6ImxvY2FsIiwic2NvcGUiOlsiYmFja2VuZF9zZXJ2aWNlIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.ddzUwwDiZFkdIAlxwaY2ct7c0DQxfEAFsug8_Vz8aYcfUWwiVe65lZWvaqBUUE9Ubce9UnPWo8uSA9i4d0mvgrOPnY3nphLd_mfqA0E-s15IStowfw6UyWi9egfC63ElUYmiG12d9zrdetw7z-d-3uoREGpixK9NbCtolRW045VoKmFWEN3erC2PRWVKTQHQYy1fPyZR-BpaDVGMyq4UKMrk92nWAIGD4tziaWiTjpHxjmiVrTeXcIpIm8M41AlcK3io-8kQBXWXhSisV8PvGwXd2IVgXbso_QUNa0a5tG43H1DeulhwIeOtEStCCU3JMhrsEKXXyWhwfDMMazsonc76T3UES4D8G80tBMvyWk9T6vNYyDc4liMVqH1mCkggooUxILL_RfEUjwC04U9C6V6ZJ1inhndIKyPAaehh5zC9gqQJAJZxKvY_bIBKXCFvUBX40bUX_0FHBKaNqTlFOvvt18EEDJAeesYaRVG-3jUE6C4WwSG2QuUK2HmpTDO4nXS4O1LL6pJhtJZDI0MG83mX13NAIg_LfyPqGcIRcUmZJ6a_LueLqLkglxkgmPV8opANxMKX-cEZkTFWxmnwmvATSgl0pcBTO8GTRrym_lOr2XYzmw5mAA-NvDP3ouUdtHOjqKLH8X1fpg6vUkQI5uEDu5tkEwZqv3K2ksC4WaU.CXAIaTFZPU1oRx9GnQkYbUU77D3fKsTxqnRO7%2BO9OOs"
      }
    }

    let response = chakram.post(url, {
      query: `query{getAccount{id
                name
                email
                organizations {
                  id
                }
              }
            }
            `
    }, options).then(function (resBody) {
      // console.log('RESPONSE BODY :' + JSON.stringify(resBody.body))
      return resBody
    })
  })




  it('logout + Should return a proper Boolean value while Logging Out', function () {
    var request = chakram.post('https://api.appcurator.com/', {
      query: `
        mutation{logout}
      `
    })
    return chakram.waitFor([
      expect(request).to.have.status(200),
      expect(request).to.have.json('data.logout', true)
    ])
  })

})
