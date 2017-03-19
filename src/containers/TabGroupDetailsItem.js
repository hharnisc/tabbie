import { connect } from 'react-redux';
import TabGroupDetailsItem from '../components/TabGroupDetailsItem';
// import {
//   removeTab,
// } from '../actions';

const mapDispatchToProps = dispatch => ({
  onRemoveClick: tabDetailKey => console.log('tabDetailKey', tabDetailKey),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(TabGroupDetailsItem);
