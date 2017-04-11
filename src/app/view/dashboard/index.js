import { connect } from 'react-redux';

import DashboardComponent from './dashboard';

const stateToProps = (state) => ({
  results: state.user.search.results,
  total: state.user.search.total,
  current: state.user.current,
});

const dispatchToProps = () => ({

});

const Dashboard = connect(stateToProps, dispatchToProps)(DashboardComponent);

export default Dashboard;
