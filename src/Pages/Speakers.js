import React from 'react'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import { graphql } from 'react-apollo'
import Flex from 'styled-flex-component'
import styled from 'styled-components'
import Header from './../Components/Header'
import Query from './../Components/Query'
import SPEAKERS from '../Queries/SPEAKERS'
import GET__SPEAKERS_SEARCH from '../Queries/GET__SPEAKERS_SEARCH'
import { Figure, Img, Caption, Name } from './../Components/Styling/Speaker'
import Nav from './../Components/Nav'
import Filter from '../Utils/search'
import { Helmet } from 'react-helmet'

const makeLink = name => `/speaker/${name.replace(/\s+/g, '-').toLowerCase()}`

const makeName = name => name.split(' ')

const Wrapper = styled(Flex)`
    @media (max-width: 685px) {
        justify-content: center;
    }
`

const Speakers = ({ data: { searchSpeakers } }) => (
    <Grid>
        <Helmet>
            <title>Awesome Talks - Speakers</title>
            <meta
                name="description"
                content="Amazing Tech Talks curated by the community ❤️"
            />
            <meta name="twitter:title" content="Awesome Talks - Speakers" />
            <meta
                name="twitter:description"
                content="Amazing Tech Talks curated by the community ❤️"
            />
            <meta
                name="twitter:image"
                content="https://file-iloqdynwox.now.sh/"
            />
            <meta name="twitter:image:alt" content="awesome talks" />
        </Helmet>{' '}
        <div role="banner">
            <Nav />
            <Header
                title="Speakers"
                query={GET__SPEAKERS_SEARCH}
                keyName="searchSpeakers"
            />
        </div>
        <Row>
            <Col xs={12}>
                <main>
                    <Query query={SPEAKERS}>
                        {({ data: { allSpeakerses }, client }) => {
                            return (
                                <Row>
                                    <Wrapper wrap="true" justifyStart full>
                                        {Filter(
                                            searchSpeakers,
                                            allSpeakerses
                                        ).map(
                                            s =>
                                                s._videosesMeta.count > 0 ? (
                                                    <Figure key={s.id}>
                                                        <Img
                                                            src={
                                                                (s.photo || {})
                                                                    .url
                                                            }
                                                            alt={s.name}
                                                        />
                                                        <Caption>
                                                            <Name>
                                                                {
                                                                    makeName(
                                                                        s.name
                                                                    )[0]
                                                                }{' '}
                                                                <span>
                                                                    {makeName(
                                                                        s.name
                                                                    )
                                                                        .slice(
                                                                            -1
                                                                        )
                                                                        .join(
                                                                            ' '
                                                                        )}
                                                                </span>
                                                            </Name>
                                                        </Caption>
                                                        <a
                                                            aria-label="go to spaker"
                                                            className="no-hover"
                                                            href={makeLink(
                                                                s.name
                                                            )}
                                                        />
                                                    </Figure>
                                                ) : null
                                        )}
                                    </Wrapper>
                                </Row>
                            )
                        }}
                    </Query>
                </main>
            </Col>
        </Row>
    </Grid>
)

export default graphql(GET__SPEAKERS_SEARCH)(Speakers)
