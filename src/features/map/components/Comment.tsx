import {COLORS} from 'constants/theme';
import {userVar} from 'graphql';
import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePost} from '../hooks/usePost';
import {IPost} from '../interfaces/PostInterfaces';
import {EditModal} from './EditModal';

export interface CommentProps {
  item: IPost;
  imgId: number;
  imgSrc: string;
}

export const Comment: FC<CommentProps> = ({item, imgId, imgSrc}) => {
  const {deletePost, refetchPosts} = usePost();
  const [modalVisible, setModalVisible] = useState(false);
  const handleDelete = async () => {
    await deletePost({
      variables: {
        deletePostId: item.id,
        imgSource: imgSrc,
      },
    });

    await refetchPosts({img_id: imgId});
  };
  const handleEdit = () => {
    setModalVisible(true);
  };

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

  const isMyPost = item.str_userId === userVar()?.id;
  return (
    <View style={styles.containerPost}>
      <View style={[styles.content, styles.shadow]}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.name}>{item.user_name}</Text>
          <Text style={styles.post}>{item.post}</Text>
        </View>
      </View>
      <View
        style={[
          styles.delete,
          {
            display: isMyPost ? 'flex' : 'none',
          },
        ]}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleDeletePost}>
          <Icon
            name="trash-outline"
            size={20}
            color={COLORS.black}
            style={{
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={handleEdit}>
          <Icon name="create-outline" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <EditModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
        imgSrc={imgSrc}
        refetchPosts={refetchPosts}
      />
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
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  post: {
    fontSize: 14,
  },
});
