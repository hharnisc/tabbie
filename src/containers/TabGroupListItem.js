import { connect } from 'react-redux';
import TabGroupListItem from '../components/TabGroupListItem';
import {
  openTabGroup,
  removeTabGroup,
  hoverTabGroupOpen,
  unhoverTabGroupOpen,
 } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  openHovered: state.tabGroupList.openHoverStates[ownProps.tabGroupKey],
});

const mapDispatchToProps = dispatch => ({
  onRemoveClick: tabGroupKey => dispatch(removeTabGroup(tabGroupKey)),
  onOpenClick: tabs => openTabGroup(tabs),
  onOpenMouseEnter: tabGroupKey => dispatch(hoverTabGroupOpen(tabGroupKey)),
  onOpenMouseLeave: tabGroupKey => dispatch(unhoverTabGroupOpen(tabGroupKey)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabGroupListItem);
