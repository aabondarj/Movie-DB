import React, {useEffect} from 'react';
import { Tabs } from 'antd';
import SearchTab from '../search-tab';
import RatedTab from '../rated-tab';
import './app.css'
import MovieSearchService from '../service/movie-search';
import { RatedMoviesProvider } from '../service/rated-movies-context';

const { TabPane } = Tabs;

const App: React.FC = () => {
  useEffect(() => {
    const movieSearchService = new MovieSearchService('b312fd85ec2e234e12bf06a786ff0ffe');
    movieSearchService.createGuestSession();
  }, []);

  return (
    <RatedMoviesProvider>
      <div style={{ padding: '20px' }}>
        {/* <h1>Movie Search App</h1> */}
        <Tabs defaultActiveKey="1">
          <TabPane tab="Search" key="1">
            <SearchTab />
          </TabPane>
          <TabPane tab="Rated" key="2">
            <RatedTab />
          </TabPane>
        </Tabs>
      </div>
    </RatedMoviesProvider>
  );
};

export default App;
