import React from "react";

import TwoPanel from "components/TwoPanel";
import UnclaimedBallers from "components/UnclaimedBallers";

const Dashboard = () => {
  return (
    <TwoPanel>
      <UnclaimedBallers />
    </TwoPanel>
  )
}

export default Dashboard;