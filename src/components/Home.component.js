import React from 'react';
import { View, TouchableWithoutFeedback  } from 'react-native';
import { Button, Divider, Layout, Input, Icon } from '@ui-kitten/components';
import ListTest from './List.component';
import { fakeItems } from '../helpers/fakeItems';
import { useState } from 'react/cjs/react.development';
import page1 from '../helpers/PopularMovies_page1';

/* const data = new Array(8).fill({

    title: 'Title for Item',
    description: 'Description for Item',
  }); */


export const HomeScreen = ({ navigation }) => {

//console.log(page1);
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState(page1);

  const navigateDetails = () => {
    const test = "test Route param"
    navigation.navigate('Details', { test });
  };

  const displayPage1 = () => {
    console.log(movies);
  }
  const renderIconSearch = (props) => (
    <TouchableWithoutFeedback onPress={displayPage1}>
      <Icon {...props} name='search'/>
    </TouchableWithoutFeedback>
  );

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
        <ListTest style={{ flex: 1, marginTop: 30 }} data={movies}/*  isFavorisList={false} */ />
      </Layout>
    </View>
  );
};