import React from 'react';
import HeadMeta from '../components/headMeta';
import Footer from '../components/common/footer';
import Navbar from '../components/common/navbar';
import MGMLanding2 from '../components/inviteFriends/mgmLanding2';

class InviteFromFriend extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.url.query.ref_id && localStorage.setItem('MGM_Code', this.props.url.query.ref_id);
  }
  render() {
    return (
      <div>
        <HeadMeta inviteFromFriend={true} />
        <Navbar url={this.props.url} />
        <MGMLanding2 />
        <Footer />
      </div>
    );
  }
}

export default InviteFromFriend;
