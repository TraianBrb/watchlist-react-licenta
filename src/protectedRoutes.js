import React from 'react';
import Watchlist from './components/watchlist/watchlist';
import Search from './components/search/search';

const protectedRoutes = [
	{
		name: 'watchlist',
		exact: true,
		path: '/watchlist',
		main: props => <Watchlist {...props} />,
		public: false,
	},
	{
		name: 'search',
		exact: true,
		path: '/search',
		main: props => <Search {...props} />,
		public: false,
	},
];

export default protectedRoutes;