import { connect } from 'react-redux';
import TabGroupDetailsView from '../components/TabGroupDetailsView';

const mapStateToProps = (state, ownProps) => ({
  tabGroup: state.tabGroupList.tabGroups[ownProps.params.tabGroupKey],
  tabGroupKey: parseInt(ownProps.params.tabGroupKey, 10),
});

export default connect(
  mapStateToProps,
)(TabGroupDetailsView);
