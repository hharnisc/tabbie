import { connect } from 'react-redux';
import TabGroupDetailsItem from '../components/TabGroupDetailsItem';
import {
  removeTab,
} from '../actions';

const mapDispatchToProps = dispatch => ({
  // onRemoveClick: tabKey => dispatch(removeTab({ tabKey, sync: true })),
  onRemoveClick: tabKey => dispatch(removeTab({ tabKey })),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(TabGroupDetailsItem);
