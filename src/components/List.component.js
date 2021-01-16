import React, { useEffect } from 'react';
import { Button, Icon, List, ListItem, Avatar } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const ListTest = ({ data, isFavorisList, dispatch, favorisList }) => {

  useEffect(() => {
    console.log("useEffect")
  }, [favorisList])

  const updateFavoris = (id) => {
    let action;
    action = favorisList.findIndex(i => (i === id)) !== -1 ? { type: 'REMOVE', value: id } : { type: 'ADD', value: id }
    dispatch(action);

  }
  const renderItemAccessory = (id) => (

    <Button size='tiny' onPress={() => updateFavoris(id)}>{favorisList.findIndex(i => (i === id)) !== -1 ? "remove from favoris" : "add to favoris"}</Button>
  );





  const renderImage = (path) => {
    console.log('https://image.tmdb.org/t/p/w50' + path)
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
    // }


  }

  return (
    <List
      style={styles.container}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 192,
  },
});

const mapStateToProps = (state) => {
  return {
    favorisList: state.filmFavoris
  }
}

export default connect(mapStateToProps)(ListTest);