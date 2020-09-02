import React, { useState } from 'react';
import { MemberRight } from '../../styled/memberLoginStyled';
import IsLogin from '../../components/memberLogin/isLogin';
import IsPassword from '../../components/memberLogin/isPassword';
import IsRegister from '../../components/memberLogin/isRegister';

function MemberLoginRight(props) {
  const [newMemberWithMGMcode, setNewMemberWithMGMcode] = useState(false);
  return (
    <MemberRight>
      {/* ezding圖示 */}
      <div>
        <div className="wraperLogo">
          <img src="../static/common/ezDinglogo.png" alt="" />
        </div>
      </div>
      <IsLogin setNewMemberWithMGMcode={setNewMemberWithMGMcode} />
      <IsRegister />
      <IsPassword handleClickOpen={props.handleClickOpen} newMemberWithMGMcode={newMemberWithMGMcode} />
    </MemberRight>
  );
}

export default MemberLoginRight;
