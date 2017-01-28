import { connect } from 'react-redux';
import TabGroupListControls from '../components/TabGroupListControls';
import {
  syncSaveSelected,
  tabGroupNameChange,
  saveTabGroup,
} from '../actions';

const mapStateToProps = state => state.tabGroupListControls;
const mapDispatchToProps = dispatch => ({
  onClickSetSaveSelected: saveSelected => dispatch(syncSaveSelected(saveSelected)),
  onTabGroupNameChange: e => dispatch(tabGroupNameChange(e.target.value)),
  onSaveTabGroupClick: ({ tabGroupName, close, saveSelected }) =>
    dispatch(saveTabGroup({ tabGroupName, close, saveSelected })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabGroupListControls);
