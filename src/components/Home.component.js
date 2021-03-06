import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Button, Divider, Layout, Input, Icon, List, ListItem, Avatar } from '@ui-kitten/components';
import ListTest from './List.component';
import { fakeItems } from '../helpers/fakeItems';
import { useState } from 'react/cjs/react.development';
import ppage1 from '../helpers/PopularMovies_page1';
import ppage2 from '../helpers/PopularMovies_page2';
import spage1 from '../helpers/SearchMovies_page1';
import spage2 from '../helpers/SearchMovies_page2';
import {connect} from 'react-redux';

/* const data = new Array(8).fill({

    title: 'Title for Item',
    description: 'Description for Item',
  }); */


 const HomeScreen = ({ navigation, favorisList, dispatch }) => {

  const getPopularMovies1 = ppage1;
  const getPopularMovies2 = ppage2;
  const getSearchMovies1 = spage1;
  const getSearchMovies2 = spage2;

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState(getPopularMovies1);
  const [isEnd, setIsEnd] = useState(false);
  const [isSearch, setIsSearch] = useState(false);


  const navigateDetails = (id) => {
    const test = "test Route param"
    navigation.navigate('Details', { id });
  };

  const searchMovies = () => {
    if (search !== '') {
      setIsSearch(true);
      setMovies([...getSearchMovies1]);
      setIsEnd(false);
    }


  }

  const cancelSearch = () => {
    setIsSearch(false);
    setSearch('');
    setIsEnd(false);
    setMovies(getPopularMovies1);
  }
  const renderIconSearch = (props) => (
    <TouchableWithoutFeedback onPress={searchMovies}>
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
        accessoryLeft={() => renderImage(item.poster_path)}
        accessoryRight={() => renderItemAccessory(item.id)}
      />
    );
  }

   const updateFavoris = (id) => {
    let action;
    action = favorisList.findIndex(i => (i === id)) !== -1 ? { type: 'REMOVE', value: id } : { type: 'ADD', value: id }
    dispatch(action);
 
  } 

  

  
  const renderItemAccessory = (id) => (
    <View>
    <Button size='tiny' onPress={ () => navigateDetails(id) }  >Details</Button>
    <Button size='tiny' onPress={()=> updateFavoris(id)} >{(favorisList.findIndex(i => (i === id)) !== -1) ? 'déja vu': 'Pas vu'}</Button>
    </View>
  );
  const _loadMoreMovies = () => {
    console.log(...getPopularMovies2)
    if (!isEnd) {
      if (!isSearch)
        setMovies([...movies, ...getPopularMovies2]);
      else
        setMovies([...movies, ...getSearchMovies2]);

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
        <Button onPress={cancelSearch}>Annuler la recherche</Button>
        <List
          style={{ flex: 1, marginTop: 30 }}
          data={movies}
          renderItem={renderItem}
          onEndReached={_loadMoreMovies}
          onEndReachedThreshold={0.5}

        />
      </Layout>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
      favorisList: state.filmFavoris
  }
}

export default connect(mapStateToProps)(HomeScreen);