import { connect } from 'react-redux';
import TabGroupDetailsItem from '../components/TabGroupDetailsItem';
import {
  removeTab,
} from '../actions';

const mapDispatchToProps = dispatch => ({
  onRemoveClick: ({ tabKey, tabGroupKey }) => dispatch(removeTab({ tabKey, tabGroupKey })),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(TabGroupDetailsItem);
