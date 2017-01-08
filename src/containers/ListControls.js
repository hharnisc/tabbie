import { connect } from 'react-redux';
import ListControls from '../components/ListControls';

const mapStateToProps = state => state.controls;

export default connect(mapStateToProps)(ListControls);
