import { connect } from 'react-redux';
import TabGroupListItem from '../components/TabGroupListItem';
import {
  openTabGroup,
  removeTabGroup,
} from '../actions';

const mapDispatchToProps = dispatch => ({
  onRemoveClick: tabGroupKey => dispatch(removeTabGroup({ tabGroupKey, sync: true })),
  onOpenClick: tabs => dispatch(openTabGroup(tabs)),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(TabGroupListItem);
