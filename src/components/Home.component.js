import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Button, Divider, Layout, Input, Icon, List, ListItem, Avatar } from '@ui-kitten/components';
import ListTest from './List.component';
import { fakeItems } from '../helpers/fakeItems';
import { useState } from 'react/cjs/react.development';
import ppage1 from '../helpers/PopularMovies_page1';
import ppage2 from '../helpers/PopularMovies_page2';

/* const data = new Array(8).fill({

    title: 'Title for Item',
    description: 'Description for Item',
  }); */


export const HomeScreen = ({ navigation }) => {

  const getPopularMovies1 = ppage1;
  const getPopularMovies2 = ppage2;

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState(getPopularMovies1);
  const [isEnd, setIsEnd] = useState(false);

  const navigateDetails = () => {
    const test = "test Route param"
    navigation.navigate('Details', { test });
  };

  const displayPage1 = () => {
  
  }
  const renderIconSearch = (props) => (
    <TouchableWithoutFeedback onPress={displayPage1}>
      <Icon {...props} name='search' />
    </TouchableWithoutFeedback>
  );
  const renderImage = (path) => {
    return (
      <Avatar


        source={{ uri: 'https://image.tmdb.org/t/p/w500' + path }}
      />
    );

  }

  const renderItem = ({ item, index }) => {
    //if (isFavorisList) {
    //  if (!isFavorisList || (isFavorisList &&favorisList.findIndex(i => (i === item.id)) !== -1))
    return (
      <ListItem
        title={`${item.original_title} ${item.release_date}`}
        description={`${item.overview}`.substring(0, 100) + '...'}
        number
        accessoryLeft={() => renderImage(item.poster_path)}
        accessoryRight={() => renderItemAccessory(item.id)}
      />
    );
    }

    /* const updateFavoris = (id) => {
      let action;
      action = favorisList.findIndex(i => (i === id)) !== -1 ? { type: 'REMOVE', value: id } : { type: 'ADD', value: id }
      dispatch(action);
  
    } */
    const renderItemAccessory = (id) => (
  
      <Button size='tiny' /*onPress={ () => updateFavoris(id) }*/>{/* favorisList.findIndex(i => (i === id)) !== -1 ? "remove from favoris" : "add to favoris" */}</Button>
    );
    const _loadMoreMovies = () => {
      console.log(...getPopularMovies2)
      if(!isEnd){
        setMovies([...movies, ...getPopularMovies2 ]);
        setIsEnd(true);
      }
      
    }

  return (
    <View style={{ flex: 1 }}>

      <Divider />
      <Layout style={{ flex: 1, marginTop: 30 }}>
        <Input
          placeholder='Search'
          value={search}
          onChangeText={nextValue => setSearch(nextValue)}
          accessoryRight={renderIconSearch}

        />
        <Button onPress={navigateDetails}>OPEN DETAILs</Button>
         <List
          style={{ flex: 1, marginTop: 30 }}
          data={movies}
          renderItem={renderItem}
          onEndReached={ _loadMoreMovies }
          onEndReachedThreshold={ 0.5 }
        />
      </Layout>
    </View>
  );
};