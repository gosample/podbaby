import React, { PropTypes } from 'react';
import { bindActionCreators } from 'react';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';

import {
  Grid,
  Row,
  Col,
  Glyphicon,
  ButtonGroup,
  Button,
  Well
} from 'react-bootstrap';

import { latest, player } from '../actions';

const sanitizeOptions = {
  allowedTags: ['a', 'code'],
  allowedAttributes: {
    'a': ['href']
  }
};

const sanitize = dirty => {
  return {
    __html: sanitizeHtml(dirty, sanitizeOptions)
  }
};

const ListItem = props => {
  const { podcast, createHref, isCurrentlyPlaying, setCurrentlyPlaying } = props;
  const url = createHref("/podcasts/channel/" + podcast.channelId + "/")
  // tbd get audio ref, set played at to last time
  return (
    <div>
      <div className="media">
        <div className="media-left media-middle">
          <a href={url}>
            <img className="media-object"
                 height={60}
                 width={60}
                 src={podcast.image}
                 alt={podcast.name} />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading"><a href={url}>{podcast.name}</a></h4>
          <Grid>
            <Row>
              <Col xs={6} md={9}>
                <h5>{podcast.title}</h5>
              </Col>
              <Col xs={6} md={3}>
                <ButtonGroup>
                  <Button><Glyphicon glyph="play" onClick={setCurrentlyPlaying} /></Button>
                  <a className="btn btn-default" href={podcast.enclosureUrl}><Glyphicon glyph="download" /></a>
                  <Button><Glyphicon glyph="pushpin" /></Button>
                  <Button><Glyphicon glyph="ok" /></Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
      <Well dangerouslySetInnerHTML={sanitize(podcast.description)} />
    </div>
  );
};


export class PodcastList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(latest.getLatestPodcasts());
  }

  render() {
    const { dispatch } = this.props;
    const { createHref } = this.props.history;
    return (
      <div>
        {this.props.podcasts.map(podcast => {
          const setCurrentlyPlaying = () => {
            dispatch(player.setPodcast(podcast));
          }
          const isCurrentlyPlaying = this.props.player.podcast && podcast.id === this.props.player.podcast.id;
          return <ListItem key={podcast.id}
                           podcast={podcast}
                           isCurrentlyPlaying={isCurrentlyPlaying}
                           setCurrentlyPlaying={setCurrentlyPlaying}
                           createHref={createHref} />;
        })}
      </div>
    );
  }
}

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired,
  currentlyPlaying: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    podcasts: state.latest,
    player: state.player
  };
};

export default connect(mapStateToProps)(PodcastList);