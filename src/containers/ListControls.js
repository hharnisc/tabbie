import { connect } from 'react-redux';
import ListControls from '../components/ListControls';
import { syncSaveSelected } from '../actions';

const mapStateToProps = state => state.controls;
const mapDispatchToProps = dispatch => ({
  onClickSetSaveSelected: saveSelected => dispatch(syncSaveSelected(saveSelected)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListControls);
