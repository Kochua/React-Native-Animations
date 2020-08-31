import * as React from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native'
import axios from 'axios'

const ListScreen = () => {
  const [loading, setLoading] = React.useState(false)
  const [reqOptions, setReqOptions] = React.useState({
    page: 1,
    limit: 6,
  })
  const [postData, setPostData] = React.useState([])

  React.useEffect(() => {
    const { page, limit } = reqOptions
    let config = {
      headers: {
        'app-id': 'yobm5irJzNIknGCK3YjS',
      },
    }
    setLoading(true)
    axios
      .get(
        `https://dummyapi.io/data/api/post?limit=${limit}&page=${page}`,
        config
      )
      .then((res) => {
        const data = res.data.data
        setPostData(data)
        setLoading(false)
      })
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          height: 150,
          width: '100%',
          marginBottom: 10,
          backgroundColor: '#fff',
          padding: 15,
          flexDirection: 'row',
        }}
      >
        <Image
          source={{ uri: item.owner.picture }}
          style={{ height: '100%', width: 100, borderRadius: 4 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={{ marginBottom: 5 }}>{item.id}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 4,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 12, color: '#999' }}>First Name: </Text>
            <Text style={{ fontSize: 15 }}>{item.owner.firstName}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 4,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 12, color: '#999' }}>Last Name: </Text>
            <Text style={{ fontSize: 15 }}>{item.owner.lastName}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 4,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 12, color: '#999' }}>Email: </Text>
            <Text style={{ fontSize: 15 }}>{item.owner.email}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size="large" />
        </View>
      )
    } else return <View />
  }

  const loadMoreHandler = () => {}

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={postData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.4}
        onEndReached={loadMoreHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#ccc', flex: 1 },
})

export default ListScreen
