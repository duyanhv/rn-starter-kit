/* eslint-disable global-require */

export const imageSources = {
	appIcon: () => require('./images/app_icon.png'),
	appIconRound: () => require('./images/app_icon_round.png'),
	appIconNoAlpha: () => require('./images/app_icon_no_alpha.png'),
	testCoverImage: () => require('./images/test/test-cover-image-2.jpg'),
	foods: [
		{
			source: () => require('./images/foods/pizza.png'),
			title: 'Pizza',
			id: 1,
		},
		{
			source: () => require('./images/foods/boba-tea.png'),
			title: 'Pizza',
			id: 2,
		},
		{
			source: () => require('./images/foods/coffee.png'),
			title: 'Pizza',
			id: 3,
		},
		{
			source: () => require('./images/foods/hamburger.png'),
			title: 'Pizza',
			id: 4,
		},
		{
			source: () => require('./images/foods/ice-scream.png'),
			title: 'Pizza',
			id: 5,
		},
		{
			source: () => require('./images/foods/kfc.png'),
			title: 'Pizza',
			id: 6,
		},
		{
			source: () => require('./images/foods/sashimi.png'),
			title: 'Pizza',
			id: 7,
		},
	],
};

export interface CountryCode {
	name: string;
	dialCode: string;
	code: string;
}

export interface PrimaryColor {
	code: string;
	darkColor: string;
	lightColor: string;
}

export const jsonSources = {
	countries: () => require('./json/country_code.json') as CountryCode[],
	primaryColors: () => require('./json/primary_colors.json') as PrimaryColor[],
	loading: () => require('./json/loading.json'),
	guides: () => require('./json/guide.json'),
	testData: {
		distribution: () => require('./json/test_data_distributions.json') as TestDataDistributions,
	},
};
export const lottie = {
	guide: {
		first: () => require('./lottie/guide/guide_1'),
		second: () => require('./lottie/guide/guide_2'),
		third: () => require('./lottie/guide/guide_3'),
	},
	checkMarkSuccess: () => require('./lottie/check-mark-success.json'),
};

export interface Guide {
	title: string;
	description: string;
	image: string;
}

export const guideImages = [lottie.guide.first(), lottie.guide.second(), lottie.guide.third()];

export interface Query {
	searchUrl: string;
	totalResult: number;
	totalSubItems: number;
}
export interface Distribution {
	Address: string;
	District: string;
	City: string;
	Phone: number;
	Promotions: [];
	Cuisines: {
		Id: number;
		Name: string;
		NameEn: string;
		ASCIIName: string;
		DetailUrl: string;
	}[];
	SpecialDesc: string;
	TotalReview: number;
	TotalView: number;
	TotalFavourite: number;
	TotalCheckins: number;
	AvgRating: string;
	AvgRatingOriginal: number;
	ReviewUrl: string;
	AlbumUrl: string;
	Latitude: number;
	Longitude: number;
	MainCategoryId: number;
	PictureCount: number;
	Status: number;
	IconUrl: string;
	FriendAction: { TotalCount: number; FriendActions: [] };
	HasAlredyAddedToList: boolean;
	AdsProviders: [];
	DistrictId: number;
	DistrictUrl: string;
	CategoryGroupKey: string;
	Distance: number;
	HasBooking: boolean;
	HasDelivery: boolean;
	BookingUrl: string;
	DeliveryUrl: string;
	BranchUrl: string;
	BranchName: string;
	BankCards: [];
	Location: string;
	TotalReviewsFormat: string;
	TotalPictures: number;
	TotalPicturesFormat: string;
	TotalSaves: number;
	Reviews: {
		Id: number;
		RestaurantID: number;
		RestaurantStatus: number;
		UserID: number;
		Title: string;
		Comment: string;
		Guest: number;
		MoneySpend: number;
		VisitAgain: number;
		GuestId: number;
		MoneySpendId: number;
		VisitAgainId: number;
		SelectMenu: string;
		CreatedOn: string;
		AvgRating: number;
		OwnerUserName: string;
		OwnerFirstName: string;
		OwnerLastName: string;
		OwnerFullName: string;
		OwnerAvatar: string;
		OwnerGender: string;
		OwnerIsVerified: boolean;
		OwnerTrustPercent: number;
		OwnerTotalPictures: number;
		OwnerTotalReviews: number;
		TotalPictures: number;
		PostedByDevice: string;
		ReviewType: number;
		YoutubeCode: string;
		Pictures: number;
		Comments: number;
		TotalComments: number;
		TotalHelpfuls: number;
		TotalLikes: number;
		HasLiked: false;
		TotalDislikes: number;
		HasDisliked: boolean;
		VerifyingPercent: number;
		UserLevel: number;
		PointRank: number;
		Hashtags: string;
		Banners: string;
		ResUrlRewriteName: string;
		ResLocation: string;
		TranslateSource: string;
		IsOld: boolean;
		ViaSocialType: number;
		IsAllowComment: boolean;
		DisplayType: number;
		IsLatestCurrentUserReview: boolean;
		CreateOnTimeDiff: string;
		UserLiekeds: string;
		IsOwner: boolean;
		TotalViews: number;
		Video: string;
		IsActive: boolean;
		OwnerProfileUrl: string;
		OwnerDisplayName: string;
		ShortReview: boolean;
		Url: string;
	}[];
	ReviewsTest: string;
	IsOpening: boolean;
	HasVideo: boolean;
	MasterCategoryId: number;
	Services: {
		Id: number;
		Type: number;
		Url: string;
		Title: string;
		Text: string;
		Avatar: string;
		BackgroundColor: string;
		RestaurantId: number;
		Description: string;
	}[];
	Floor: {
		Id: number;
		Code: number;
		Name: string;
		NameEn: string;
		Avatar: string;
		Color: string;
		Description: string;
		DescriptionEn: string;
	};
	Categories: {
		Id: number;
		Name: string;
		NameEn: string;
		ASCIIName: string;
		DetailUrl: string;
	}[];
	BookingMobileUrl: string;
	PromotionPlainTitle: string;
	Id: number;
	Name: string;
	UrlRewriteName: string;
	PicturePath: string;
	PicturePathLarge: string;
	MobilePicturePath: string;
	DetailUrl: string;
	DocumentType: number;
	ShowInSearchResult: boolean;
	IsAd: boolean;
	SubItems: [];
}
export interface TestDataDistributions extends Query {
	data: Distribution[];
}

/* eslint-enable global-require */
