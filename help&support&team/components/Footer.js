import React from 'react'
import  Mta from '../assets/images/mta.svg'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: #407FFE;
    margin-top: 70px;
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;
    color: #fff;
    p {
        margin-bottom: 10px;
    }
    .fontbold {
        font-weight: bold;
    }
    .row p {
        font-size: 14px;
    }
`
function Footer() {
    return (
        <Wrapper className="footer" id="futeri">
            <div className="container">
                <Mta width={100} />
                <p className='py-4'>Facebook can help your large, medium or small business grow. Get the latest news for advertisers and more on our <span>Meta for Business Page.</span></p>

                <div className="row text-start">
                    <div className="col-lg col-6">

                        <p className="fontbold">Marketing on Facebook</p>
                        <p>Success Stories</p><p>Measurement</p>
                        <p>Industries</p><p>Inspiration</p>
                        <p>Events</p><p>News</p><p>Site map</p>

                    </div>
                    <div className="col-lg col-6">

                        <p className="fontbold">Marketing objectives</p>
                        <p>Build your presence</p><p>Create awareness</p><p>Drive discovery</p><p>Generate leads</p><p>Boost sales</p><p>Earn loyalty</p>

                    </div>
                    <div className="col-lg col-6">

                        <p className="fontbold">Facebook Pages</p><p>Get started with Pages</p><p>Setting up your Page</p><p>Manage your Facebook Page</p><p>Promote your Page</p><p>Messaging on your Page</p><p>Page Insights</p>

                    </div>
                    <div variant="dontshowonmobile col-lg" className="col">

                        <p className="fontbold">Facebook ads</p><p>Get started with ads</p><p>Buying Facebook ads</p><p>Ad formats</p><p>Ad placement</p><p>Choose your audience</p><p>Measure your ads</p><p>Managing your ads</p>

                    </div>
                    <div className="col-lg col-6">

                        <p className="fontbold">Resources</p><p>Ads Guide</p><p>Business Help Centre</p><p>Meta Audience Network</p><p>Meta Blueprint</p><p>Meta for Developers</p><p>Meta Business Partners</p><p>Instagram Business</p><p>Support</p>

                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Footer