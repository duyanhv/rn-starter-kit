import React from 'react';
import { colors } from '../../../../core';
import { ResideMenu } from './components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Screen = (_props: Props): JSX.Element => {
	function renderMainViewChildren(): JSX.Element {
		return <></>;
	}

	return (
		<ResideMenu
			sideBarBackgroundColor={colors.lightBlack}
			mainViewBackGroundColor={colors.white}
			mainViewBackGroundStyle={'light'}
			sideBarChildren={renderMainViewChildren()}
			infoViewChildren={renderMainViewChildren()}
		>
			{renderMainViewChildren()}
		</ResideMenu>
	);
};
