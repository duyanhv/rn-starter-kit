import { ScreenProps, sleep, getStatusHeight } from '@app/core';
import { useEffectOnce } from '@app/hooks';
// import { navigationService } from '@app/services';
import { ScrollView, Container, Text, Button } from '@app/components';
import React from 'react';

import * as Sentry from '@sentry/react-native';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { mapStateToProps } from './map_state_to_props';
import { RematchSample } from './components/RematchSample';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({
	componentId,
	sharks,
	dolphins,
	incrementShark,
	incrementDolphin,
}: // shouldShownUpdateWarning,
// updateShownUpdateWarning,
Props): JSX.Element => {
	useEffectOnce(() => {
		// if (shouldShownUpdateWarning) {
		// 	appService.checkNeedUpdateNewBinaryVersion();
		// 	updateShownUpdateWarning(false);
		// }
	});
	//   const pushNewScreen = (): void => {
	//     navigationService.navigateTo({
	//       componentId,
	//       screenName: screenNames.NewScreen,
	//     });
	//   };

	//   const changeTab = (): void => {
	//     navigationService.changeTab({
	//       componentId,
	//       tabIndex: 1,
	//     });
	//   };

	const incrementSharkAsync = async (): Promise<void> => {
		await sleep(500);
		incrementShark(1);
	};

	const incrementDolphinAsync = async (): Promise<void> => {
		await sleep(500);
		incrementDolphin(1);
	};

	const incrementShark1 = (): void => {
		incrementShark(1);
	};

	const incrementDolphin1 = (): void => {
		incrementDolphin(1);
	};

	return (
		<Container componentId={componentId}>
			<ScrollView
				style={{
					marginTop: -getStatusHeight(),
					paddingTop: getStatusHeight(),
				}}
			>
				<Text
					h1={true}
					style={{
						margin: 15,
					}}
				>
					Main
				</Text>
				<RematchSample
					sharks={sharks}
					dolphins={dolphins}
					incrementShark={incrementShark1}
					incrementSharkAsync={incrementSharkAsync}
					incrementDolphin={incrementDolphin1}
					incrementDolphinAsync={incrementDolphinAsync}
				/>

				<Button
					style={{
						margin: 15,
					}}
					onPress={() => Sentry.nativeCrash()}
				>
					<Text>Crash Simulation</Text>
				</Button>
			</ScrollView>
		</Container>
	);
};
