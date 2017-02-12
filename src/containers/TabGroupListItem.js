import { connect } from 'react-redux';
import TabGroupListItem from '../components/TabGroupListItem';
import {
  openTabGroup,
  removeTabGroup,
  hoverTabGroupOpen,
  unhoverTabGroupOpen,
  hoverTabGroupRemove,
  unhoverTabGroupRemove,
 } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  openHovered: state.tabGroupList.openHoverStates[ownProps.tabGroupKey],
  removeHovered: state.tabGroupList.removeHoverStates[ownProps.tabGroupKey],
});

const mapDispatchToProps = dispatch => ({
  onRemoveClick: tabGroupKey => dispatch(removeTabGroup({ tabGroupKey, sync: true })),
  onOpenClick: tabs => dispatch(openTabGroup(tabs)),
  onOpenMouseEnter: tabGroupKey => dispatch(hoverTabGroupOpen(tabGroupKey)),
  onOpenMouseLeave: tabGroupKey => dispatch(unhoverTabGroupOpen(tabGroupKey)),
  onRemoveMouseEnter: tabGroupKey => dispatch(hoverTabGroupRemove(tabGroupKey)),
  onRemoveMouseLeave: tabGroupKey => dispatch(unhoverTabGroupRemove(tabGroupKey)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabGroupListItem);
