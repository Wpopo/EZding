import React from 'react';
import HeadMeta from '../components/headMeta';
import Footer from '../components/common/footer';
import Navbar from '../components/common/navbar';
import MGMLanding from '../components/inviteFriends/mgmLanding';
import MGMLandingV2 from "../components/inviteFriends/mgmLandingV2"

class inviteFriends extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <HeadMeta inviteFriends={true} />
        <Navbar url={this.props.url} />
        <MGMLandingV2 />
        <Footer />
      </div>
    );
  }
}

export default inviteFriends;
