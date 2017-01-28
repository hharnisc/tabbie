import { connect } from 'react-redux';
import TabGroupListItem from '../components/TabGroupListItem';
import {
  openTabGroup,
  removeTabGroup,
 } from '../actions';

const mapStateToProps = (state, ownProps) => ownProps;
const mapDispatchToProps = dispatch => ({
  onRemoveClick: tabGroupKey => dispatch(removeTabGroup(tabGroupKey)),
  onOpenClick: tabs => openTabGroup(tabs),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabGroupListItem);
