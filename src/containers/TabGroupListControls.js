import { connect } from 'react-redux';
import TabGroupListControls from '../components/TabGroupListControls';
import { syncSaveSelected } from '../actions';

const mapStateToProps = state => state.tabGroupListControls;
const mapDispatchToProps = dispatch => ({
  onClickSetSaveSelected: saveSelected => dispatch(syncSaveSelected(saveSelected)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabGroupListControls);
