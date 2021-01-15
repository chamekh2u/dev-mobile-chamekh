import React, { useEffect } from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
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





  const renderItemIcon = (props) => (
    <Icon {...props} name='person' />
  );

  const renderItem = ({ item, index }) => {
    //if (isFavorisList) {
      if (!isFavorisList || (isFavorisList &&favorisList.findIndex(i => (i === item.id)) !== -1))
        return (
          <ListItem
            title={`${item.title} ${item.id}`}
            description={`${item.description} ${item.id}`}
            accessoryLeft={renderItemIcon}
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
    favorisList: state.platFavoris
  }
}

export default connect(mapStateToProps)(ListTest);