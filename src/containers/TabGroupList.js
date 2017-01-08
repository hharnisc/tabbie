import { connect } from 'react-redux';
import TabGroupList from '../components/TabGroupList';

const mapStateToProps = state => state.tabGroupList;

export default connect(
  mapStateToProps,
)(TabGroupList);
