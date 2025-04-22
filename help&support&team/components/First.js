import React from 'react'
import styled from 'styled-components'
import Mta from '../assets/images/mtaTransparent.webp'


const Wrapper = styled.div`
    border: 1px solid #bdbdbd;
    border-radius: 0.5rem;
    max-width: 400px;
    width: calc(100% - 2rem);
    margin: auto;
    background-color: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 1rem;
    text-align: center;
    img {
        max-width: 70px;
        border-radius: 0.5rem;
        height: auto;
    }
`

const CenterDiv = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100%;
`

const TitleSpan = styled.div`
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -.05em;
    color: #4f4f4f;
`
const ContinueBtn = styled.button`
    background-color:#f2f2f2;
    text-align: center;
    color:#000;
    padding-block: 0.5rem;
    border-radius: 5px;
    border: none;
    width: 100%;
`

function First({ setStep }) {
    return (
        <CenterDiv >

            <Wrapper>
                <img src={Mta} alt="" />
                <div className="pb-4">
                    <TitleSpan>
                        M‎e‎t‎a B‎u‎s‎i‎n‎e‎ss H‎e‎l‎p C‎e‎n‎t‎er
                    </TitleSpan>
                </div>
                <ContinueBtn onClick={() => { setStep(0) }}>
                    C‎o‎n‎t‎i‎n‎u‎e
                </ContinueBtn>
            </Wrapper>
        </CenterDiv>
    )
}

export default First