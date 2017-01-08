import { connect } from 'react-redux';
import ListControls from '../components/ListControls';
import { setSaveSelected } from '../actions';

const mapStateToProps = state => state.controls;
const mapDispatchToProps = dispatch => ({
  onClickSetSaveSelected: saveSelected => dispatch(setSaveSelected(saveSelected)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListControls);
