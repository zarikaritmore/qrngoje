import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { styled } from 'styled-components'
import Logo from '../assets/svgs/mtlg2.svg'
import Menu from '../assets/svgs/menu.svg'
import Back from '../assets/svgs/backSvg.svg'
import Image from 'next/image'

const HeaderWrapper = styled.div`
        top: -1px;
        z-index: -1;
        width: 100%;
    `
const ContentWrapper = styled.div`
        padding: 1rem 1.5rem;
        background-color: #f5f6f6;
        .cont {
            max-width: 1000px;
            margin: auto;
        }
    `
const LogoWrapper = styled.div`
        text-align: left;
            svg {
                width:66px;
                height: auto;
            }
    `
const SecondWrapper = styled.div`
        height: 85px;
        width: 100%;
        display: flex;
        align-items: center;
        margin: auto;
        max-width: 600px;
        padding-inline: 1rem;
    `
const Title = styled.div`
        font-family: 'HelveticaBold';
        font-size: 14px;
        color: #344854;
    `
const BlueBg = styled.div`
        height: 300px;
        background-color: #1c2b33;
        display: flex;
        align-items: center;
    `

function Background() {

    return (
        <>
            <HeaderWrapper>
                <ContentWrapper>

                    <Row className='align-items-center justify-content-between g-0 cont'>
                        <Col xs={9} md={'11'}>
                            <LogoWrapper>

                                <Logo />
                            </LogoWrapper>
                        </Col>
                        <Col xs={2} md={'auto'}>
                            <Image
                                alt=''
                                src={'/assets/images/person.webp'}
                                width={40}
                                height={40}
                            />
                        </Col>
                        <Col xs={1} md={'auto'}>
                            <Menu />
                        </Col>
                    </Row>
                </ContentWrapper>
                <SecondWrapper>
                    <Row className='w-100 g-0'>
                        <Col>
                            <Title>
                                Business Help Center
                            </Title>
                        </Col>
                        <Col xs={'6'} className='text-center'>

                            <Row className='gx-2 justify-content-center align-items-center'>
                                <Col xs={'auto'}>
                                    <Back />
                                </Col>
                                <Col xs={'auto'}>
                                    <Title>
                                        Get Support
                                    </Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </SecondWrapper>
                <BlueBg>
                    <div className='text-start px-4' style={{ color: '#fff', fontSize: '48px', maxWidth: '1000px', margin: 'auto', letterSpacing: '.5px', lineHeight: '58px' }}>
                        How to add a payment method in Meta Business Manager
                    </div>
                </BlueBg>
                <div className='pt-5 text-start px-4' style={{ maxWidth: '1000px', margin: 'auto' }}>
                    <div className='pb-4' style={{ fontSize: '18px', color: '#465a69' }}>
                        Add a payment method to your Meta Business Manager to enable payments on Facebook and manage all of your billing details in one place. You can also connect it to an ad account and use it as the primary payment method for your ads.
                    </div>
                    <div style={{ fontSize: '24px' }} className='pb-4'>
                        Before you begin
                    </div>
                    <div className='pb-5' style={{ fontSize: '18px', color: '#465a69' }}>
                        Only admins or finance editors can make changes to payment methods connected to a Business Manager. Learn more about roles for people in Business Manager.
                    </div>
                    <div style={{ fontSize: '24px' }} className='pb-4'>
                        How to add a payment method and accept payments in Business Manager
                    </div>
                    <div className='pb-4' style={{ fontSize: '18px', color: '#465a69' }}>
                        Steps to add a payment method in Business Manager:

                    </div>
                    <div className='pb-4' style={{ fontSize: '18px', color: '#465a69' }}>
                        1. Open Business settings.

                    </div>
                    <div className='pb-4' style={{ fontSize: '18px', color: '#465a69' }}>
                        2. Click <span className='text-dark fw-bold'>Payments.</span>

                    </div>
                    <div className='pb-4' style={{ fontSize: '18px', color: '#465a69' }}>
                        3. Click <span className='text-dark fw-bold'>+ Add.</span>
                    </div>
                    <div className='pb-4' style={{ fontSize: '18px', color: '#465a69' }}>

                        4. Enter your payment information.
                    </div>
                    <div className='pb-4' style={{ fontSize: '18px', color: '#465a69' }}>

                        5. Click <span className='text-dark fw-bold'>Continue</span>, then follow the instructions to add your payment method.
                    </div>

                </div>

            </HeaderWrapper >

        </>
    )
}

export default Background