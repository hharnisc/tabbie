import { connect } from 'react-redux';
import TabGroupListControls from '../components/TabGroupListControls';
import {
  syncSaveSelected,
  tabGroupNameChange,
} from '../actions';

const mapStateToProps = state => state.tabGroupListControls;
const mapDispatchToProps = dispatch => ({
  onClickSetSaveSelected: saveSelected => dispatch(syncSaveSelected(saveSelected)),
  onTabGroupNameChange: e => dispatch(tabGroupNameChange(e.target.value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabGroupListControls);
