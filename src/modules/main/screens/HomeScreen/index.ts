import { connect } from '@app/store';
import { Screen } from './screen';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
