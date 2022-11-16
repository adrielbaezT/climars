import {COLORS} from 'constants/theme';
import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePost} from '../hooks/usePost';
import {IPost} from '../interfaces/PostInterfaces';

export interface CommentProps {
  item: IPost;
  imgId: number;
  imgSrc: string;
}

export const Comment: FC<CommentProps> = ({item, imgId, imgSrc}) => {
  const {deletePost, refetchPosts} = usePost();
  const handleDelete = async () => {
    await deletePost({
      variables: {
        id: item.id,
        img_source: imgSrc,
      },
    });
    refetchPosts({img_id: imgId});
  };
  console.log(imgSrc, item, imgId);

  const handleDeletePost = () => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleDelete()},
    ]);
  };
  return (
    <View style={styles.containerPost}>
      <View style={[styles.content, styles.shadow]}>
        <View style={styles.avatar} />
        <Text>{item.post}</Text>
      </View>
      <View style={styles.delete}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleDeletePost}>
          <Icon
            name="trash-outline"
            size={20}
            color={COLORS.red}
            style={{
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Icon name="create-outline" size={20} color="yellow" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    backgroundColor: COLORS.lightGray,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  content: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  delete: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
