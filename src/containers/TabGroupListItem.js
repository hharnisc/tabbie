import { connect } from 'react-redux';
import TabGroupListItem from '../components/TabGroupListItem';
import { openTabGroup } from '../actions';

const mapStateToProps = (state, ownProps) => ownProps;
const mapDispatchToProps = dispatch => ({
  onRemoveClick: () => console.log('remove'),
  onOpenClick: tabs => openTabGroup(tabs),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabGroupListItem);
