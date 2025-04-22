import React from 'react'
import styled from 'styled-components'
import Form from './Form'

// const BackgroundImg = styled.div`
//     background: url('/assets/images/30175859_1847141705586364_4634876909090504704_n.1a04d13ed075a5eb588b.jpg');
//     background-size: cover;
//     background-position: center;
//     height: 200px;
//     margin-top: 54px;
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     margin-bottom: 55px;
// `

// const SmallTxt = styled.div`
//     color: white;
//     font-size: 14px;
//     padding-bottom: 0rem;
// `

function Step1({ setStep }) {


    
    return (
        <>
            {/* <BackgroundImg>
                <SmallTxt>
                    M‎e‎t‎a B‎us‎i‎n‎ess H‎e‎lp Ce‎n‎t‎e‎r
                </SmallTxt>
                <BigTxt>
                    G‎e‎t S‎u‎p‎p‎o‎r‎t
                </BigTxt>
            </BackgroundImg> */}
            <Form setStep={setStep} />
        </>
    )
}

export default Step1