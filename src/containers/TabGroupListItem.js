import { connect } from 'react-redux';
import TabGroupListItem from '../components/TabGroupListItem';

const mapStateToProps = (state, ownProps) => ownProps;
const mapDispatchToProps = dispatch => ({
  onRemoveClick: () => console.log('remove'),
  onOpenClick: () => console.log('open'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabGroupListItem);
