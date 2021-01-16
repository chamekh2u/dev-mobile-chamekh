import React, { useEffect } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { Divider, Layout, Text, List, ListItem, Avatar} from '@ui-kitten/components';
import ListTest from './List.component';
import {connect} from 'react-redux';
import {fakeItems} from '../helpers/fakeItems';
import allMovies from '../helpers/AllMovies';
import { useState } from 'react/cjs/react.development';



 const FavorisScreen = ({favorisList, dispatch, navigation}) => {
    
const [movies, setMovies] = useState([]);

  useEffect(() => {
    updateWatchedList();
  }, [favorisList])

 const updateWatchedList = () => {
    const res = allMovies.filter(m => favorisList.includes(m.id))
    setMovies(res);
 }

 const navigateDetails = (id) => {
  const test = "test Route param"
  navigation.navigate('Details', { id });
};
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
  <Button size='tiny' onPress={ () => navigateDetails(id) }  title="Details"></Button>
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
    <SafeAreaView style={{ flex: 1 }}>
      <Divider/>
      <Layout style={{ flex: 1, marginTop: 30 }}>
        <Text category='h1'>Watched</Text>
        <List
          style={{ flex: 1, marginTop: 30 }}
          data={movies}
          renderItem={renderItem}
        />

      </Layout>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
    return {
        favorisList: state.filmFavoris
    }
}

export default connect(mapStateToProps)(FavorisScreen);