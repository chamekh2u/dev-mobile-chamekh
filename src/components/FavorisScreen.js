import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { Divider, Layout, Text} from '@ui-kitten/components';
import ListTest from './List.component';
import {connect} from 'react-redux';
import {fakeItems} from '../helpers/fakeItems';




 const FavorisScreen = () => {
    

 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center'  }}>
        <Text category='h1'>Favoris</Text>
        <ListTest data={fakeItems} isFavorisList={true}/>

      </Layout>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
    return {
        favorisList: state.platFavoris
    }
}

export default connect(mapStateToProps)(FavorisScreen);